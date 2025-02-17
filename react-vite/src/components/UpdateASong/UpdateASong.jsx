import { useState} from "react";
import {useDispatch} from 'react-redux';
import {updateASong} from '../../redux/songs'
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {FaTimes} from 'react-icons/fa';

import './UpdateASong.css'

function UpdateASong({song_id,closeUpdateModal}){

        const songs = useSelector(state=>state.song.currentUserAllSongs)
        const song = songs.filter(el=>el.id===Number(song_id))[0]
     
        const [title,setTitle] = useState(song.title);
       
        const [lyrics,setLyrics]=useState(song.lyrics);
        const [genre,setGenre]=useState(song.genre)
        const [image,setImage]=useState(null)
        const [audio, setAudio]=useState(null)
        const [min_duration,setMin_duration] = useState(song.duration.split(':')[0]);
        const [s_duration,setS_duration] = useState(song.duration.split(':')[1]);
        const [titleError, setTittleError]=useState('');
        const [release_year,setRelease_year]=useState(song.release_year)
        const [ryError,setRyError]=useState({'error':''})
        const [minError,setMinError] = useState('');
        const [sError,setSError] = useState('');
        const [disableButton,setDisableButton]=useState(false)
        const dispatch = useDispatch()
        const navigate=useNavigate()
        
        const handleSubmit= async (e)=>{
                 e.preventDefault();
                 setDisableButton(true)

                  if(title.length>30){
                    const errorMes ='Title is too long';
                    setTittleError(errorMes);
                    setDisableButton(false)
                    return ;
                }

                 setMinError('')
                 setSError('')
                 if( min_duration <0 || min_duration>60) {
                     const errorMes = "Minutes can't be less than 0 or greater than 60."
                     setMinError(errorMes)
                     setDisableButton(false)
                     return ;
                 }
                 if( s_duration <0 || s_duration>60) {
                     const errorMes = "Second can't be less than 0 or greater than 60."
                     setSError(errorMes)
                     setDisableButton(false)
                     return ;
                 }

                       const time_value =`${String(min_duration)}:${String(s_duration)}`;
                       console.log('release year',release_year )
                       if (release_year <=0) {
                           const error = {'error':'release year is a positive number'}
                           setRyError(error)
                           setImage(null)
                           setAudio(null)
                           setTitle('')
                           // setDuration('')
                           setLyrics(song.lyrics)
                           setGenre(song.genre)
                           setRelease_year(song.release_year)
                           setS_duration(song.duration.split(':')[1])
                           setMin_duration(song.duration.split(':')[0])
                           setDisableButton(false)
                           return ;
                           
                       } 
                       // setDuration(time_value)
                       // console.log('time_value',time_value,duration)
                       const formData = new FormData();
                       console.log('image',image)
                       formData.append('image',image);
                       formData.append('title',title)
                       // formData.append('duraton',duration)
                       formData.append('duraton',time_value)
                       formData.append('lyrics',lyrics)
                       formData.append('genre',genre)
                       formData.append('audio',audio)
                       formData.append('release_year',release_year)
                       formData.append('user_id',song.user_id)
                       // formData.append('user_id',23)
               
                       await dispatch(updateASong(formData,song_id))
                     
                       setImage(null)
                       setAudio(null)
                       setTitle('')
                       // setDuration('')
                       setS_duration(-1)
                       setMin_duration(-1)
                       setLyrics('')
                       setGenre('')
                       setRelease_year(0)
                     
                     navigate(`/song/${song_id}`)
                     closeUpdateModal()
                     setDisableButton(false)
            }
         
    return (
        <div className="update-song-modal-container">
               <div className="close-update-song-button-position">
                      <button
                      className="close-update-song-modal"
                      onClick={()=> closeUpdateModal()}
                      >  <FaTimes /> </button>
                </div>

            <form
            onSubmit={handleSubmit}
              encType="multipart/form-data"
               className="update-song-container"
            >
                <h2 className="update-your-song">Update your song</h2>
                <p>song title</p>
                {titleError!==""? <p style={{color:"red"}}>{titleError}</p>: null}
                <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                 className="update-song-input"
                >
                </input>
                <div
                className='duration-input-container'
                >
                <p>song duration</p>
                {minError!==""? <p style={{color:"red"}}>{minError}</p>: null}
                {sError!==""? <p style={{color:"red"}}>{sError}</p>: null}
                  <input 
                type='number'
                value={min_duration===-1?'':min_duration}
                onChange={(e)=>setMin_duration(e.target.value)}
                className="duration-input-box"
                >    
                </input> <a> min</a>
               
                <input 
                type='number'
                value={s_duration===-1?'':s_duration}
                onChange={(e)=>setS_duration(e.target.value)}
                className="duration-input-box"
                >    
                </input> <a> s</a>

                </div>
                
                <p>release year</p>
                {ryError.error!==""? <p style={{color:"red"}}>{ryError.error}</p>: null}
                <input
                type='number'
                value={release_year}
                onChange={(e)=>setRelease_year(e.target.value)}
                 className="update-song-input"
                >
                </input>
                <p>song lyrics</p>
                <textarea
                  value ={lyrics}
                  onChange={(e)=>setLyrics(e.target.value)}
                //   rows='4'
                  cols='10'
                   className="update-lyrics-input"
                >
                </textarea>
         
                <p>song genre</p>
                <input
                type='text'
                value={genre}
                onChange={(e)=>setGenre(e.target.value)}
                 className="update-song-input"
                >
                </input>
                <p>upload a image for the song</p>
                <input
                type='file'
                accept="image/*"
                onChange={(e)=>setImage(e.target.files[0])}
                className="update-song-input"    
                >
                 
                </input>
                <p>upload a  song</p>
                <input
                type='file'
                accept="mp3/*"
                onChange={(e)=>setAudio(e.target.files[0])}
                className="updateSonginput" 
                >   
                </input>
                <button 
                className="submit-update-song-button"
                disabled={disableButton}
                type="submit">Submit</button>

            </form>
        </div>
    )
}
export default UpdateASong