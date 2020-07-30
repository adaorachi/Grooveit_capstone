import { fetchPlaylist } from '../actions/index';

const playlistReducer = (state = [], action) => {
  switch (action.type) {
    case fetchPlaylist:
      return [...state, action.list];
    default:
      return state;
  }
};

export default playlistReducer;
