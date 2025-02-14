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
        const [s_duration,setS_duration] = useState(song.duration.split(':')[1])
        const [release_year,setRelease_year]=useState(song.release_year)
        const [ryError,setRyError]=useState({'error':''})
        const [minError,setMinError] = useState('');
        const [sError,setSError] = useState('');
        const dispatch = useDispatch()
        const navigate=useNavigate()
        
        const handleSubmit= async (e)=>{
                 e.preventDefault();

                 setMinError('')
                 setSError('')
                 if( min_duration <0 || min_duration>60) {
                     const errorMes = "Minutes can't be less than 0 or greater than 60."
                     setMinError(errorMes)
                     return ;
                 }
                 if( s_duration <0 || s_duration>60) {
                     const errorMes = "Second can't be less than 0 or greater than 60."
                     setSError(errorMes)
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
                           setLyrics('')
                           setGenre('')
                           setRelease_year(0)
                           setS_duration(-1)
                           setMin_duration(-1)
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
            }
         
    return (
        <div>
               <div className="closeUpdateASongButtonPosition">
                      <button
                      className="closeUpdateASongModal"
                      onClick={()=> closeUpdateModal()}
                      >  <FaTimes /> </button>
                </div>

            <form
            onSubmit={handleSubmit}
              encType="multipart/form-data"
               className="updateSongContainer"
            >
               
                <p>song title</p>
                <input
                type='text'
                value={title?title:song.title}
                onChange={(e)=>setTitle(e.target.value)}
                 className="updateSonginput"
                >
                </input>
                <div
                className='durationInputContainer'
                >
                <p>song duration</p>
                {minError!==""? <p style={{color:"red"}}>{minError}</p>: null}
                {sError!==""? <p style={{color:"red"}}>{sError}</p>: null}
                  <input 
                type='number'
                value={min_duration===-1?'':min_duration}
                onChange={(e)=>setMin_duration(e.target.value)}
                className="durationInputBox"
                >    
                </input> <a> min</a>
               
                <input 
                type='number'
                value={s_duration===-1?'':s_duration}
                onChange={(e)=>setS_duration(e.target.value)}
                className="durationInputBox"
                >    
                </input> <a> s</a>

                </div>
                
                <p>release year</p>
                {ryError.error!==""? <p style={{color:"red"}}>{ryError.error}</p>: null}
                <input
                type='number'
                value={release_year?release_year:song.release_year}
                onChange={(e)=>setRelease_year(e.target.value)}
                 className="updateSonginput"
                >
                </input>
                <p>song lyrics</p>
                <textarea
                  value ={lyrics?lyrics:song.lyrics}
                  onChange={(e)=>setLyrics(e.target.value)}
                //   rows='4'
                  cols='10'
                   className="updatelyricsinput"
                >
                </textarea>
         
                <p>song genre</p>
                <input
                type='text'
                value={genre?genre:song.genre}
                onChange={(e)=>setGenre(e.target.value)}
                 className="updateSonginput"
                >
                </input>
                <p>upload a image for the song</p>
                <input
                type='file'
                accept="image/*"
                onChange={(e)=>setImage(e.target.files[0])}
                className="updateSonginput"    
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
                className="submitUpdateSongButton"
                type="submit">Submit</button>

            </form>
        </div>
    )
}
export default UpdateASong