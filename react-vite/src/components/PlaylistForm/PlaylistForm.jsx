import { createUserPlaylist, updateUserPlaylist } from "../../redux/playlists";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./PlaylistForm.css";

function PlaylistForm({ playlist, formType }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(playlist?.name);
  const [description, setDescription] = useState(playlist?.description);
  const [imageUrl, setImageUrl] = useState(playlist?.image_url);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const playlistIds = useSelector(
    (state) => state.session.user?.playlistIds || []
  );
  const playlists = useSelector(
    (state) => Object.values(state.playlists) || []
  );

  console.log("playlistIds:  ", playlistIds);
  console.log("playlists: ", playlists);

  useEffect(() => {
    const formErrors = {};
    if (!name.length) {
      formErrors.name = "Name is required";
    }
    if (!description.length) {
      formErrors.description = "Description is required";
    }
    if (imageUrl.length && !isValidURL(imageUrl)) {
      formErrors.imageUrl = "Image URL must be a valid URL";
    }
    setErrors(formErrors);
  }, [imageUrl, name, description]);

  function isValidURL(string) {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" + // Protocol
        "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" + // Domain name
        "localhost|" + // Localhost
        "\\d{1,3}(\\.\\d{1,3}){3})" + // OR IPv4
        "(\\:\\d+)?(\\/.*)?$", // Optional port and path
      "i"
    );
    return urlPattern.test(string);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!Object.values(errors).length) {
      dispatch(
        formType === "Create Playlist"
          ? createUserPlaylist(imageUrl, name, description)
          : updateUserPlaylist(playlist.id, imageUrl, name, description)
      )
        .then((data) => {
          if (data.id) {
            setErrors({});
            navigate(`/playlists/${data.id}`);
            setHasSubmitted(false);
            reset();
            closeModal();
          }
        })
        .catch(async (res) => {
          console.log(res);
          const data = await res.json();

          if (data && data.errors) {
            setHasSubmitted(true);
            setErrors(data.errors);
          }
        });
    }
  };

  const reset = () => {
    setName("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <form className="playlist-form" onSubmit={handleSubmit}>
      <div className="playlist-form-header">
        {formType === "Create Playlist" && (
          <h1 className="form-title">Create a Playlist on Museic</h1>
        )}
        {formType === "Update Playlist" && (
          <h1 className="form-title">Update your Playlist</h1>
        )}
      </div>
      <div className="playlist-form-section">
        <div className="playlist-form-field">
          <label htmlFor="name">Playlist Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter a name for your playlist..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="playlist-form-errors">
          <span>{hasSubmitted && errors.name && `  ${errors.name}`}</span>
        </div>
        <div className="playlist-form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Enter a description of your playlist..."
            className="description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="playlist-form-errors">
          <span>
            {hasSubmitted && errors.description && `  ${errors.description}`}
          </span>
        </div>
        <div className="playlist-form-field">
          <label htmlFor="image_url">Playlist Image</label>
          <input
            type="text"
            name="image_url"
            placeholder="Enter the url for your playlist cover image..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="playlist-form-errors">
          <span>
            {hasSubmitted && errors.imageUrl && `  ${errors.imageUrl}`}
          </span>
        </div>
      </div>
      <div className="playlist-form-submit">
        <button type="submit" className="create-playlist-button">
          {formType}
        </button>
      </div>
    </form>
  );
}

export default PlaylistForm;
