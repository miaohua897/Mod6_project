import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { LuClock9 } from "react-icons/lu";
import { selectPlaylistSongs , removeSongFromUserPlaylist} from "../../redux/playlists";
import "./PlaylistSong.css";
import LikeButton from "../LikeButton/LikeButton";
import * as playerActions from "../../redux/player";
import { IoIosPlay } from "react-icons/io";

const PlaylistSongs = () => {
  const { playlistId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [menuId, setMenuId] = useState("");
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);
//   const playlist = useSelector((state) => state.playlists[playlistId]);
  const playlistSongs = useSelector((state) => selectPlaylistSongs(state, playlistId));
  const player = useSelector((state) => state.player);
  const dispatch = useDispatch();

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

  const addSongToPlayerIndex = async (song, index) => {
      await dispatch(playerActions.thunkAddSongToPlayerIndex(song, index));
  };
  
  const incrementPlayerIndex = async () => {
      await dispatch(playerActions.thunkIncrementPlayerIndex());
  };

  return (
    <section className="playlist-songs-container">
      <table className="playlist-songs-table">
        <thead>
          <tr>
          <th id="table-head1"></th>
            <th id="table-head2">Title</th>
            <th id="table-head3">Artist</th>
            <th id="table-head4"></th>
            <th id="table-head5">
              <LuClock9 />
            </th>
            <th id="table-head6"></th>
          </tr>
        </thead>
        <tbody>
          {playlistSongs.map((song) => (
            <tr key={song.id}>
              <td>
              <span
                  onClick={() => {
                    if (!player.songs.length) {
                      addSongToPlayerIndex(song, player.currentIndex);
                    } else if (
                      song.id !== player.songs[player.currentIndex].id &&
                      (!player.songs[player.currentIndex + 1] ||
                        song.id !== player.songs[player.currentIndex + 1].id)
                    ) {
                      addSongToPlayerIndex(song, player.currentIndex + 1);
                      incrementPlayerIndex();
                    }
                  }}
                >
                  <IoIosPlay 
                  className="album-songs-play-button"
                  />
                </span>
              </td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td><LikeButton songId={song.id} /></td>
              <td>{song.duration}</td>
              {user && (
                <td className="playlist-song-delete">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(!showMenu);
                      setMenuId(song.id);
                    }}
                  >
                    . . .
                  </div>
                  {showMenu && menuId === song.id && (
                    <ul className={"playlist-song-dropdown"} ref={ulRef}>                      
                      <li
                        onClick={async () => {
                                    await dispatch(removeSongFromUserPlaylist(playlistId, song.id));
                                    closeMenu();
                                }}
                        >
                        Remove song from playlist
                        </li>
                    </ul>
                  )}
                </td>
              )}
            </tr>
          ))}        
        </tbody>
      </table>
    </section>
  );
};

export default PlaylistSongs;
