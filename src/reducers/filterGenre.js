import { filterGenre } from '../actions/index';

const filterGenreReducer = (state = 'All', action) => {
  switch (action.type) {
    case filterGenre:
      return action.genre;
    default:
      return state;
  }
};

export default filterGenreReducer;
