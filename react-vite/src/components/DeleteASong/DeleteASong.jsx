import { useDispatch } from "react-redux"
import { useNavigate} from "react-router-dom"
import {deleteASong} from "../../redux/songs"

function DeleteASong({song_id,closeModal} ){

   const navigate = useNavigate()
  
    const dispatch=useDispatch()
    const handleDelete=()=>{
         dispatch(deleteASong(song_id))
         navigate('/')

       
    }
    return (
        <div>
            <p>are you sure</p>
            <button onClick={handleDelete}>
                delete
            </button>
            <button onClick={closeModal}>
                cancel
            </button>
        </div>
    )
}
export default DeleteASong