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

       
    }
    return (
        <div className="deleteASongContainer">
         <h3>Delete from Your Library ?</h3>
         <p>This will delete {title} from Your Library.</p>
         <div className="deleteASongButtonContainer">
         <button 
            className="deleteASongCancelButton"
            onClick={closeModal}>
                cancel
            </button>
            <div>
             <button 
            className="deleteASongButton"
            onClick={handleDelete}>
                delete
            </button>
            </div>
         </div>        
        </div>
    )
}
export default DeleteASong