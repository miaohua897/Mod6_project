import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { LuClock9 } from "react-icons/lu";
import { CgPlayButton } from "react-icons/cg";
import * as albumActions from "../../redux/albums";
import * as sessionActions from "../../redux/session";

const AlbumSongs = ({ userOwnsAlbum }) => {
  const { albumId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [selectedSong, setSelectedSong] = useState("");
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);
  const albumSongs = useSelector((state) =>
    albumActions.selectAlbumSongs(state, albumId)
  );

  const userSongs = useSelector(sessionActions.getUserSongs);

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

  return (
    <section className="album-songs-container">
      <table className="album-songs-table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Artist</th>
            <th></th>
            <th>
              <LuClock9 />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {albumSongs.map((song) => (
            <tr key={song.id}>
              <td>
                <CgPlayButton />
              </td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>LikeButton</td>
              <td>{song.duration}</td>
              {user && (
                <td>
                  <div onClick={toggleMenu}>...</div>
                  {showMenu && (
                    <ul className={"album-song-dropdown"} ref={ulRef}>
                      {userOwnsAlbum && <li>Remove song from album</li>}
                      <li>Add to Playlist</li>
                    </ul>
                  )}
                </td>
              )}
            </tr>
          ))}
          <tr>
            <td></td>
            <td>
              <select
                value={selectedSong}
                onChange={(e) => setSelectedSong(e.target.value)}
              >
                <option value="" disabled>
                  Add a song to your album...
                </option>
              </select>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default AlbumSongs;
