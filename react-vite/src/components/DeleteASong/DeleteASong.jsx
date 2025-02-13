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
            <a>
            This will delete{' '}
            </a>
            <a style={{fontWeight:"bolder"}}>
            {title}
            </a>
            <a>
            {' '}from Your Library.
            </a>
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