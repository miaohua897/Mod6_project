import { useSelector } from "react-redux";
import LikedSongs from "./LikedSongs";
import {  useNavigate } from "react-router-dom";

const LikesDetails = () => {
    
    const likedSongIds = useSelector((state) => state.session.user?.likedSongIds || []);
    const likedSongsCount = likedSongIds?.length;
    const user = useSelector((state) => state.session.user);
    const LikeUrl = "https://img.freepik.com/free-photo/minimalist-heart-mockup_64049-79.jpg";
    const navigate = useNavigate();
    
    if (!user) navigate("/");

    return(
        <div className="playlist-details">
            <div className="playlist-header">
                <div>
                    <img src={LikeUrl} />
                </div>
                <div className="playlist-desc">
                    <div>
                        <p>Playlist</p>
                        <h2>Liked Songs</h2>
                    </div>
                    <div>
                        <span>{user?.username}</span>
                        <span> &middot; </span> 
                        <span>{likedSongsCount === 1
                                ? `${likedSongsCount} song`
                                : `${likedSongsCount} songs`}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                {likedSongsCount > 0 && (<LikedSongs />)}
            </div>
        </div>
    )   
}

export default LikesDetails;