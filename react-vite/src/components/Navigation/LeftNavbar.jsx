import { useState } from 'react';
import { HiSquare2Stack } from 'react-icons/hi2';
import LeftNavbarAlbums from './LeftNavbarAlbums';
import LeftNavbarPlaylists from './LeftNavbarPlaylists';
import LeftNavbarSongs from './LeftNavbarSongs';
import OpenModalButton from '../OpenModalButton';
import SignupFormModal from '../SignupFormModal';
import AddASong from '../AddASong/AddASong';
import { CreateAlbum } from '../AlbumForm';
import './LeftNavbar.css';

export default function LeftNavbar({ isLoaded, sessionUser }) {
  const [isSongsActive, setIsSongsActive] = useState(false);
  const [isAlbumsActive, setIsAlbumsActive] = useState(false);
  const [isPlaylistsActive, setIsPlaylistsActive] = useState(false);

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
      </nav>
    </div>
  );
}
