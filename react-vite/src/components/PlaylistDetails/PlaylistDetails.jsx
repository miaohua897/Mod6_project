import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditPlaylistForm from "../EditPlaylistForm";
import { useEffect ,useState, useRef } from "react";
import "./PlaylistDeatil.css";
import { selectPlaylistSongs } from "../../redux/playlists";
import PlaylistSongs from "./PlaylistSongs";
import { calculateDuration } from "../../resources/helperFunctions";

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const playlist = useSelector((state) => state.playlists[playlistId]);
    const user = useSelector((state) => state.session.user);
    // const songs = useSelector((state) => state.songs)
    // console.log(songs);
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
    const url = "https://images.unsplash.com/photo-1580951630746-cc6d7528cab6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();  
    }    
    
    return (
        <div className="playlist-details">
            <div className="playlist-header">
                <div>
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
                        <p>{playlistDuration}</p></>)}
                    </div>
                </div>
            </div>
            <div className="togle-menu" onClick={toggleMenu}>. . .</div>
            {showMenu && (
                <ul className={"playlist-dropdown"} ref={ulRef}>
                <OpenModalMenuItem
                    itemText="Update Playlist"
                    onItemClick={handleEdit}
                    modalComponent={<EditPlaylistForm playlist={playlist}/>}
                 />
                </ul>
            )}
            <div>
                {playlist?.song_ids.length > 0 && (<PlaylistSongs />)}
            </div>
        </div>
    );
};
  
export default PlaylistDetails;