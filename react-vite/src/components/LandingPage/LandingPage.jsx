import { useState } from 'react';
import { IoIosPlay } from 'react-icons/io';
import { MdQueue } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as playerActions from '../../redux/player';
import './LandingPage.css';

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songs = useSelector(state => state.song.songs);
  const [isHovering, setIsHovering] = useState(false);

  const addToPlayer = async songId => {
    await dispatch(
      playerActions.thunkAddToPlayer(songs.find(song => song.id === songId))
    );
  };

  const addToPlayerTop = async songId => {
    await dispatch(
      playerActions.thunkAddToPlayerTop(songs.find(song => song.id === songId))
    );
  };

  return (
    <div className="landing-page-songs-div">
      {songs.map(song => (
        <div
          className="song-card"
          key={song.id}
          onClick={() => navigate(`/song/${song.id}`)}
          onMouseEnter={() => setIsHovering(song.id)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="song-image-div">
            <img src={song.image_url} className="song-image" />
          </div>
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
          {isHovering === song.id && (
            <>
              <span
                onClick={e => {
                  addToPlayer(song.id);
                  e.stopPropagation();
                }}
                className="queue-button-container"
              >
                <MdQueue
                  style={{ width: '100%', height: 'auto' }}
                  className="queue-button"
                />
              </span>
              <span
                onClick={e => {
                  addToPlayerTop(song.id);
                  e.stopPropagation();
                }}
                className="play-button-container"
              >
                <IoIosPlay
                  style={{ width: '100%', height: 'auto' }}
                  viewBox="0 0 460 512"
                  className="play-button"
                />
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
