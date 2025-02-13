const ADD_TO_PLAYER = 'player/addToPlayer';
const ADD_TO_PLAYER_TOP = 'player/addToPlayerTop';
const CLEAR_PLAYER = 'player/clearPlayer';

const addToPlayer = songId => {
  return {
    type: ADD_TO_PLAYER,
    songId,
  };
};

const addToPlayerTop = songId => {
  return {
    type: ADD_TO_PLAYER_TOP,
    songId,
  };
};

const clearPlayer = () => {
  return {
    type: CLEAR_PLAYER,
  };
};

export const thunkAddToPlayer = songId => async dispatch => {
  dispatch(addToPlayer(songId));
};

export const thunkAddToPlayerTop = songId => async dispatch => {
  dispatch(addToPlayerTop(songId));
};

export const thunkClearPlayer = () => async dispatch => {
  dispatch(clearPlayer());
};

const playerReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_PLAYER:
      return [...state, action.songId];
    case ADD_TO_PLAYER_TOP:
      return [action.songId, ...state];
    case CLEAR_PLAYER:
      return [];
    default:
      return state;
  }
};

export default playerReducer;
