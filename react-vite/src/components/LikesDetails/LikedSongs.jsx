import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { LuClock9 } from "react-icons/lu";
import { CgPlayButton } from "react-icons/cg";
import { thunkRemoveLikedSong } from "../../redux/session";
import { selectLikedSongs } from "../../redux/playlists";
import './LikedSongs.css'

const LikedSongs = () => {

  const [showMenu, setShowMenu] = useState(false);
  const [menuId, setMenuId] = useState("");
  const ulRef = useRef();
  const user = useSelector((state) => state.session.user);
 
  const likedSongs = useSelector(selectLikedSongs)

  console.log(likedSongs)
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


  return (
    <section className="playlist-songs-container">
      <table className="playlist-songs-table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Artist</th>
            <th>
              <LuClock9 />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {likedSongs.map((song) => (
            <tr key={song.id}>
              <td>
                <CgPlayButton />
              </td>
              <td>{song.title}</td>
              <td>{song.artist}</td>
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
                    . . .
                  </div>
                  {showMenu && menuId === song.id && (
                    <ul className={"playlist-song-dropdown"} ref={ulRef}>                      
                      <li
                        onClick={async () => {
                                    await dispatch(thunkRemoveLikedSong(song.id));
                                    closeMenu();
                                }}
                        >
                        Remove song from Liked Songs
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

export default LikedSongs;
