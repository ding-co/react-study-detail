// Action Types
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// Action Creators
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// Initial State
const initialState = {
  number: 0,
};

// Reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1,
      };
    case DECREASE:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

export default counter;
