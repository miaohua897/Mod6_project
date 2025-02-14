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
        <div className="deleteASongContainer">
        <p className="deleteASongConfirm">Delete from Your Library ?</p>
        <div className="deleteASongConfirmAgain">
            <p>
            This will delete{' '}
            </p>
            <p
            //  style={{fontWeight:"bolder"}}
            id='delete-song-title'
            >
            {title}
            </p>
            <p>
            {' '}from Your Library.
            </p>
            </div>
        <div className="deleteASongButtonContainer">
        <button 
           className="deleteASongCancelButton"
           onClick={closeModal}>
               Cancel
           </button>
         <p className="deleteASongButtonFrame"> 
         <button 
           className="deleteASongButton"
           onClick={handleDelete}>
               delete
           </button>
         </p>
           
          
        </div>        
       </div>
    )
}
export default DeleteASong