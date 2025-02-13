import PlaylistForm from "../PlaylistForm";

function EditPlaylistForm({ playlist }){
    
    return(
        <PlaylistForm playlist={playlist} formType='Update Playlist'/>
    )
}

export default EditPlaylistForm;