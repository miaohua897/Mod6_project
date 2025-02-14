import { useEffect, useRef, useState } from 'react';
import {
  IoIosPause,
  IoIosPlay,
  IoIosSkipBackward,
  IoIosSkipForward,
} from 'react-icons/io';
import {
  IoVolumeHighOutline,
  IoVolumeMediumOutline,
  IoVolumeLowOutline,
  IoVolumeOffOutline,
  IoVolumeMuteOutline,
} from 'react-icons/io5';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import * as playerActions from '../../redux/player';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const dispatch = useDispatch();
  const { songs, currentIndex } = useSelector(state => state.player);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [prevVolume, setPrevVolume] = useState(1);
  const [isVolumeDragging, setIsVolumeDragging] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (songs.length) {
      setCurrentSong(songs[currentIndex]);
      setIsPlaying(true);
    }
  }, [songs, currentIndex]);

  const incrementPlayerIndex = async () => {
    await dispatch(playerActions.thunkIncrementPlayerIndex());
  };

  const decrementPlayerIndex = async () => {
    await dispatch(playerActions.thunkDecrementPlayerIndex());
  };

  const handlePlayPause = () => {
    if (currentSong) setIsPlaying(!isPlaying);
  };

  const handleNextSong = () => {
    if (currentIndex < songs.length - 1) {
      incrementPlayerIndex();
      setIsPlaying(true);
    }
  };

  const handlePrevSong = () => {
    if (currentIndex > 0) {
      decrementPlayerIndex();
      setIsPlaying(true);
    }
  };

  const getFormattedProgress = (progress, duration) => {
    const minsSecs = duration.split(':');
    const mins = parseInt(minsSecs[0]);
    const secs = parseInt(minsSecs[1]);
    const totalSecs = mins * 60 + secs;
    const currTotalSecs = progress * totalSecs;
    const currMins = Math.floor(currTotalSecs / 60);
    const currSecs = (currTotalSecs % 60).toFixed(0);
    return `${mins > 9 && currMins < 10 ? '0' + currMins : currMins}:${
      currSecs < 10 ? '0' + currSecs : currSecs
    }`;
  };

  const handleProgress = state => {
    if (state) {
      setProgress(state.played);
    }
  };

  const handleSeekStart = () => {
    setIsSeeking(true);
  };

  const handleSeek = event => {
    const rect = event.target.getBoundingClientRect();
    const width = rect.width;
    const clickX = event.clientX - rect.left;
    const newProgress = clickX / width;
    setProgress(newProgress);
  };

  const handleSeekEnd = event => {
    setIsSeeking(false);
    const rect = event.target.getBoundingClientRect();
    const width = rect.width;
    const clickX = event.clientX - rect.left;
    const newProgress = clickX / width;
    setProgress(newProgress);
    if (playerRef.current) {
      playerRef.current.seekTo(newProgress);
    }
  };

  const handleVolumeDragStart = () => {
    setIsVolumeDragging(true);
    setIsMuted(false);
  };

  const handleVolumeDrag = event => {
    if (isVolumeDragging) {
      const rect = event.target.getBoundingClientRect();
      const width = rect.width;
      const clickX = event.clientX - rect.left;
      let newVolume = clickX / width;
      newVolume = Math.max(0, Math.min(1, newVolume));
      setVolume(newVolume);
    }
  };

  const handleVolumeDragEnd = event => {
    setIsVolumeDragging(false);
    const rect = event.target.getBoundingClientRect();
    const width = rect.width;
    const clickX = event.clientX - rect.left;
    let newVolume = clickX / width;
    newVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(newVolume);
  };

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setVolume(prevVolume);
    } else {
      setIsMuted(true);
      setPrevVolume(volume);
      setVolume(0);
    }
  };

  return (
    <div className="music-player">
      <div className="current-song-details">
        <div className="current-song-image-div">
          {currentSong && (
            <img
              src={currentSong.image_url}
              className="current-song-image"
              alt="Song Cover Art"
            />
          )}
        </div>
        <div className="current-song-title-artist">
          <div className="current-song-title">
            {currentSong && currentSong.title}
          </div>
          <div className="current-song-artist">
            {currentSong && currentSong.artist}
          </div>
        </div>
      </div>

      {currentSong && (
        <ReactPlayer
          ref={playerRef}
          url={currentSong.audio_url}
          playing={isPlaying}
          width="0px" // Hide the default player UI
          height="0px"
          onEnded={handleNextSong}
          onProgress={handleProgress}
          volume={volume}
          muted={isMuted}
          onReady={() => {
            if (isMuted) {
              setVolume(0.00001); // Cannot initially setVolume(0)
            }
          }}
        />
      )}

      <div className="music-player-controls">
        <div className="music-player-buttons">
          <span className="button-container" onClick={handlePrevSong}>
            <IoIosSkipBackward
              style={{ width: '100%', height: 'auto' }}
              className="skip-button music-player-button"
            />
          </span>
          <span
            className="pause-play-button button-container"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <IoIosPause
                style={{ width: '100%', height: 'auto' }}
                className="pause-play-button music-player-button"
              />
            ) : (
              <IoIosPlay
                style={{ width: '100%', height: 'auto' }}
                viewBox="0 0 460 512"
                className="pause-play-button music-player-button"
              />
            )}
          </span>
          <span className="button-container" onClick={handleNextSong}>
            <IoIosSkipForward
              style={{ width: '100%', height: 'auto' }}
              className="skip-button music-player-button"
            />
          </span>
        </div>
        <div className="music-player-progress-bar">
          <span className="time-left">
            {currentSong
              ? getFormattedProgress(progress, currentSong.duration)
              : '--:--'}
          </span>
          <div
            className="progress-bar-background"
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            onMouseMove={isSeeking ? handleSeek : null}
            onTouchStart={handleSeekStart}
            onTouchEnd={handleSeekEnd}
            onTouchMove={isSeeking ? handleSeek : null}
          >
            <div
              className="progress-bar"
              style={{ width: `${progress * 100}%` }}
            >
              <div
                className="progress-bar-thumb"
                style={{ left: `${progress * 100}%` }}
              ></div>
            </div>
          </div>
          <span className="time-right">
            {currentSong ? currentSong.duration : '--:--'}
          </span>
        </div>
      </div>

      <div className="music-player-right-div">
        <div className="volume-control">
          <span className="button-container" onClick={handleMute}>
            {isMuted && (
              <IoVolumeMuteOutline
                style={{ width: '100%', height: 'auto' }}
                className="volume-button music-player-button"
              />
            )}
            {volume === 0 && !isMuted && (
              <IoVolumeOffOutline
                style={{ width: '100%', height: 'auto' }}
                className="volume-button music-player-button"
              />
            )}
            {volume > 0 && volume <= 0.33 && !isMuted && (
              <IoVolumeLowOutline
                style={{ width: '100%', height: 'auto' }}
                className="volume-button music-player-button"
              />
            )}
            {volume > 0.33 && volume <= 0.66 && !isMuted && (
              <IoVolumeMediumOutline
                style={{ width: '100%', height: 'auto' }}
                className="volume-button music-player-button"
              />
            )}
            {volume > 0.66 && volume <= 1 && !isMuted && (
              <IoVolumeHighOutline
                style={{ width: '100%', height: 'auto' }}
                className="volume-button music-player-button"
              />
            )}
          </span>
          <div
            className="volume-bar-background"
            onMouseDown={handleVolumeDragStart}
            onMouseUp={handleVolumeDragEnd}
            onMouseMove={handleVolumeDrag}
            onTouchStart={handleVolumeDragStart}
            onTouchEnd={handleVolumeDragEnd}
            onTouchMove={handleVolumeDrag}
          >
            <div className="volume-bar" style={{ width: `${volume * 100}%` }}>
              <div
                className="volume-bar-thumb"
                style={{ left: `${volume * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
