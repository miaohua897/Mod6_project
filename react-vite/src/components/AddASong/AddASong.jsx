import { useState} from "react";
import {useDispatch} from 'react-redux';
import {createASong} from '../../redux/songs';
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useModal } from '../../context/Modal';
import {FaTimes} from 'react-icons/fa';
import './AddASong.css'

function AddASong(){
    const [title,setTitle] = useState('');
    // const [duration, setDuration] = useState('');
    const [lyrics,setLyrics]=useState('');
    const [genre,setGenre]=useState('')
    const [image,setImage]=useState(null)
    const [audio, setAudio]=useState(null)
    const [release_year,setRelease_year]=useState(0);
    const [min_duration,setMin_duration] = useState(-1);
    const [s_duration,setS_duration] = useState(-1);
    const [titleError, setTittleError]=useState('');
    const [ryError,setRyError]=useState({'error':''});
    const [minError,setMinError] = useState('');
    const [sError,setSError] = useState('');
    const { closeModal } = useModal();

    const dispatch = useDispatch()
    const navigate=useNavigate()

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <h1>Log in, please</h1>

    const handleSubmit= async (e)=>{
        e.preventDefault();

        if(title.length>30){
            const errorMes ='Title is too long';
            setTittleError(errorMes);
            return ;
        }

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
        if (release_year <=0 || release_year >10000) {
            const error = {'error':'release year is a positive number, less than 10000'}
            setRyError(error)
          
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
        formData.append('user_id',sessionUser.id)
        // formData.append('user_id',23)

        const res = await dispatch(createASong(formData))
        console.log('new song',res)
        setImage(null)
        setAudio(null)
        setTitle('')
        // setDuration('')
        setS_duration(-1)
        setMin_duration(-1)
        setLyrics('')
        setGenre('')
        setRelease_year(0)
        closeModal()
        if(res.id)
        {
            await navigate(`/song/${res.id}`)
            // window.location.reload();
        }
            
             
        else{
            window.alert("can't add the song")
        }
      
    }

    return (

        <div className="add-song-modal-container">

            <div className="close-add-song-button-position">
            <button
            className="close-add-song-modal"
            onClick={()=> closeModal()}
            >  <FaTimes /> </button>
            </div>
            
            <form
            onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="add-song-container"
            >
               <h2 className="add-song-title">Add a Song to Museic</h2>
               <p>song title</p>
               {titleError!==""? <p style={{color:"red"}}>{titleError}</p>: null}
                <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                className="add-song-input"
                >
                </input>
                <p>song duration</p>
               {minError!==""? <p style={{color:"red"}}>{minError}</p>: null}
               {sError!==""? <p style={{color:"red"}}>{sError}</p>: null}
        
               <div className='duration-input-container'>
             
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
                value={release_year===0?'':release_year}
                onChange={(e)=>setRelease_year(e.target.value)}
                required
                className="add-song-input"
                >
                </input>
                <p>song lyrics</p>
                <input
                type='text'
                value ={lyrics}
                onChange={(e)=>setLyrics(e.target.value)}
                 className="add-lyrics-input"
                 required
                >
                </input>
                <p>song genre</p>
                <input
                type='text'
                name="genre" pattern="[A-Za-z\s]+" title="Only letters and spaces are allowed" 
                value={genre}
                onChange={(e)=>setGenre(e.target.value)}
                required
                className="add-song-input"
                >
                </input>
                <p>upload a image for the song</p>
                <label>
                 
                <input
                type='file'
                accept="image/*"
                onChange={(e)=>setImage(e.target.files[0])}
                required
                className="add-song-input"
                id='update-files'
                >
                </input>
                </label>
            
               
                <p>upload a  song</p>
                <label>
                {/* <span
                 className="requiredMessage"
                >This field is required</span> */}
                <input
                type='file'
                accept="mp3/*"
                onChange={(e)=>setAudio(e.target.files[0])}
                required
                className="add-song-input"
                >   
                </input>

                </label>
               
               
                <button 
                className="submit-add-song-button"
                type="submit">Submit</button>
 
        
            </form>
        </div>
    )
}
export default AddASong