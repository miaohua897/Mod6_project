import { useState} from "react";
import {useDispatch} from 'react-redux';
import {updateASong} from '../../redux/songs'
import { useSelector} from "react-redux";
import { useNavigate ,useParams} from 'react-router-dom'

function UpdateASong(){
    const {song_id} = useParams()
    const songs = useSelector(state=>state.song.currentUserAllSongs)
    const song = songs.filter(el=>el.id===Number(song_id))[0]
     
        const [title,setTitle] = useState(song.title);
        const [duration, setDuration] = useState(song.duration);
        const [lyrics,setLyrics]=useState(song.lyrics);
        const [genre,setGenre]=useState(song.genre)
        const [image,setImage]=useState(null)
        const [audio, setAudio]=useState(null)
        const [release_year,setRelease_year]=useState(song.release_year)
        const dispatch = useDispatch()
        const navigate=useNavigate()
    
        // const sessionUser = useSelector((state) => state.session.user);
        // if (!sessionUser) return <h1>Log in, please</h1>
    
        // console.log('update a song',song)
        const handleSubmit= async (e)=>{
                e.preventDefault();
                const formData = new FormData();
                // console.log('image',image)

                formData.append('image',image);
         
                formData.append('title',title)
                formData.append('duraton',duration)
                formData.append('lyrics',lyrics)
                formData.append('genre',genre)
                formData.append('audio',audio)
                formData.append('release_year',release_year)
                formData.append('user_id',song.user_id)
        
                await dispatch(updateASong(formData,song_id))
                // console.log('update new song',title,duration,lyrics,genre,res)
                setImage(null)
                setAudio(null)
                setTitle('')
                setDuration('')
                setLyrics('')
                setGenre('')
                setRelease_year(0)
                console.log(song_id)
                navigate(`/song/${song_id}`)
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
                value={title?title:song.title}
                onChange={(e)=>setTitle(e.target.value)}
                >
                </input>
                <p>song duration</p>
                <input
                type='text'
                value={duration?duration:song.duration}
                onChange={(e)=>setDuration(e.target.value)}
                >
                </input>
                <p>release year</p>
                <input
                type='number'
                value={release_year?release_year:song.release_year}
                onChange={(e)=>setRelease_year(e.target.value)}
                >
                </input>
                <p>song lyrics</p>
                <input
                type='text'
                value ={lyrics?lyrics:song.lyrics}
                onChange={(e)=>setLyrics(e.target.value)}
                >
                </input>
                <p>song genre</p>
                <input
                type='text'
                value={genre?genre:song.genre}
                onChange={(e)=>setGenre(e.target.value)}
                >
                </input>
                <p>upload a image for the song</p>
                <input
                type='file'
                accept="image/*"
                onChange={(e)=>setImage(e.target.files[0])}

                >
                 
                </input>
                <p>upload a  song</p>
                <input
                type='file'
                accept="mp3/*"
                onChange={(e)=>setAudio(e.target.files[0])}
                >   
                </input>
                <button type="submit">Submit</button>

            </form>
        </div>
    )
}
export default UpdateASong