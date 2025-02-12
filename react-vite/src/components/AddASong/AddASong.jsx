import { useState} from "react";
import {useDispatch} from 'react-redux';
import {createASong} from '../../redux/songs';
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom'
import './AddASong.css'

function AddASong(){
    const [title,setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [lyrics,setLyrics]=useState('');
    const [genre,setGenre]=useState('')
    const [image,setImage]=useState(null)
    const [audio, setAudio]=useState(null)
    const [release_year,setRelease_year]=useState(0);
    const [min_duration,setMin_duration] = useState(-1);
    const [s_duration,setS_duration] = useState(-1)

    const dispatch = useDispatch()
    const navigate=useNavigate()

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <h1>Log in, please</h1>

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const time_value =`${String(min_duration)}:${String(s_duration)}`;
       
        setDuration(time_value)
        console.log('time_value',time_value,duration)
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
        formData.append('user_id',sessionUser.id)
        // formData.append('user_id',23)

        const res = await dispatch(createASong(formData))
        console.log('new song',res)
        setImage(null)
        setAudio(null)
        setTitle('')
        setDuration('')
        setLyrics('')
        setGenre('')
        setRelease_year(0)
        await navigate(`/song/${res.id}`)
    }

    return (
        <div >
            <form
            onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="addSongContainer"
            >
       
               <p>song title</p>
                <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                className="addSonginput"
                >
                </input>
        
               <div className='durationInputContainer'>
               <p>song duration</p>
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
               
                {/* <input
                type='text'
                value={duration}
                onChange={(e)=>setDuration(e.target.value)}
                required
                className="addSonginput"
                >
                </input> */}
                <p>release year</p>
                <input
                type='number'
                value={release_year===0?'':release_year}
                onChange={(e)=>setRelease_year(e.target.value)}
                required
                className="addSonginput"
                >
                </input>
                <p>song lyrics</p>
                <input
                type='text'
                value ={lyrics}
                onChange={(e)=>setLyrics(e.target.value)}
                required
                className="addSonginput"
                >
                </input>
                <p>song genre</p>
                <input
                type='text'
                name="genre" pattern="[A-Za-z\s]+" title="Only letters and spaces are allowed" 
                value={genre}
                onChange={(e)=>setGenre(e.target.value)}
                required
                className="addSonginput"
                >
                </input>
                <p>upload a image for the song</p>
                <input
                type='file'
                accept="image/*"
                onChange={(e)=>setImage(e.target.files[0])}
                required
                className="addSonginput"
                id='updatefiles'
                >
                </input>
               
                <p>upload a  song</p>
                <input
                type='file'
                accept="mp3/*"
                onChange={(e)=>setAudio(e.target.files[0])}
                required
                className="addSonginput"
                >   
                </input>
               
                <button 
                className="submitAddSongButton"
                type="submit">Submit</button>
             
          

            </form>
        </div>
    )
}
export default AddASong