import { fetchGenre } from '../actions/index';

const genreReducer = (state = [], action) => {
  switch (action.type) {
    case fetchGenre:
      return [...state, action.genre];
    default:
      return state;
  }
};

export default genreReducer;
