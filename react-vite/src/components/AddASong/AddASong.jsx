import { useState} from "react";
import {useDispatch} from 'react-redux';
import {createASong} from '../../redux/songs';
import { useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom'

function AddASong(){
    const [title,setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [lyrics,setLyrics]=useState('');
    const [genre,setGenre]=useState('')
    const [image,setImage]=useState(null)
    const [audio, setAudio]=useState(null)
    const [release_year,setRelease_year]=useState(0)
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <h1>Log in, please</h1>

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        console.log('image',image)
        formData.append('image',image);
        formData.append('title',title)
        formData.append('duraton',duration)
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
        <div>
            <form
            onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
               
                <p>song title</p>
                <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                required
                >
                </input>
                <p>song duration</p>
                <input
                type='text'
                value={duration}
                onChange={(e)=>setDuration(e.target.value)}
                required
                >
                </input>
                <p>release year</p>
                <input
                type='number'
                value={release_year===0?'':release_year}
                onChange={(e)=>setRelease_year(e.target.value)}
                required
                >
                </input>
                <p>song lyrics</p>
                <input
                type='text'
                value ={lyrics}
                onChange={(e)=>setLyrics(e.target.value)}
                required
                >
                </input>
                <p>song genre</p>
                <input
                type='text'
                value={genre}
                onChange={(e)=>setGenre(e.target.value)}
                required
                >
                </input>
                <p>upload a image for the song</p>
                <input
                type='file'
                accept="image/*"
                onChange={(e)=>setImage(e.target.files[0])}
                required

                >
                 
                </input>
                <p>upload a  song</p>
                <input
                type='file'
                accept="mp3/*"
                onChange={(e)=>setAudio(e.target.files[0])}
                required
                >   
                </input>
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}
export default AddASong