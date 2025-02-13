import { useState } from 'react';
import { HiSquare2Stack } from 'react-icons/hi2';
import { MdQueue } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import LeftNavbarAlbums from './LeftNavbarAlbums';
import LeftNavbarPlaylists from './LeftNavbarPlaylists';
import LeftNavbarSongs from './LeftNavbarSongs';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import AddASong from '../AddASong/AddASong';
import { CreateAlbum } from '../AlbumForm';
import * as playerActions from '../../redux/player';
import './LeftNavbar.css';

export default function LeftNavbar({ isLoaded, sessionUser }) {
  const dispatch = useDispatch();
  const player = useSelector(state => state.player);
  const [isSongsActive, setIsSongsActive] = useState(false);
  const [isAlbumsActive, setIsAlbumsActive] = useState(false);
  const [isPlaylistsActive, setIsPlaylistsActive] = useState(false);

  const setPlayerIndex = async index => {
    await dispatch(playerActions.thunkSetPlayerIndex(index));
  };

  return (
    <div className="left-navbar-div">
      <nav>
        <div className="left-navbar-header">
          <HiSquare2Stack style={{ width: 'auto', height: '24px' }} />
          <span className="left-navbar-header-text">Your Library</span>
        </div>
        {!sessionUser && (
          <>
            <div className="left-navbar-no-user-div">
              <div>
                Create an account to upload songs, create albums, & make
                playlists
              </div>
              <div>It&apos;s easy, we&apos;ll help you</div>
              <div className="left-navbar-sign-up-button">
                <OpenModalButton
                  modalComponent={<SignupFormModal />}
                  buttonText="Sign up"
                />
              </div>
            </div>
          </>
        )}
        {sessionUser && (
          <>
            <div className="left-navbar-buttons-div">
              <div className="left-navbar-buttons">
                <button
                  className="left-navbar-button"
                  onClick={() => {
                    setIsSongsActive(true);
                    setIsAlbumsActive(false);
                    setIsPlaylistsActive(false);
                  }}
                >
                  Songs
                </button>
                <button
                  className="left-navbar-button"
                  onClick={() => {
                    setIsSongsActive(false);
                    setIsAlbumsActive(true);
                    setIsPlaylistsActive(false);
                  }}
                >
                  Albums
                </button>
                <button
                  className="left-navbar-button"
                  onClick={() => {
                    setIsSongsActive(false);
                    setIsAlbumsActive(false);
                    setIsPlaylistsActive(true);
                  }}
                >
                  Playlists
                </button>
              </div>
              <div className="left-navbar-state-buttons">
                {isSongsActive && (
                  <OpenModalButton
                    className="left-navbar-state-button"
                    modalComponent={<AddASong />}
                    buttonText="Add a song"
                  />
                )}
                {isAlbumsActive && (
                  <OpenModalButton
                    className="left-navbar-state-button"
                    modalComponent={<CreateAlbum />}
                    buttonText="Add an album"
                  />
                )}
                {isPlaylistsActive && (
                  <button
                    className="left-navbar-state-button"
                    onClick={() => {
                      // ADD FUNCTION TO CREATE A PLAYLIST HERE
                    }}
                  >
                    Create a playlist
                  </button>
                )}
              </div>
            </div>
            {isSongsActive &&
              (!sessionUser.songIds || !sessionUser.songIds.length ? (
                <span className="add-to-library">
                  Add a song to your library
                </span>
              ) : (
                <LeftNavbarSongs
                  isLoaded={isLoaded}
                  sessionUser={sessionUser}
                />
              ))}
            {isAlbumsActive &&
              (!sessionUser.albumIds || !sessionUser.albumIds.length ? (
                <span className="add-to-library">
                  Add an album to your library
                </span>
              ) : (
                <LeftNavbarAlbums
                  isLoaded={isLoaded}
                  sessionUser={sessionUser}
                />
              ))}
            {isPlaylistsActive &&
              (!sessionUser.playlistIds || !sessionUser.playlistIds.length ? (
                <span className="add-to-library">
                  Add a playlist to your library
                </span>
              ) : (
                <LeftNavbarPlaylists
                  isLoaded={isLoaded}
                  sessionUser={sessionUser}
                />
              ))}
          </>
        )}
        {player.songs.length > 0 && (
          <div className="player-queue-div">
            <div className="player-queue-header">
              <MdQueue style={{ width: 'auto', height: '24px' }} />
              <span className="player-queue-header-text">
                Currently Playing
              </span>
            </div>
            <div className="player-queue-songs">
              {player.songs.map((song, index) => (
                <div
                  className="player-queue-song-card"
                  key={song.id}
                  onClick={() => setPlayerIndex(index)}
                >
                  <div className="player-queue-song-image-div">
                    <img
                      src={song.image_url}
                      className="player-queue-song-image"
                    />
                  </div>
                  <div className="player-queue-song-title-artist">
                    <div className="player-queue-song-title">{song.title}</div>
                    <div className="player-queue-song-artist">
                      {song.artist}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
