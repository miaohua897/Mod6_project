const ADD_TO_PLAYER = 'player/addToPlayer';
const ADD_SONG_TO_PLAYER_INDEX = 'player/addSongToPlayerIndex';
const CLEAR_PLAYER = 'player/clearPlayer';
const DECREMENT_PLAYER_INDEX = 'player/decrementPlayerIndex';
const INCREMENT_PLAYER_INDEX = 'player/incrementPlayerIndex';

const addToPlayer = song => {
  return {
    type: ADD_TO_PLAYER,
    song,
  };
};

const addSongToPlayerIndex = (song, index) => {
  return {
    type: ADD_SONG_TO_PLAYER_INDEX,
    song,
    index,
  };
};

const clearPlayer = () => {
  return {
    type: CLEAR_PLAYER,
  };
};

const decrementPlayerIndex = () => {
  return {
    type: DECREMENT_PLAYER_INDEX,
  };
};

const incrementPlayerIndex = () => {
  return {
    type: INCREMENT_PLAYER_INDEX,
  };
};

export const thunkAddToPlayer = song => async dispatch => {
  dispatch(addToPlayer(song));
};

export const thunkAddSongToPlayerIndex = (song, index) => async dispatch => {
  dispatch(addSongToPlayerIndex(song, index));
};

export const thunkClearPlayer = () => async dispatch => {
  dispatch(clearPlayer());
};

export const thunkDecrementPlayerIndex = () => async dispatch => {
  dispatch(decrementPlayerIndex());
};

export const thunkIncrementPlayerIndex = () => async dispatch => {
  dispatch(incrementPlayerIndex());
};

const playerReducer = (state = { currentIndex: 0, songs: [] }, action) => {
  switch (action.type) {
    case ADD_TO_PLAYER:
      return { ...state, songs: [...state.songs, action.song] };
    case ADD_SONG_TO_PLAYER_INDEX:
      return {
        ...state,
        songs: state.songs.toSpliced(action.index, 0, action.song),
      };
    case CLEAR_PLAYER:
      return [];
    case DECREMENT_PLAYER_INDEX:
      return { ...state, currentIndex: state.currentIndex - 1 };
    case INCREMENT_PLAYER_INDEX:
      return { ...state, currentIndex: state.currentIndex + 1 };
    default:
      return state;
  }
};

export default playerReducer;
