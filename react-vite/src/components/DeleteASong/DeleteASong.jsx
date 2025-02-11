import { useDispatch } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {deleteASong} from "../../redux/songs"

function DeleteASong(){

    const navigate=useNavigate()
    const {song_id} = useParams()
    const dispatch=useDispatch()
    const handleDelete=()=>{
         dispatch(deleteASong(song_id))
         navigate('/songs')
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