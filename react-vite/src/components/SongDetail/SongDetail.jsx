import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentAllSongs } from '../../redux/songs';
import { useParams } from 'react-router-dom';
import { FaPlay, FaEdit, FaTrash, FaList } from 'react-icons/fa';
import DeleteASong from '../DeleteASong';
import Modal from 'react-modal';
import UpdateASong from '../UpdateASong';
import OpenModalButton from '../OpenModalButton';
import AddToPlaylistModal from '../AddToPlaylistModal/AddToPlaylistModal';
import * as playerActions from '../../redux/player';
import LikeButton from '../LikeButton';
import './SongDetail.css';

Modal.setAppElement('#root');

function SongDetail() {
  const { song_id } = useParams();
  const player = useSelector(state => state.player);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [visible_lyrics, setVisible_lyrics] = useState(6);
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();

  const addSongToPlayerIndex = async (song, index) => {
    await dispatch(playerActions.thunkAddSongToPlayerIndex(song, index));
  };

  const incrementPlayerIndex = async () => {
    await dispatch(playerActions.thunkIncrementPlayerIndex());
  };

  useEffect(() => {
    dispatch(getCurrentAllSongs());
  }, [dispatch]);

  const openModal = e => {
    e.preventDefault();
    if (!isModalOpen) setIsModalOpen(true);
    else return;
  };
  const openUpdateModal = e => {
    e.preventDefault();
    if (!isUpdateModalOpen) setIsUpdateModalOpen(true);
    else return;
  };
  const closeDropDown = () => setDropdown(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  document.addEventListener('click', closeDropDown);

  const sessionUser = useSelector(state => state.session.user);
  const userSongs = useSelector(state => state.song.currentUserAllSongs);
  const songs = useSelector(state => state.song.songs);
  const song = songs.filter(el => el.id === Number(song_id))[0];
  const isUserSong = userSongs.filter(el => el.id === Number(song_id));
  return (
    <div>
      {song ? (
        <div className="song-details">
          <div className="song-head">
            <img className="img-song-detail" src={song.image_url}></img>
            <div className='song-info-container'>
              <p id='song-head-title'>{song.title}</p>
              <p id='song-info-body'>
                {song.artist} {'●'} {song.release_year} {'●'} {song.duration}
              </p>
            </div>
          </div>
          <div className="song-body">
            <p className="lyrics-format">Lyrics</p>
            <div>
              {song.lyrics
                .split(',')
                .slice(0, visible_lyrics)
                .map((el, index) => (
                  <p className="lyrics-detail-format" key={index}>
                    {el}
                  </p>
                ))}
            </div>
            {visible_lyrics === 6 ? (
              <button
                onClick={() => setVisible_lyrics(song.lyrics.length)}
                className="visible-lyrics"
              >
                ... show more
              </button>
            ) : (
              <button
                onClick={() => setVisible_lyrics(6)}
                className="visible-lyrics"
              >
                show less
              </button>
            )}
          </div>
          <div>
            <table className="table-songs-container">
              <thead>
                <tr className="table-head">
                  <th></th>
                  <th >Title</th>
                  <th>Artist</th>
                  <th ></th>
                  <th>🕘</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-body">
                  <td>
                    <button
                      style={{ backgroundColor: 'transparent', border: 'None' }}
                      onClick={() => {
                        if (!player.songs.length) {
                          addSongToPlayerIndex(song, player.currentIndex);
                        } else if (
                          song.id !== player.songs[player.currentIndex].id &&
                          (!player.songs[player.currentIndex + 1] ||
                            song.id !==
                              player.songs[player.currentIndex + 1].id)
                        ) {
                          addSongToPlayerIndex(song, player.currentIndex + 1);
                          incrementPlayerIndex();
                        }
                      }}
                      className="play-song-button"
                    >
                      <FaPlay size={15} color="darkgray" />
                    </button>
                  </td>
                  <td id='song-table-title'>{song.title}</td>
                  <td>{song.artist}</td>
                  <td>
                  {
                    sessionUser ?<LikeButton songId={song.id} />:null
                  }   
                     </td>
                  <td>{song.duration}</td>
                  <td>
                    <div>
                      {sessionUser ? (
                        <div className="song-detail-dropdown">
                          <button
                            className="song-detail-dropdown-button"
                            onClick={e => {
                              e.stopPropagation();
                              setDropdown(true);
                            }}
                          >
                            ...
                          </button>
                          {
                          dropdown || isUpdateModalOpen || isModalOpen ?
                          (
                            isUserSong.length !== 0 ? (
                              <div>
                               
                                <div className="update-delete-container">
                                {dropdown ?  
                                <button
                                    className="update-song-nav"
                                    onClick={openUpdateModal}
                                  >
                                    <FaEdit />
                                    {'                                      '}
                                    update a song
                                  </button>:null}
                                  <Modal
                                    isOpen={isUpdateModalOpen}
                                    className="update-modal"
                                    overlayClassName="deleteAOverlay"
                                    onRequestClose={closeUpdateModal}
                                    contentLabel="delete a song"
                                  >
                                    <UpdateASong
                                      song_id={song.id}
                                      closeUpdateModal={closeUpdateModal}
                                    />
                                  </Modal>
                                  {
                                    dropdown?
                                    <button
                                    className="delete-song-nav"
                                    onClick={openModal}
                                  >
                                    <FaTrash />
                                    {'                                      '}
                                    delete a song
                                  </button>:null
                                  }
                              
                                  <Modal
                                    isOpen={isModalOpen}
                                    className="delete-modal"
                                    overlayClassName="deleteAOverlay"
                                    onRequestClose={closeModal}
                                    contentLabel="delete a song"
                                  >
                                    <DeleteASong
                                      song_id={song.id}
                                      closeModal={closeModal}
                                      title={song.title}
                                    />
                                  </Modal>

                                  {/* replae Testfunction with your component */}
                                  <div className="add-song-playlist-nav">
                                    <OpenModalButton
                                      modalComponent={
                                        <AddToPlaylistModal songId={song.id} />
                                      }
                                      buttonText={
                                        <p>
                                          <FaList />
                                          {
                                            '                                                 '
                                          }
                                          add to playlist
                                        </p>
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="add-song-playlist-nav">
                                <OpenModalButton
                                  modalComponent={
                                    <AddToPlaylistModal songId={song.id} />
                                  }
                                  buttonText={
                                    <p>
                                      <FaList />
                                      {
                                        '                                                 '
                                      }
                                      add to playlist
                                    </p>
                                  }
                                />
                              </div>
                            )
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );

}
export default SongDetail;
