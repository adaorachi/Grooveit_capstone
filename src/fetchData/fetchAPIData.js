import axios from 'axios';
import {
  FETCH_GENRE,
  FETCH_ARTIST,
  FETCH_ASSOC,
  FETCH_PLAYLIST,
  FETCH_FEATURED,
} from '../actions/index';

const getGenreID = (response, id) => {
  const IDs = [];
  response.data.forEach(obj => {
    IDs.push(obj[id]);
  });
  return IDs;
};

const arr1 = (genre, name, data) => {
  const a = [];
  data.forEach((d, index) => {
    a.push({
      genre: genre[index],
      name: name[index],
      data: d.data.data,
    });
  });
  return a;
};

const arr = data => {
  const a = [];
  data.forEach(d => {
    a.push(d.data);
  });
  return a;
};

const fetchMusicAssoc = () => dispatch => {
  const releases = () => axios.get('https://api.deezer.com/editorial/0/releases');
  const charts = () => axios.get('https://api.deezer.com/editorial/0/charts');
  const selection = () => axios.get('https://api.deezer.com/editorial/0/selection');
  Promise.all([releases(), charts(), selection()])
    .then(results => {
      dispatch(FETCH_ASSOC(results));

      const charts = results[1];
      const allPlaylists = [];
      const topFeatured = [];
      Object.entries(charts.data).filter(ass => ass[0] === 'playlists').forEach(a => {
        const playlistArray = a[1].data;
        return playlistArray.slice(0, 4).forEach(play => {
          allPlaylists.push(play.id);
        });
      });
      Object.entries(charts.data).filter(ass => ass[0] === 'tracks').forEach(a => {
        const topFeature = a[1].data;
        return topFeature.slice(0, 4).forEach(play => {
          topFeatured.push(play.id);
        });
      });

      const promiseArray = allPlaylists.map(id => axios.get(`https://api.deezer.com/playlist/${id}`));
      Promise.all(promiseArray)
        .then(res => {
          dispatch(FETCH_PLAYLIST(arr(res)));
        })
        .catch(error => {
          throw error;
        });

      const promiseArray2 = topFeatured.map(id => axios.get(`https://api.deezer.com/track/${id}`));
      Promise.all(promiseArray2)
        .then(res => {
          dispatch(FETCH_FEATURED(arr(res)));
        })
        .catch(error => {
          throw error;
        });
    });
};

const fetchMusicGenre = () => dispatch => axios({
  method: 'GET',
  url: 'https://api.deezer.com/genre',
  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  // },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    withCredentials: true,
    mode: 'no-cors',
  },
})
  .then(response => {
    dispatch(FETCH_GENRE(response.data.data));
    const allGenreID = getGenreID(response.data, 'id');
    const allGenreName = getGenreID(response.data, 'name');
    const promiseArray = allGenreID.map(id => axios.get(`https://api.deezer.com/genre/${id}/artists`));

    Promise.all(promiseArray)
      .then(res => {
        const aa = arr1(allGenreID, allGenreName, res.slice(0, allGenreID.length));
        dispatch(FETCH_ARTIST(aa));
      })
      .catch(error => {
        throw error;
      });
  })
  .catch(error => {
    throw error;
  });

export { fetchMusicGenre, fetchMusicAssoc };
