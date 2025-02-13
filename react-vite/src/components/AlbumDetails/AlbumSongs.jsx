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
  const [menuId, setMenuId] = useState("");
  const [selectedSong, setSelectedSong] = useState("");
  const [availableSongs, setAvailableSongs] = useState(false);
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[albumId]);
  const albumSongs = useSelector((state) =>
    albumActions.selectAlbumSongs(state, albumId)
  );
  const userSongs = useSelector(sessionActions.getUserSongs);
  const dispatch = useDispatch();

  // check if there are available songs, which controls whether the
  // add songs display shows
  useEffect(() => {
    const isSongs = userSongs.some((song) => !album.song_ids.includes(song.id));

    if (selectedSong === "") {
      setAvailableSongs(isSongs);
    }
  }, [userSongs, album.song_ids, selectedSong]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const closeMenu = () => setShowMenu(false);

  const addAlbumSong = async () => {
    await dispatch(albumActions.thunkAddAlbumSong(albumId, selectedSong));
    setSelectedSong("");
  };

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
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                      setMenuId(song.id);
                    }}
                  >
                    ...
                  </div>
                  {showMenu && menuId === song.id && (
                    <ul className={"album-song-dropdown"} ref={ulRef}>
                      {userOwnsAlbum && (
                        <li
                          onClick={async () => {
                            await dispatch(
                              albumActions.thunkDeleteAlbumSong(
                                albumId,
                                song.id
                              )
                            );
                            closeMenu();
                          }}
                        >
                          Remove song from album
                        </li>
                      )}
                      <li>Add to Playlist</li>
                    </ul>
                  )}
                </td>
              )}
            </tr>
          ))}
          {userOwnsAlbum && availableSongs && (
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
                  {userSongs.map((song) => {
                    if (!album.song_ids.includes(song.id)) {
                      return (
                        <option key={song.id} value={song.id}>
                          {song.title}
                        </option>
                      );
                    }
                  })}
                </select>
              </td>
              <td>
                <button
                  disabled={selectedSong === "" ? true : false}
                  onClick={addAlbumSong}
                >
                  Add Song
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default AlbumSongs;
