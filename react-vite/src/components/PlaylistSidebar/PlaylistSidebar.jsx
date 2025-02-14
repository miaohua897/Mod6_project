import CreatePlaylistForm from "../CreatePlaylistForm/CreatePlaylistForm";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import './PlaylistSidebar.css'
import OpenModalButton from "../OpenModalButton";
import { useEffect } from 'react';
import { getUserPlaylists, resetUserPlaylists } from '../../redux/playlists';

const PlaylistSidebar = () => {
    const user = useSelector((state) => state.session.user);
    const playlists = useSelector( (state) => Object.values(state.playlists) || []);
    const dispatch = useDispatch();
     useEffect(() => {
    
        dispatch(getUserPlaylists()).catch(async (res) => {
          const resError = await res.json();
          if (resError) {
            dispatch(resetUserPlaylists());
          }
        });
        
      }, [dispatch]);
      
    const url = "https://img.freepik.com/free-photo/top-view-music-concept-with-vinyl_23-2148605812.jpg";
    const LikeUrl = "https://img.freepik.com/free-photo/minimalist-heart-mockup_64049-79.jpg";
       
    return (
        <div className="playlist-sidebar">
            { user && (<><OpenModalButton
                className="left-navbar-state-button"
                modalComponent={<CreatePlaylistForm />}
                buttonText="Create new playlist"
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