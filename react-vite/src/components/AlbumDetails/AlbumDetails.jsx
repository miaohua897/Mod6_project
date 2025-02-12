import { calculateDuration } from "../../resources/helperFunctions";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { LuClock9 } from "react-icons/lu";
import { CgPlayButton } from "react-icons/cg";
import * as albumActions from "../../redux/albums";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import AlbumInfo from "./AlbumInfo";
import { EditAlbum } from "../AlbumForm";
import { DeleteAlbum } from "../DeleteAlbum";
import "./AlbumDetails.css";

const AlbumDetails = () => {
  const { albumId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [showSecondMenu, setShowSecondMenu] = useState(false);
  const ulRef = useRef();
  const ulRefSecond = useRef();
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[albumId]);
  const albumSongs = useSelector((state) =>
    albumActions.selectAlbumSongs(state, albumId)
  );
  const dispatch = useDispatch();
  let userOwnsAlbum = false;
  let albumDuration;

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }

      if (ulRefSecond.current && !ulRef.current.contains(e.target)) {
        setShowSecondMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const toggleSecondMenu = (e) => {
    e.stopPropagation();
    setShowSecondMenu(!showSecondMenu);
  };

  const closeMenu = () => setShowMenu(false);

  const closeSecondMenu = () => setShowSecondMenu(false);

  if (!album) return <h2>Loading...</h2>;

  if (user) userOwnsAlbum = user.id === album.artist.artist_id;

  if (albumSongs.length) {
    albumDuration = calculateDuration(albumSongs);
  }

  console.log("ALBUM SONGS", albumSongs)

  return (
    <article>
      <header className="album-details-header">
        <div>
          <img className="album-image" src={album.image_url} />
        </div>
        <AlbumInfo albumDuration={albumDuration} />
      </header>
      {userOwnsAlbum && (
        <section className="album-details-update-delete">
          <div onClick={toggleMenu}>...</div>
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
        </section>
      )}
      <section className="album-details-message">
        {userOwnsAlbum && albumSongs.length === 0 &&
        <h3>Add songs to your album!</h3>
        }
      </section>
      <section className="album-details-album-songs">
        <table className="album-songs-table">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th><LuClock9 /></th>
            </tr>
          </thead>
          <tbody>
            {albumSongs.map(song => (
              <tr key={song.id}>
                <td><CgPlayButton /></td>
                <td>{song.title}</td>
                <td>{song.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </article>
  );
};

export default AlbumDetails;

/*

if there is a user and they own the album, we render the FIRST crud dropdown, which has
update album and delete album modal buttons

if there is a user and they own the album and there are no songs, we render a message

then, we render a table. Each row has sing title, artist name, duration
if there is a user, we render the like button and a SECOND crud dropdown

in the SECOND crud dropdown, we render:
add to playlist modal button
(if user owns the album): remove song link

if there is a user that owns the album, the final table row is a dropdown menu for adding songs

I have an array of song Ids, and I need that generate me an array of songs

*/

{
  /* <section>
        <OpenModalButton
          modalComponent={<CreateAlbum />}
          buttonText="Add an Album"
        />
      </section> */
}
      {/* <section>
        <div onClick={toggleSecondMenu}>...</div>
        {showSecondMenu && (
          <ul className={"album-song-dropdown"} ref={ulRefSecond}>
            <li>Remove song from album</li>
            <li>Add to Playlist</li>
          </ul>
        )}
      </section> */}