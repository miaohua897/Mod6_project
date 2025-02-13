import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"; 
import CreatePlaylistForm from "../CreatePlaylistForm/CreatePlaylistForm";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './PlaylistSidebar.css'

const PlaylistSidebar = () => {
    const user = useSelector((state) => state.session.user);
    const playlists = useSelector( (state) => Object.values(state.playlists) || []);
   // const likedSongIds = useSelector((state) => state.session.user?.likedSongIds || []);
    // const likedSongsCount = likedSongIds?.length;
    console.log(playlists)
      
    const url = "https://images.unsplash.com/photo-1580951630746-cc6d7528cab6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
       
    const handleCreatePlaylistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();      
    }    
   
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