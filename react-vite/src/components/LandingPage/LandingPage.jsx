import { useDispatch, useSelector } from 'react-redux';
import * as playerActions from '../../redux/player';
import './LandingPage.css';

export default function LandingPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const songs = useSelector(state => state.song.songs);

  const addToPlayer = async songId => {
    await dispatch(
      playerActions.thunkAddToPlayer(songs.find(song => song.id === songId))
    );
  };

  return (
    <div className="landing-page-songs-div">
      {songs.map(song => (
        <div
          className="song-card"
          key={song.id}
          onClick={() => addToPlayer(song.id)}
        >
          <div className="song-image-div">
            <img src={song.image_url} className="song-image" />
          </div>
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
      ))}
    </div>
  );
}
