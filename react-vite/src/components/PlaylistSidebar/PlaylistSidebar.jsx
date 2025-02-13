import OpenModalMenuItem from "../Navigation/OpenModalMenuItem"; 
import CreatePlaylistForm from "../CreatePlaylistForm/CreatePlaylistForm";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import './PlaylistSidebar.css'

const PlaylistSidebar = () => {
    const user = useSelector((state) => state.session.user);
    const playlists = useSelector( (state) => Object.values(state.playlists) || []);
  
    console.log(playlists)
      
    const url = "https://img.freepik.com/free-photo/top-view-music-concept-with-vinyl_23-2148605812.jpg";
    const LikeUrl = "https://img.freepik.com/free-photo/minimalist-heart-mockup_64049-79.jpg";
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
                            <img src={LikeUrl}></img>
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