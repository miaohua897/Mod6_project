const ADD_TO_PLAYER = 'player/addToPlayer';
const CLEAR_PLAYER = 'player/clearPlayer';

const addToPlayer = song => {
  return {
    type: ADD_TO_PLAYER,
    song,
  };
};

const clearPlayer = () => {
  return {
    type: CLEAR_PLAYER,
  };
};

export const thunkAddToPlayer = song => async dispatch => {
  dispatch(addToPlayer(song));
};

export const thunkClearPlayer = () => async dispatch => {
  dispatch(clearPlayer());
};

const playerReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_PLAYER:
      return [...state, action.song];
    case CLEAR_PLAYER: {
      return [];
    }
    default:
      return state;
  }
};

export default playerReducer;
