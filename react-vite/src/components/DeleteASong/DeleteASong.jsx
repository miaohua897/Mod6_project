import { useDispatch } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"
import {deleteASong} from "../../redux/songs"

function DeleteASong({song_id} ){

  
  
    const dispatch=useDispatch()
    const handleDelete=()=>{
         dispatch(deleteASong(song_id))
       
    }
    return (
        <div>
            <p>are you sure</p>
            <button onClick={handleDelete}>
                delete
            </button>
            <button>
                cancel
            </button>
        </div>
    )
}
export default DeleteASong