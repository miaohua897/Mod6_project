import { useDispatch } from "react-redux"
import { useNavigate} from "react-router-dom"
import {deleteASong} from "../../redux/songs"
import './DeleteASong.css'

function DeleteASong({song_id,closeModal,title} ){

   const navigate = useNavigate()
  
    const dispatch=useDispatch()

    const handleDelete=()=>{
         dispatch(deleteASong(song_id))
         navigate('/')  
         closeModal() 
    }
    return (
        <div className="delete-song-container">
        <p className="delete-song-confirm">Delete from Your Library ?</p>
        <div className="delete-song-confirm-again">
            <p>
            This will delete
            </p>
            <p
            //  style={{fontWeight:"bolder"}}
            id='delete-song-title'
            >
           {title}
            </p>
            <p>
            from Your Library.
            </p>
            </div>
        <div className="delete-song-button-container">
        <button 
           className="delete-song-cancel-button"
           onClick={closeModal}>
               Cancel
           </button>
         <p className="delete-song-button-frame"> 
         <button 
           className="delete-song-button"
           onClick={handleDelete}>
               delete
           </button>
         </p>
           
          
        </div>        
       </div>
    )
}
export default DeleteASong