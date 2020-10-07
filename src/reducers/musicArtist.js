import { fetchArtist } from '../actions/index';

const artistReducer = (state = [], action) => {
  switch (action.type) {
    case fetchArtist:
      return [...state, action.artist];
    default:
      return state;
  }
};

export default artistReducer;
