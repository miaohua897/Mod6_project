import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as albumActions from '../../redux/albums';
import './AlbumForm.css';

const AlbumForm = ({ album, albumId, formType }) => {
  const [title, setTitle] = useState(album.title);
  const [image, setImage] = useState(album.image_url);
  const [releaseYear, setReleaseYear] = useState(album.release_year);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  useEffect(() => {
    const validationErrors = {};

    const acceptedImageExtensions = ['.png', '.jpg', '.jpeg'];

    if (!title.length) {
      validationErrors.title = 'Album Title is required';
    } else if (title.length > 200) {
      validationErrors.title =
        'Album title cannot be longer that 200 characters';
    }

    if (!image.length) {
      validationErrors.image = 'Album Cover Image is required';
    } else if (
      !acceptedImageExtensions.some(extension => image.endsWith(extension))
    ) {
      validationErrors.image =
        'Album cover image URL must end in .png, .jpg, .jpeg';
    }

    if (releaseYear === null)
      validationErrors.releaseYear = 'Album Release Year is required';

    setErrors(validationErrors);
  }, [title, image, releaseYear]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (Object.values(errors).length) return setHasSubmitted(true);

    const album = {
      title: title,
      image_url: image,
      release_year: releaseYear,
    };

    if (formType === 'createAlbum') {
      const newAlbum = await dispatch(
        albumActions.thunkCreateAlbum(album)
      ).catch(async res => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: 'There was a server issue, please try again.',
          });
      });

      closeModal();

      navigate(`/albums/${Object.keys(newAlbum)[0]}`);
    } else {
      const updatedAlbum = await dispatch(
        albumActions.thunkUpdateAlbum(album, albumId)
      ).catch(async res => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: 'There was a server issue, please try again.',
          });
      });

      closeModal();

      navigate(`/albums/${Object.keys(updatedAlbum)[0]}`);
    }
  };

  const header =
    formType === 'createAlbum' ? (
      <h2>Add an album to Museic</h2>
    ) : (
      <h2>Update your album</h2>
    );

  const submitButton =
    formType === 'createAlbum' ? (
      <button onClick={handleSubmit}>Add Album</button>
    ) : (
      <button onClick={handleSubmit}>Update Album</button>
    );

  return (
    <article className='album-form'>
      <header>{header}</header>
      <form>
        <div className="album-form-input">
          <label>Album Title</label>
          <input
            type="text"
            placeholder="Enter your album's title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="album-form-error-message-container">
          {hasSubmitted && (
            <p
              className={
                hasSubmitted && errors.title
                  ? 'album-error-message'
                  : 'album-error-message hidden'
              }
            >
              {errors.title}
            </p>
          )}
        </div>
        <div className="album-form-input">
          <label>Album Cover Image</label>
          <input
            type="text"
            placeholder="Enter a url for your album cover..."
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className="album-form-error-message-container">
          {hasSubmitted && (
            <p
              className={
                hasSubmitted && errors.image
                  ? 'album-error-message'
                  : 'album-error-message hidden'
              }
            >
              {errors.image}
            </p>
          )}
        </div>
        <div className="album-form-input">
          <label>Album Release Year</label>
          <input
            type="number"
            min={1940}
            placeholder="Enter the year your album was released..."
            value={releaseYear}
            onChange={e => setReleaseYear(e.target.value)}
          />
        </div>
        <div className="album-form-error-message-container">
          {hasSubmitted && (
            <p
              className={
                hasSubmitted && errors.releaseYear
                  ? 'album-error-message'
                  : 'album-error-message hidden'
              }
            >
              {errors.releaseYear}
            </p>
          )}
        </div>
        <div className="album-form-message">
          <p>(Don&apos;t worry, you can add songs later!)</p>
        </div>
        <div className="album-form-button">{submitButton}</div>
        {hasSubmitted && (
          <p
            className={
              hasSubmitted && errors.serverError
                ? 'album-error-message'
                : 'album-error-message hidden'
            }
          >
            {errors.serverError}
          </p>
        )}
      </form>
    </article>
  );
};

export default AlbumForm;
