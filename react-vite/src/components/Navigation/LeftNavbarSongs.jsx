import './LeftNavbarSongs.css';
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import {getCurrentAllSongs} from '../../redux/songs'

export default function LeftNavbarSongs({  sessionUser }) {

    const navigate = useNavigate()  
    const dispatch =useDispatch()
    useEffect(()=>{
        dispatch(getCurrentAllSongs())
    },[dispatch])

  const songs = useSelector(state=>state.song.currentUserAllSongs)

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
                    :null
                }
                </div>
       :
       <span>Songs placeholder</span>
    }
   
    </>
  );
}
