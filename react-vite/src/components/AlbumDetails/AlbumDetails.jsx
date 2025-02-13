import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AlbumInfo from "./AlbumInfo";
import AlbumSongs from "./AlbumSongs";
import { EditAlbum } from "../AlbumForm";
import { DeleteAlbum } from "../DeleteAlbum";
import { BsThreeDots } from "react-icons/bs";
import "./AlbumDetails.css";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[albumId]);
  const dispatch = useDispatch();
  let userOwnsAlbum = false;
  let albumDuration;

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  if (!album) return <h2>Loading...</h2>;

  if (user) userOwnsAlbum = user.id === album.artist.artist_id;

  return (
    <article className="album-details">
      <header className="album-details-header">
        <div className="album-image-container">
          <img id="album-image" src={album.image_url} />
        </div>
        <AlbumInfo albumDuration={albumDuration} />
      </header>
      <section className="album-details-main">
        <section className="album-details-update-delete">
          {userOwnsAlbum && (
            <>
              <div onClick={toggleMenu}>
                <BsThreeDots />
              </div>
              {showMenu && (
                <ul className={"album-dropdown"} ref={ulRef}>
                  <OpenModalMenuItem
                    modalComponent={<EditAlbum />}
                    itemText="Update Album"
                  />
                  <OpenModalMenuItem
                    modalComponent={<DeleteAlbum />}
                    itemText="Delete Album"
                  />
                </ul>
              )}
            </>
          )}
        </section>
        <section className="album-details-message">
          {userOwnsAlbum && album.song_ids === 0 && (
            <h3>Add songs to your album!</h3>
          )}
        </section>
        <AlbumSongs userOwnsAlbum={userOwnsAlbum} />
      </section>
    </article>
  );
};

export default AlbumDetails;

{
  /* <section>
        <OpenModalButton
          modalComponent={<CreateAlbum />}
          buttonText="Add an Album"
        />
      </section> */
}
