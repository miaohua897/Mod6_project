import { createSelector } from 'reselect';
import { addUserPlaylist } from "./session"

const LOAD_USER_PLAYLISTS = "playlists/loadUserPlaylists";
const RESET_USER_PLAYLISTS = "playlists/resetUserPlaylists";
const ADD_PLAYLIST_DATA = "playlists/addPlaylistData";
const REMOVE_PLAYLIST_DATA = "playlists/removePlaylistData";
const ADD_SONG_TO_PLAYLIST = "playlists/addSongToPlaylist";
const REMOVE_SONG_FROM_PLAYLIST = "playlists/removeSongFromPlaylist";
/*-------------------  Action Creators: ---------------------------*/

export const loadUserPlaylists = (playlists) => ({
  type: LOAD_USER_PLAYLISTS,
  playlists,
});

export const resetUserPlaylists = () => ({
  type: RESET_USER_PLAYLISTS,
});

export const addPlaylistData = (playlist) => ({
    type: ADD_PLAYLIST_DATA,
    playlist,
});

export const removePlaylistData = (playlistId) => ({
    type: REMOVE_PLAYLIST_DATA,
    playlistId,
});

export const addSongToPlaylist = (playlistId, songId) => ({
    type: ADD_SONG_TO_PLAYLIST,
    playlistId,
    songId,
});

export const removeSongFromPlaylist = (playlistId, songId) => ({
    type: REMOVE_SONG_FROM_PLAYLIST,
    playlistId,
    songId,
});

/*------------------------ Thunk Action Creators ----------------- */

export const getUserPlaylists = () => async (dispatch) => {
    const response = await fetch(`/api/playlists`);
    const data = await response.json();
    if (response.ok) {    
        dispatch(loadUserPlaylists(data.playlists));      
    }
    return response;
}

export const createUserPlaylist = (image_url, name, description) => async (dispatch) => {
  const response = await fetch('/api/playlists',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ image_url, name, description })
  });

  if (response.ok) {
    const playlist = await response.json();
    if (playlist && playlist.id ){
      dispatch(addUserPlaylist(parseInt(playlist.id)))
      dispatch(addPlaylistData(playlist))
    }
    return playlist;
  } else {    
    return response;
  } 
}

export const updateUserPlaylist = (playlist_id, image_url, name, description) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlist_id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ image_url, name, description })
  });

  const playlist = await response.json();

  if (response.ok) {
    if (playlist && playlist.id )  dispatch(addPlaylistData(playlist)); //dispatch(addUserPlaylist(parseInt(playlist.id)))
    return playlist;
  }

  return response;
}

export const addSongToUserPlaylist = (playlist_id, song_id) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlist_id}/songs`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ song_id })
  });

  const data = await response.json();
  if (response.ok) {
    dispatch(addSongToPlaylist( parseInt(playlist_id), parseInt(song_id)))
    return data;     
  }  else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
}

export const removeSongFromUserPlaylist = (playlist_id, song_id ) => async (dispatch) => {
  const response = await fetch(`/api/playlists/${playlist_id}/songs/${song_id}`,{
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'}
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(removeSongFromPlaylist( parseInt(playlist_id), parseInt(song_id)));  
    return data;
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
}

/*-------------------------- Selectors --------------------------- */

const getSongState = (state) => state.song;

const getPlaylistSongIds = (state, playlistId) => {
  const playlist = state.playlists[playlistId]
  return playlist ? playlist.song_ids : []
}
export const selectPlaylistSongs = createSelector(
  [getSongState, getPlaylistSongIds],
  (songState, songIds) => songState.songs.filter(song => songIds.includes(song.id))
);


/*-------------------------- Reducer ---------------------------- */

const playlistsReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_USER_PLAYLISTS: {
        const newState = {};
        action.playlists.forEach((playlist) => {
            newState[playlist.id] = playlist;
        });
        return newState;
      }
      case RESET_USER_PLAYLISTS: {
        return {};
      }
      case ADD_PLAYLIST_DATA: {
          return {...state, [action.playlist.id]: action.playlist }
      }
      case REMOVE_PLAYLIST_DATA: {
        const newState = { ...state };
        delete newState[action.playlistId];
        return newState;
      }
      case ADD_SONG_TO_PLAYLIST: {
        const { playlistId, songId } = action;
    
        return {
            ...state,
            [playlistId]: {
                ...state[playlistId],
                song_ids: state[playlistId].song_ids.includes(songId)
                    ? state[playlistId].song_ids
                    : [...state[playlistId].song_ids, songId]
            }
        };
      }
      case REMOVE_SONG_FROM_PLAYLIST: {
        const { playlistId, songId } = action;
    
        return {
            ...state,
            [playlistId]: {
                ...state[playlistId],
                song_ids: state[playlistId].song_ids.filter(id => id !== songId)
            }
        };
      }
      default:
        return state;
    }
  };
  
export default playlistsReducer;