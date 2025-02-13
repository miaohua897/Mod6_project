import PlaylistForm from "../PlaylistForm";

function CreatePlaylistForm(){
    const playlist = {
        image_url: '', 
        name: '', 
        description: ''
    };


    return(
        <PlaylistForm playlist={playlist} formType='Create Playlist'/>
    )
}

export default CreatePlaylistForm;