const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const ADD_LIKED_SONG = "session/addLikedSong";
const REMOVE_LIKED_SONG = "session/removeLikedSong ";
const ADD_USER_SONG = "session/addUserSong ";
const REMOVE_USER_SONG = "session/removeUserSong ";
const ADD_USER_ALBUM = "session/addUserAlbum ";
const REMOVE_USER_ALBUM = "session/removeUserAlbum ";
const ADD_USER_PLAYLIST = "session/addUserPlaylist ";
const REMOVE_USER_PLAYLIST = "session/removeUserPlaylist ";

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});


export const addLikedSong = (songId) => ({
  type: ADD_LIKED_SONG,
  payload: songId
});

export const removeLikedSong = (songId) => ({
  type: REMOVE_LIKED_SONG,
  payload: songId
});

export const addUserSong = (songId) => ({
  type: ADD_USER_SONG,
  payload: songId
});

export const removeUserSong = (songId) => ({
  type: REMOVE_USER_SONG,
  payload: songId
});

export const addUserAlbum = (albumId) => ({
  type: ADD_USER_ALBUM,
  payload: albumId
});

export const removeUserAlbum = (albumId) => ({
  type: REMOVE_USER_ALBUM,
  payload: albumId
});

export const addUserPlaylist = (playlistId) => ({
  type: ADD_USER_PLAYLIST,
  payload: playlistId
});

export const removeUserPlaylist = (playlistId) => ({
  type: REMOVE_USER_PLAYLIST,
  payload: playlistId
});


export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case ADD_LIKED_SONG:
        return {
            ...state,
            user: {
                ...state.user,
                likedSongIds: [...new Set([...state.user.likedSongIds, action.payload])]
            }
        };
    case REMOVE_LIKED_SONG:
        return {
            ...state,
            user: {
                ...state.user,
                likedSongIds: state.user.likedSongIds.filter(id => id !== action.payload)
            }
        };
    case ADD_USER_SONG:
        return {
            ...state,
            user: {
                ...state.user,
                songIds: [...new Set([...state.user.songIds, action.payload])]
            }
        };
    case REMOVE_USER_SONG:
        return {
            ...state,
            user: {
                ...state.user,
                songIds: state.user.songIds.filter(id => id !== action.payload)
            }
        };
    case ADD_USER_ALBUM:
        return {
            ...state,
            user: {
                ...state.user,
                albumIds: [...new Set([...state.user.albumIds, action.payload])]
            }
        };
    case REMOVE_USER_ALBUM:
        return {
            ...state,
            user: {
                ...state.user,
                albumIds: state.user.albumIds.filter(id => id !== action.payload)
            }
        };
    case ADD_USER_PLAYLIST:
        return {
            ...state,
            user: {
                ...state.user,
                playlistIds: [...new Set([...state.user.playlistIds, action.payload])]
            }
        };
    case REMOVE_USER_PLAYLIST:
        return {
            ...state,
            user: {
                ...state.user,
                playlistIds: state.user.playlistIds.filter(id => id !== action.payload)
            }
        };      
    default:
      return state;
  }
}

export default sessionReducer;
