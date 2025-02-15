import './LeftNavbarSongs.css';
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import {getCurrentAllSongs} from '../../redux/songs'


export default function LeftNavbarSongs({  sessionUser }) {


    const navigate = useNavigate()  
    const dispatch =useDispatch()
    const songs = useSelector(state=>state.song.currentUserAllSongs
        )

    useEffect( ()=>{
        dispatch(getCurrentAllSongs())
    },[dispatch])

    console.log('i am from left nav bar',songs,sessionUser)


  return (
    <>
    {
       sessionUser?

           <div className="allSongs">
                {
                    songs.length !== 0?
                    songs.map((song,index)=>{
                        return (
                            <div key={index} className='songs_sidebar'>
                                <img 
                                 onClick={()=>navigate(`song/${song.id}`)}
                                className='img_sidebar' src={song.image_url}></img>
                                <button 
                                className='title_sidebar'
                                onClick={()=>navigate(`song/${song.id}`)}
                                >
                                {song.title}
                                </button>                               
                            </div>
                        )
                    })
                    :<p>Add a song to your library</p>
                }
                </div>
       :
       <span>Songs placeholder</span>
    }
   
    </>
  );
}
