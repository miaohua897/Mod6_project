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
  const albums = useSelector(state => Object.values(state.albums));
  const songs = useSelector(state => state.song.songs);
  const player = useSelector(state => state.player);
  const [isHoveringAlbum, setIsHoveringAlbum] = useState(false);
  const [isHoveringSong, setIsHoveringSong] = useState(false);

  const addToPlayer = async song => {
    await dispatch(playerActions.thunkAddToPlayer(song));
  };

  const addSongToPlayerIndex = async (song, index) => {
    await dispatch(playerActions.thunkAddSongToPlayerIndex(song, index));
  };

  const addAlbumToPlayerIndex = async (album, index) => {
    let currentIndex = index;
    for (let i = 0; i < album.song_ids.length; i++) {
      const songId = album.song_ids[i];
      const albumSong = songs.find(song => song.id === songId);
      if (
        !player.songs.length ||
        (i === 0 && songId !== player.songs[currentIndex - 1].id) ||
        i > 0
      ) {
        await dispatch(
          playerActions.thunkAddSongToPlayerIndex(albumSong, currentIndex)
        );
        currentIndex++;
      }
    }
  };

  const incrementPlayerIndex = async () => {
    await dispatch(playerActions.thunkIncrementPlayerIndex());
  };

  return (
    <>
      <div className="landing-page-songs-div">
        <div className="landing-page-songs-header">Songs</div>
        {songs.map(song => (
          <div
            className="landing-page-song-card"
            key={song.id}
            onClick={() => navigate(`/song/${song.id}`)}
            onMouseEnter={() => setIsHoveringSong(song.id)}
            onMouseLeave={() => setIsHoveringSong(false)}
          >
            <div className="landing-page-song-image-div">
              <img src={song.image_url} className="landing-page-song-image" />
            </div>
            <div className="landing-page-song-title">{song.title}</div>
            <div className="landing-page-song-artist">{song.artist}</div>
            {isHoveringSong === song.id && (
              <>
                <span
                  onClick={e => {
                    if (
                      !player.songs.length ||
                      song.id !== player.songs[player.songs.length - 1].id
                    ) {
                      addToPlayer(song);
                    }
                    e.stopPropagation();
                  }}
                  className="landing-page-queue-button-container"
                >
                  <MdQueue
                    style={{ width: '100%', height: 'auto' }}
                    className="landing-page-queue-button"
                  />
                </span>
                <span
                  onClick={e => {
                    if (!player.songs.length) {
                      addSongToPlayerIndex(song, player.currentIndex);
                    } else {
                      addSongToPlayerIndex(song, player.currentIndex + 1);
                      incrementPlayerIndex();
                    }
                    e.stopPropagation();
                  }}
                  className="landing-page-play-button-container"
                >
                  <IoIosPlay
                    style={{ width: '100%', height: 'auto' }}
                    viewBox="0 0 460 512"
                    className="landing-page-play-button"
                  />
                </span>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="landing-page-albums-div">
        <div className="landing-page-albums-header">Albums</div>
        {albums.map(album => (
          <div
            className="landing-page-album-card"
            key={album.id}
            onClick={() => navigate(`/albums/${album.id}`)}
            onMouseEnter={() => setIsHoveringAlbum(album.id)}
            onMouseLeave={() => setIsHoveringAlbum(false)}
          >
            <div className="landing-page-album-image-div">
              <img src={album.image_url} className="landing-page-album-image" />
            </div>
            <div className="landing-page-album-title">{album.title}</div>
            <div className="landing-page-album-artist">
              {album.artist.artist_name}
            </div>
            {isHoveringAlbum === album.id && (
              <>
                <span
                  onClick={e => {
                    for (let i = 0; i < album.song_ids.length; i++) {
                      const songId = album.song_ids[i];
                      const albumSong = songs.find(song => song.id === songId);
                      if (
                        !player.songs.length ||
                        (i === 0 &&
                          songId !==
                            player.songs[player.songs.length - 1].id) ||
                        i > 0
                      ) {
                        addToPlayer(albumSong);
                      }
                    }
                    e.stopPropagation();
                  }}
                  className="landing-page-queue-button-container"
                >
                  <MdQueue
                    style={{ width: '100%', height: 'auto' }}
                    className="landing-page-queue-button"
                  />
                </span>
                <span
                  onClick={e => {
                    addAlbumToPlayerIndex(album, player.currentIndex + 1);
                    e.stopPropagation();
                  }}
                  className="landing-page-play-button-container"
                >
                  <IoIosPlay
                    style={{ width: '100%', height: 'auto' }}
                    viewBox="0 0 460 512"
                    className="landing-page-play-button"
                  />
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
