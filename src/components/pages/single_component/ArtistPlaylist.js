/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import {
  convertSongDuration,
  shuffle, shortenWord,
  updateDefaultPlayer,
  musicPlayer,
} from '../../../utils/Helper';
import AlbumCard from '../AlbumCard';
import '../../../styles/image_card.scss';
import '../../../styles/tracklists.scss';
import '../../../styles/related_artists.scss';
import '../../../styles/artist_header.scss';
import Loading from '../Loading';

class ArtistPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: null,
      info: null,
      albums: null,
      related: null,
      limit: 'limit=5&index=0',
      limit1: '0',
    };

    this.audioPlay = this.audioPlay.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.nextTrack = this.nextTrack.bind(this);
    this.prevTrack = this.prevTrack.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const artistId = match.params.artist_id;
    this.fetchData(artistId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    const artistId = match.params.artist_id;
    const artistId2 = prevProps.match.params.artist_id;
    const prevLimit = prevState.limit;
    const { limit } = this.state;
    if (prevLimit !== limit) {
      this.fetchData(artistId);
    } else if (artistId !== artistId2) {
      this.fetchData(artistId);
    }
  }

  fetchData(artistId) {
    const { limit } = this.state;
    try {
      const artistInfo = () => axios.get(`https://api.deezer.com/artist/${artistId}`);
      const artistPlayList = () => axios.get(`https://api.deezer.com/artist/${artistId}/top?${limit}`);
      const artistAlbums = () => axios.get(`https://api.deezer.com/artist/${artistId}/albums`);
      const artistRelated = () => axios.get(`https://api.deezer.com/artist/${artistId}/related`);

      Promise.all([artistInfo(), artistPlayList(), artistAlbums(), artistRelated()])
        .then(results => {
          this.setState({
            info: results[0].data,
            playlist: results[1].data,
            albums: results[2].data,
            related: results[3].data,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  nextTrack(e, total) {
    const mod = total % 5;
    const { limit1 } = this.state;
    const li = parseInt(limit1, 10);
    this.setState({
      limit: `limit=${5}&index=${li + 5}`,
      limit1: `${li + 5}`,
    });

    if ((li + 5 + mod) > total) {
      this.setState({
        limit: `limit=${5}&index=0`,
        limit1: '0',
      });
    }
  }

  prevTrack(e, total) {
    const floor = Math.floor(total / 5) * 5;
    const { limit1 } = this.state;
    const li = parseInt(limit1, 10);
    this.setState({
      limit: `limit=${5}&index=${li - 5}`,
      limit1: `${li - 5}`,
    });
    if (li <= 0) {
      this.setState({
        limit: `limit=${5}&index=${floor}`,
        limit1: `${floor}`,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  audioPlay(e) {
    function mem(id) {
      const array = document.querySelectorAll('.track-item');
      Array.from(array).forEach(item => {
        const itemId = item.id;
        if (itemId !== id) {
          const audio = document.getElementById(`audio-${itemId}`);
          audio.pause();
          document.getElementById(`play-button-${itemId}`).style.display = 'block';
          document.getElementById(`pause-button-${itemId}`).style.display = 'none';
        }
      });
    }

    if (e.target.classList.contains('track-item')) {
      const { id } = e.target;
      const audio = document.getElementById(`audio-${id}`);
      const artists = document.getElementById(`contribs-${id}`).innerText;
      if (audio.paused) {
        audio.play();
        const bb = {};
        const aa = this.state.playlist.data.filter(listId => listId.id === parseInt(id, 10));
        bb.playerImg = aa['0'].album.cover_medium;
        bb.playerTitle = aa['0'].title;
        bb.playerArtist = artists;
        bb.playerAudio = aa['0'].preview;
        // console.log(aa)
        updateDefaultPlayer(bb);

        document.getElementById(`play-button-${id}`).style.display = 'none';
        document.getElementById(`pause-button-${id}`).style.display = 'block';
        mem(id);
      } else {
        audio.pause();
        document.getElementById(`play-button-${id}`).style.display = 'block';
        document.getElementById(`pause-button-${id}`).style.display = 'none';
      }
    }
  }

  render() {
    const {
      info,
      playlist,
      albums,
      related,
    } = this.state;

    let artistContent;
    try {
      if (info && playlist && albums && related) {
        const playlistArray = playlist.data;
        const relatedArray = shuffle(related.data).slice(0, 6);
        const albumsArray = albums.data;
        const { limit1 } = this.state;

        const feats = contributor => {
          let contribs;
          if (contributor) {
            contribs = contributor.map((contrib, index) => (
              <span key={contrib.id}>
                <Link to={`/artists/${contrib.id}`}>{contrib.name}</Link>
                {(contributor.length <= 1 || index === (contributor.length - 1)) ? '' : ' & '}
              </span>
            ));
          }
          return contribs;
        };

        const listArray = playlistArray.map((list, index) => (
          <div key={list.id} className="track-item" id={list.id}>
            <div className="first-row">
              <span>{parseInt(limit1, 10) + index + 1}</span>
              <span className="image">
                <img id={`image-${list.id}`} src={list.album.cover_big} alt={list.album.title} width="60" />
              </span>
              <div className="audio-button">
                <PlayCircleFilledIcon className="play-button" id={`play-button-${list.id}`} />
                <PauseCircleFilledIcon className="pause-button" id={`pause-button-${list.id}`} />
              </div>
              <span className="title">
                <span id={`title-${list.id}`}>
                  {list.title}
                  {' '}
                  (
                  <span id={`artist-${list.id}`} className="contribs">
                    {feats(list.contributors)}
                  </span>
                  )
                </span>
              </span>
            </div>
            <div className="second-row">
              <span>
                {convertSongDuration(list.duration)}
              </span>
            </div>
            <div className="audio-file">
              <audio className="audio" id={`audio-${list.id}`}>
                <track kind="captions" />
                <source src={list.preview} type="audio/ogg" />
                <source id={`audio-prev-${list.id}`} src={list.preview} type="audio/mpeg" />
              </audio>
            </div>
          </div>
        ));

        const relArray = relatedArray.map(list => (
          <Link to={`/artists/${list.id}`} key={list.id} className="related-list">
            <img src={list.picture_xl} alt={list.name} width="80" />
            <span>{shortenWord(list.name, 15)}</span>
          </Link>
        ));

        artistContent = (
          <div>
            <div className="artist-header">
              <div className="artist-bg" style={{ backgroundImage: `url(${info.picture_xl})` }} />
              <div className="artist-info">
                <img src={info.picture_xl} alt={info.name} className="artist-img" width="200" />
                <div className="sub-info">
                  <span className="artist-name">{info.name}</span>
                  <div className="fans">
                    <span className="view-list">
                      {info.nb_album}
                      {' '}
                      Albums
                    </span>
                    <span className="view-list">
                      {info.nb_fan}
                      {' '}
                      Fans
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-content">
              <div className="tracks-content">
                <div className="content">
                  <div className="heading">
                    <h3>
                      All Tracks
                      {' '}
                      (
                      {playlist.total}
                      )
                    </h3>
                    <div className="navigate-buttons">
                      <button type="button" className="prev-but button" onClick={e => this.prevTrack(e, playlist.total)}>
                        <NavigateBeforeIcon />
                      </button>
                      <button type="button" className="next-but button" onClick={e => this.nextTrack(e, playlist.total)}>
                        <NavigateNextIcon />
                      </button>
                    </div>
                  </div>
                  <div className="numbering">
                    <h4>
                      {(limit1 / 5) + 1}
                      {' '}
                      /
                      {' '}
                      {(Math.floor(playlist.total / 5) + 1)}
                    </h4>
                  </div>
                  <div className="all-tracks" onClick={e => musicPlayer(e, 'track-item')}>
                    {listArray}
                  </div>
                </div>
              </div>
              <div className="related-artists">
                <div className="content">
                  <div className="heading">
                    <h3>Related Artists</h3>
                  </div>
                  <div className="related-artist-content">
                    {relArray}
                  </div>
                </div>
              </div>
            </div>
            <div className="artist-albums">
              <div className="content">
                <div className="heading">
                  <h3>Albums</h3>
                </div>
                <div className="artist-albums-content">
                  <AlbumCard albArray={albumsArray} />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        artistContent = (<Loading />);
      }
    } catch (error) {
      artistContent = (
        <div>
          Opps, We encountered an error. Refresh the page or you come back later!
        </div>
      );
      console.log(error);
    }

    return (
      <div className="home-content">
        {artistContent}
      </div>
    );
  }
}

export default ArtistPlaylist;
