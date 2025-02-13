import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { removeSongFromUserPlaylist } from "../../redux/playlists";
import * as songActions from "../../redux/songs";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import EditPlaylistForm from "../EditPlaylistForm";
import { useEffect } from "react";
import "./PlaylistDeatil.css";

const PlaylistDetails = () => {
    const { playlistId } = useParams();
    const dispatch = useDispatch();
    const playlist = useSelector((state) => state.playlists[playlistId]);
    const user = useSelector((state) => state.session.user);
    const songs = useSelector((state) => state.songs)
    console.log(songs)
   
    useEffect(() => {
        dispatch(songActions.getAllSongs())
      }, [dispatch])
  
    const url = "https://images.unsplash.com/photo-1580951630746-cc6d7528cab6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
    const handleEdit = () => {
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
                        <span>{playlist?.song_ids?.length} songs</span>
                    </div>
                </div>
            </div>
            <div>
                <OpenModalMenuItem
                itemText="Update Playlist"
                onItemClick={handleEdit}
                modalComponent={<EditPlaylistForm playlist={playlist}/>} />
            </div>
        </div>
    );
};
  
export default PlaylistDetails;