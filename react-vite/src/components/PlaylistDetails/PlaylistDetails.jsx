import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditPlaylistForm from "../EditPlaylistForm";
import { useEffect ,useState, useRef } from "react";
import "./PlaylistDeatil.css";
import { selectPlaylistSongs } from "../../redux/playlists";
import PlaylistSongs from "./PlaylistSongs";
import { calculateDuration } from "../../resources/helperFunctions";
import { BsThreeDots } from "react-icons/bs";

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const playlist = useSelector((state) => state.playlists[playlistId]);
    const user = useSelector((state) => state.session.user);
    
    const playlistSongs = useSelector((state) => selectPlaylistSongs(state, playlistId));
    let playlistDuration = 0;
    if (playlistSongs.length) {
        playlistDuration = calculateDuration(playlistSongs);
    }
    
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
    const url = "https://img.freepik.com/free-photo/top-view-music-concept-with-vinyl_23-2148605812.jpg";

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();  
    }    
    
    return (
        <div className="playlist-details">
            <div className="playlist-header">
                <div className="image-container">
                    <img src={playlist?.image_url? playlist.image_url : url } />
                </div>
                <div className="playlist-desc">
                    <div>
                        <p>Playlist</p>
                        <h2>{playlist?.name}</h2>
                    </div>
                    <div>
                        <span>{user?.username}</span>
                        <span> &middot; </span> 
                        <span>{playlist?.song_ids.length <= 1
                                ? `${playlist?.song_ids.length} song`
                                : `${playlist?.song_ids.length} songs`}
                        </span>
                        { playlistDuration > 0 && (<><span> &middot; </span>
                        <span>{playlistDuration}</span></>)}
                    </div>
                </div>
            </div>
            <div className="playlist-details-main">
                <div className="playlist-edit-button">
                    <div  className="toggle-menu" onClick={toggleMenu}>
                        <BsThreeDots />
                    </div>
                    {showMenu && (
                        <ul className={"playlist-dropdown"} ref={ulRef}>
                        <OpenModalMenuItem
                            itemText="Update Playlist"
                            onItemClick={handleEdit}
                            modalComponent={<EditPlaylistForm playlist={playlist}/>}
                        />
                        </ul>
                    )}
                </div>
                <div>
                    {playlist?.song_ids.length > 0 && (<PlaylistSongs />)}
                </div>
            </div>
        </div>
    );
};
  
export default PlaylistDetails;