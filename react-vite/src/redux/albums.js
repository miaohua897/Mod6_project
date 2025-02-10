// action constants

const LOAD_ALBUMS = "albums/loadAlbums";
const CREATE_ALBUM = "albums/createAlbum";
const UPDATE_ALBUM = "albums/updateAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";

// regular actions

const loadAlbums = (albums) => {
  return {
    type: LOAD_ALBUMS,
    albums,
  };
};

const createAlbum = (album) => {
  return {
    type: CREATE_ALBUM,
    album,
  };
};

const updateAlbum = (album) => {
  return {
    type: UPDATE_ALBUM,
    album,
  };
};

const deleteAlbum = (albumId) => {
  return {
    type: DELETE_ALBUM,
    albumId,
  };
};

// thunk actions

export const thunkLoadAlbums = () => async (dispatch) => {
  const response = await fetch("/api/albums");

  if (response.ok) {
    const albums = await response.json();
    dispatch(loadAlbums(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkCreateAlbum = (newAlbum) => async (dispatch) => {
  const response = await fetch("/api/albums", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAlbum),
  });

  if (response.ok) {
    const album = await response.json();
    dispatch(createAlbum(album));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkUpdateAlbum =
  (updatedAlbum, updatedAlbumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${updatedAlbumId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAlbum),
    });

    if (response.ok) {
      const album = await response.json();
      dispatch(updateAlbum(album));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: "Something went wrong. Please try again" };
    }
  };

export const thunkDeleteAlbum = (deletedAlbumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${deletedAlbumId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteAlbum(deletedAlbumId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkAddAlbumSong = (albumId, songId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}/songs/${songId}`, {
    method: "POST",
  });

  if (response.ok) {
    const album = await response.json();
    dispatch(updateAlbum(album));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

export const thunkDeleteAlbumSong = (albumId, songId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}/songs/${songId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const album = await response.json();
    dispatch(updateAlbum(album));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: "Something went wrong. Please try again" };
  }
};

// reducer

const albumsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_ALBUMS:
      return { ...state, ...action.albums };
    case CREATE_ALBUM:
      return { ...state, ...action.album };
    case UPDATE_ALBUM:
      return { ...state, ...action.album };
    case DELETE_ALBUM: {
      const { [action.albumId]: _, ...newState } = state;
      return newState;
    }
  }
};
