import { useEffect ,useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {getCurrentAllSongs} from '../../redux/songs'
import { useNavigate, useParams } from "react-router-dom"
import './SongDetail.css'
import { FaPlay ,FaEdit,FaTrash} from 'react-icons/fa';
import DeleteASong from '../DeleteASong'
import Modal from 'react-modal';

Modal.setAppElement('#root');

function SongDetail(){

  const [isModalOpen,setIsModalOpen] = useState(false)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const {song_id} = useParams()
  const navigate = useNavigate()
  const [visible_lyrics,setVisible_lyrics] = useState(6)
  const [dropdown,setDropdown] = useState(false)

  const [selectSong,setSelectSong]=useState(0)

  const closeDropDown =()=>setDropdown(false);

  document.addEventListener('click',closeDropDown)

  
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getCurrentAllSongs())
  },[dispatch])

  const songs = useSelector(state=>state.song.currentUserAllSongs)
  const song= songs.filter(el=>el.id===Number(song_id))[0]

    return (
        <div >
            {/* <div>
                <button onClick={()=> navigate('/songs/new')}>add a song</button>
            </div> */}
        {
              song?
              <div className='song_details'>
                  <div className="song_head">
                  <img className='img_song_detail' src={song.image_url}></img>
                  <div >
                  <h1>{song.title}</h1>
                   <p>{song.release_year} {  '.'  } {song.duration}</p>
        
                  </div>
                  </div>
              <div className='song_body'>
                <p>Lyrics</p>
               <div>
               {
               song.lyrics.split(',').slice(0,visible_lyrics).map((el,index)=> 
               (<p key ={index}>{el}</p>)
            )}
            </div>
            {
                visible_lyrics===6?
                <button onClick={()=>setVisible_lyrics(song.lyrics.length)} className="visible_lyrics">... show more</button>
                :
                <button onClick={()=>setVisible_lyrics(6)} className="visible_lyrics">show less</button>

            }
           
              </div>
              <div className='song_foot'>
              {/* <audio controls >
                  <source  src={song.audio_url} type='audio/mp3' />
              </audio> */}
              </div>
              <div>
                <table  className="tableSongList">
                    <thead>
                        <tr className="tableHead">
                            <th></th>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>🕘</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody >
                        {
                            song.albums.length !==0?
                           song.albums[0].songs.map((el,index)=>(
                            <tr key={index} className="tableBody">
                                <td>
                                    <button style={{backgroundColor:"transparent"}} ><FaPlay size={15} color="darkgreen"  /></button>
                                </td>
                                <td
                                onClick={()=>navigate(`/song/${el.id}`)}
                                >{el.title}</td>
                                <td
                                onClick={()=>navigate(`/song/${el.id}`)}
                                >{song.albums[0].artist.artist_name}</td>
                                <td
                                onClick={()=>navigate(`/song/${el.id}`)}
                                >{el.duration}</td>
                                <td>
                                  <div>
                                 
                                  
                                  <div className="songDetailDropDown">
                                    <button
                                    key={index}
                                    className="songDetailDropDownButton"
                                     onClick={(e)=>
                                    {
                                        e.stopPropagation();
                                        setDropdown(true);
                                        setSelectSong(el.id)
                                    }
                                        
                                        }>...</button>
                                    {

                                       dropdown&&selectSong===el.id?
                                       <div className="updateDeleteContainer">
                                         <button 
                                         className="updateASongNav"
                                         onClick={()=>navigate(`/songs/${el.id}/update`)}>
                                            <FaEdit />
                                            {'                                      '}
                                             update a song</button>
                                         {/* <p className="updateDeleteDividedLine"></p> */}
                                         <button 
                                         className="deleteASongNav"
                                         onClick={openModal}>
                                            <FaTrash />
                                            {'                                      '}
                                             delete a song</button>
                                        <Modal isOpen={isModalOpen} 
                                        className="deleteAModal"
                                        overlayClassName="deleteAOverlay"
                                        onRequestClose={closeModal} 
                                        contentLabel="delete a song">
                                        {/* <button 
                                        className="closeDeleteButton"
                                        onClick={closeModal}> ✖️ </button> */}
                                        <DeleteASong song_id={el.id} closeModal={closeModal} title={el.title}/>  
                                        </Modal>
                                        </div>
                                      
                                       :null
                                 }

                                 
                                  </div>

                                  </div>
                           
                                 
                                </td>

                            </tr>
                           )) 
                           :null
                        }
                    </tbody>
                </table>

              </div>
          
                 
              </div>
              :null
        }
        </div>
    )
}
export default SongDetail