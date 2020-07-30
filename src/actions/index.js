const filterGenre = 'FILTER_GENRE';
const fetchGenre = 'FETCH_GENRE';
const fetchArtist = 'FETCH_ARTIST';
const fetchAssoc = 'FETCH_ASSOC';
const fetchPlaylist = 'FETCH_PLAYLIST';
const fetchFeatured = 'FETCH_FEATURED';

const FILTER_GENRE = genre => ({
  type: filterGenre,
  genre,
});

const UPDATE_MUSIC = music => ({
  type: 'UPDATE_MUSIC',
  music: {
    title: music.title,
    preview: music.preview,
    artist: music.artist_name,
  },
});

const FETCH_GENRE = genre => ({
  type: fetchGenre,
  genre,
});

const FETCH_ARTIST = artist => ({
  type: fetchArtist,
  artist,
});

const FETCH_ASSOC = assoc => ({
  type: fetchAssoc,
  assoc,
});

const FETCH_PLAYLIST = list => ({
  type: fetchPlaylist,
  list,
});

const FETCH_FEATURED = list => ({
  type: fetchFeatured,
  list,
});

export {
  FILTER_GENRE,
  FETCH_GENRE,
  FETCH_ARTIST,
  FETCH_ASSOC,
  FETCH_PLAYLIST,
  FETCH_FEATURED,
  UPDATE_MUSIC,
  filterGenre,
  fetchGenre,
  fetchArtist,
  fetchAssoc,
  fetchPlaylist,
  fetchFeatured,
};
