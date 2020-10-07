import { combineReducers } from 'redux';
import filterGenreReducer from './filterGenre';
import genreReducer from './musicGenre';
import artistReducer from './musicArtist';
import assocReducer from './musicAssoc';
import playlistReducer from './musicPlaylist';
import featuredReducer from './musicFeatured';
import updateMusicReducer from './updateCurrentSong';

const rootReducer = combineReducers({
  genreFilter: filterGenreReducer,
  musicGenre: genreReducer,
  musicArtist: artistReducer,
  musicAssoc: assocReducer,
  musicPlayList: playlistReducer,
  musicFeatured: featuredReducer,
  updateMusic: updateMusicReducer,
});

export default rootReducer;
