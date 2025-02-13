import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"; 
import CreatePlaylistForm from "../CreatePlaylistForm/CreatePlaylistForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import './PlaylistSidebar.css'
import { getUserPlaylists, resetUserPlaylists } from "../../redux/playlists";

const PlaylistSidebar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const playlists = useSelector( (state) => Object.values(state.playlists) || []);
    const likedSongIds = useSelector((state) => state.session.user?.likedSongIds || []);
    const likedSongsCount = likedSongIds?.length;
    console.log(playlists)
      
    const url = "https://images.unsplash.com/photo-1580951630746-cc6d7528cab6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    useEffect(() => {
            dispatch(getUserPlaylists()).catch(async (res) => {
              const resError = await res.json();
              if (resError) {
                dispatch(resetUserPlaylists());
              }
            });
    }, [dispatch]);
    
    const handleCreatePlaylistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();      
    }    
    // const handleUnlike = () => {
    //         dispatch(removeSongFromUserPlaylist(4, 1))
    //     };
    
    return (
        <div className="playlist-sidebar">
            { user && (<><OpenModalMenuItem
                itemText="Create new playlist"
                onItemClick={handleCreatePlaylistClick}
                modalComponent={<CreatePlaylistForm />}
              />
              {/* <button onClick={handleUnlike}>add song</button>          */}
            <div className="playlist-folders">
                <div className="list-folder">
                    <NavLink to="/likes">
                    <div className="folder-details">
                        <div className="folder-img">
                            <img src="https://images.unsplash.com/photo-1580951630746-cc6d7528cab6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"></img>
                        </div>
                        <div className="folder-desc">
                            <p>Liked Songs</p>
                            <div className="folder-songs">
                                <span>Playlist</span>
                                <span > &middot; </span> 
                                <span>{likedSongsCount} songs</span>
                            </div>                            
                        </div>
                    </div>
                    </NavLink>
                    {playlists?.map(playlist => (
                        <NavLink key={playlist.id} to={`/playlists/${playlist?.id}`}>
                        <div className="folder-details" >
                            <div className="folder-img">
                                <img src={playlist?.image_url? playlist.image_url : url }></img>
                            </div>
                            <div className="folder-desc">
                                <p>{playlist.name}</p>
                                <div className="folder-songs">
                                    <span>Playlist</span>
                                    <span > &middot; </span> 
                                    <span>{playlist.song_ids.length} songs</span>
                                </div>                            
                            </div>
                        </div>
                        </NavLink>   
                    ))}
                </div>
            </div>
            </>)}
        </div>
    );
};

export default PlaylistSidebar;