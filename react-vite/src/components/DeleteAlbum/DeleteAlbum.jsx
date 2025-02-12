import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as albumActions from "../../redux/albums";

const DeleteAlbum = () => {
  const { closeModal } = useModal();
  const { albumId } = useParams();
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.stopPropagation();

    await dispatch(albumActions.thunkDeleteAlbum(albumId)).catch(
      async (res) => {
        const data = await res.json();
        if (data?.errors)
          return setErrors({
            serverError: "There was a server issue, please try again.",
          });
      }
    );

    closeModal();

    return navigate('/');
  };

  return (
    <article className="delete-album-container">
      <header>
        <h2>Delete Album?</h2>
      </header>
      <div className="delete-album-buttons">
        <button onClick={handleClick}>Yes</button>
        <button onClick={() => closeModal()}>No</button>
      </div>
    </article>
  );
};

export default DeleteAlbum;
