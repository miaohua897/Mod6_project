import { useSelector, useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { addSongToUserPlaylist } from "../../redux/playlists";
import {  useState } from "react";

const AddToPlaylistModal = ({ songId }) => {    
    const [selectedPlaylist, setselectedPlaylist] = useState("");
    const playlists = useSelector( (state) => Object.values(state.playlists) || []);
   // const [availablePlaylists, setAvailablePlaylists] = useState(false);
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const playlistsWitoutSong = playlists?.filter( playlist => !playlist.song_ids.includes(songId));

   // setAvailablePlaylists(playlistsWitoutSong);

    const addPlaylistSong = async () => {
        await dispatch(addSongToUserPlaylist(selectedPlaylist, songId));
        closeModal();
    };

    return(
        <div className="playlist-add-song-form">
            <h3>Add Song to a Playlist</h3>
            <select
                  value={selectedPlaylist}
                  onChange={(e) => setselectedPlaylist(e.target.value)}
                >
                  <option value="" disabled>
                    Select a Playlist...
                  </option>
                  {playlistsWitoutSong.map((playlist) => {
                      return (
                        <option key={playlist.id} value={playlist.id}>
                          {playlist.name}
                        </option>
                      );                    
                  })}
            </select>
            <button
                  disabled={selectedPlaylist === "" ? true : false}
                  onClick={addPlaylistSong}
                >
                  Add 
            </button>
        </div>
    );
}

export default AddToPlaylistModal;