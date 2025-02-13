import { useEffect ,useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {getCurrentAllSongs} from '../../redux/songs'
import {  useParams } from "react-router-dom"
import './SongDetail.css'
import { FaPlay ,FaEdit,FaTrash,FaList} from 'react-icons/fa';
import DeleteASong from '../DeleteASong'
import Modal from 'react-modal';
import UpdateASong from '../UpdateASong';
import Testfunction from './Testfunction ';
import OpenModalButton from '../OpenModalButton'


Modal.setAppElement('#root');

function SongDetail(){

  const [isModalOpen,setIsModalOpen] = useState(false)
  const [isUpdateModalOpen,setIsUpdateModalOpen]=useState(false)
 
  const openModal = (e) => {
    e.preventDefault();
    if(!isModalOpen)
     setIsModalOpen(true);
    else return ;
}
  const openUpdateModal=(e)=>{
    e.preventDefault();
    if (!isUpdateModalOpen)
     setIsUpdateModalOpen(true)
    else return ;
  }

  const closeModal = () => {

    setIsModalOpen(false);
  }
  const closeUpdateModal=()=>{
   
    setIsUpdateModalOpen(false);
  }


  const {song_id} = useParams()

  const [visible_lyrics,setVisible_lyrics] = useState(6)
  const [dropdown,setDropdown] = useState(false)



  const closeDropDown =()=>setDropdown(false);

  document.addEventListener('click',closeDropDown)

  
  const dispatch = useDispatch()
  useEffect(()=>{
      dispatch(getCurrentAllSongs())
  },[dispatch])


  const sessionUser = useSelector((state) => state.session.user);
  const userSongs = useSelector(state=>state.song.currentUserAllSongs);
  const songs = useSelector(state=>state.song.songs)
  const song= songs.filter(el=>el.id===Number(song_id))[0]
  const isUserSong =userSongs.filter(el=>el.id===Number(song_id))
  // console.log('no login',sessionUser,userSongs,song,isUserSong)


    return (
        <div >
 
        {
              song?
              <div className='song_details'>
                  <div className="song_head">
                  <img className='img_song_detail' src={song.image_url}></img>
                  <div >
                  <h1>{song.title}</h1>
                   <p>{song.artist} {        '●'       } {song.release_year} {      '●'      } {song.duration}</p>
        
                  </div>
                  </div>
              <div className='song_body'>
                <p className="lyrics_format">Lyrics</p>
               <div>
               {
               song.lyrics.split(',').slice(0,visible_lyrics).map((el,index)=> 
               (<p 
                className="lyrics_detail_format"
                key ={index}>{el}</p>)
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
                    <tbody>
                        <tr className="tableBody">
                        <td>
                  <button style={{backgroundColor:"transparent",border:'None'}} 
                  className="playSongButton"
                  ><FaPlay size={15} color="darkgray"  /></button>
                     </td>
                     <td>{song.title}</td>
                    <td>{song.artist}</td>
                    <td >{song.duration}</td>

     <td>
          <div>
         
          {sessionUser?
            <div className="songDetailDropDown">
            <button
          
            className="songDetailDropDownButton"
             onClick={(e)=>
            {
                e.stopPropagation();
                setDropdown(true);
              
            }
                
                }>...</button>
            {

               dropdown||isUpdateModalOpen||isModalOpen?
               isUserSong.length !==0?
               <div>
                      <div className="updateDeleteContainer">
                 <button 
                 className="updateASongNav"
                 onClick={openUpdateModal}       
                 >
                    <FaEdit />
                    {'                                      '}
                     update a song</button>             
                 <Modal isOpen={isUpdateModalOpen} 
                className="updateAModal"
                overlayClassName="deleteAOverlay"
                onRequestClose={closeUpdateModal} 
                contentLabel="delete a song">
                <UpdateASong song_id={song.id} closeUpdateModal={closeUpdateModal}  />  
                </Modal> 
                  <button 
                 className="deleteASongNav"
                 onClick={openModal}
                 >
                    <FaTrash />
                    {'                                      '}
                     delete a song</button>
                <Modal isOpen={isModalOpen} 
                className="deleteAModal"
                overlayClassName="deleteAOverlay"
                onRequestClose={closeModal} 
                contentLabel="delete a song">
                <DeleteASong song_id={song.id} closeModal={closeModal} title={song.title}/>  
                </Modal>

             {/* replae Testfunction with your component */}
              <div className="addASongToPlaylistNav"> 
                   <OpenModalButton
                    modalComponent={<Testfunction  />}
                    buttonText={<p>
                      <FaList/>
             {'                                                 '}
                      add to playlist
                      </p> }
                  />       
               </div>
              
              </div>
              </div>
               :  
               <div className="addASongToPlaylistNav"> 
               <OpenModalButton
                modalComponent={<Testfunction  />}
                buttonText={<p>
                  <FaList/>
          {'                                                 '}
                  add to playlist
                  </p> }
              />       
              </div>
         
              
               :null
         }   
          </div>
          :null
          }
          </div>       
        </td>
                        </tr>        
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