import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import {
  convertSongDuration,
  convertSongDurationSec,
  convertUnixTime,
  shortenWord,
  shuffle,
  musicPlayer,
} from '../../../utils/Helper';
import '../../../styles/tracklists.scss';
import '../../../styles/album_header.scss';
import '../../../styles/comment_section.scss';
import Loading from '../Loading';

class ArtistAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: null,
      comments: null,
      tracks: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const albumId = match.params.album_id;
    this.fetchData(albumId);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const currAlbumId = match.params.album_id;
    const prevAlbumId = prevProps.match.params.album_id;
    if (prevAlbumId !== currAlbumId) {
      this.fetchData(currAlbumId);
    }
  }

  fetchData(albumId) {
    try {
      const albumInfo = () => axios.get(`https://api.deezer.com/album/${albumId}`);
      const albumComments = () => axios.get(`https://api.deezer.com/album/${albumId}/comments`);

      Promise.all([albumInfo(), albumComments()])
        .then(results => {
          this.setState({
            info: results[0].data,
            comments: results[1].data,
          });
          const artistId = results[0].data.artist.id;
          const albumTracks = axios.get(`https://api.deezer.com/artist/${artistId}/albums`);
          albumTracks.then(response => {
            this.setState({
              tracks: response,
            });
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {
      info,
      comments,
      tracks,
    } = this.state;

    let albumContent;
    try {
      if (info && comments && tracks) {
        let discographyTracks = shuffle(tracks.data.data).slice(0, 4);
        discographyTracks = discographyTracks.filter(id => id !== info.id);

        const feats = contributor => {
          let names;
          let images;
          let contribs;
          if (contributor) {
            names = contributor.map((contrib, index) => (
              <Link to={`/artists/${contrib.id}`} key={contrib.id} className="collaborator-info">
                {contrib.name}
                {(contributor.length === 0 || index === contributor.length - 1) ? '' : ', '}
              </Link>
            ));
            images = contributor.map((contrib, index) => (
              <span key={contrib.id} style={{ zIndex: index + 1, left: index * 25 }}>
                <img className="contrib-img" src={contrib.picture_medium} alt={contrib.name} width="40" />
              </span>
            ));

            contribs = (
              <div className="collab-info">
                <div className="collab-info-images">
                  {images}
                </div>
                <div className="collab-info-names">
                  {names}
                </div>
              </div>
            );
          }
          return contribs;
        };

        const genres = genre => {
          let gen;
          if (genre) {
            if (genre.data.length > 0) {
              gen = genre.data.map((g, index) => (
                <Link to={`/genres/${g.id}`} key={g.id} className="genre-info">
                  {`${g.name.toLowerCase()}${(genre.data.length <= 1 || index === (genre.data.length - 1)) ? '' : ','}`}
                </Link>
              ));
            } else {
              gen = 'No';
            }
          }
          return gen;
        };

        const listArray = info.tracks.data.map((list, index) => (
          <div key={list.id} className="track-item" id={list.id}>
            <div className="first-row">
              <span>{index + 1}</span>
              <span className="image">
                <img id={`image-${list.id}`} src={info.cover_medium} alt={list.title} width="60" />
              </span>
              <div className="audio-button">
                <PlayCircleFilledIcon className="play-button" id={`play-button-${list.id}`} />
                <PauseCircleFilledIcon className="pause-button" id={`pause-button-${list.id}`} />
              </div>
              <span className="title">
                <span id={`title-${list.id}`}>
                  {list.title}
                </span>
                <span id={`artist-${list.id}`} hidden>{}</span>
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

        const discography = discographyTracks.map(list => (
          <Link to={`/albums/${list.id}`} key={list.id} className="card">
            <div className="card-content">
              <div className="card-img">
                <img src={list.cover_big} alt={list.title} width="100" />
              </div>
              <div className="info">
                <span>{shortenWord(list.title, 15)}</span>
                <span>{list.release_date}</span>
              </div>
            </div>
          </Link>
        ));

        let commentArray;
        if (comments.data.length > 1) {
          commentArray = comments.data.map(list => (
            <div key={list.id} className="comment-card">
              <div className="author-img">
                <img src={list.author.picture_medium} alt={list.author.name} width="40"/>
              </div>
              <div className="text">
                <p>{list.text}</p>
                <data>{convertUnixTime(list.date)}</data>
              </div>
            </div>
          ));
        } else {
          commentArray = (
            <p>
              No Comment
            </p>
          );
        }

        albumContent = (
          <div className="album-page-content">
            <div className="album-header">
              <div className="image-cover">
                <img className="album-img" src={info.cover_big} alt={info.title} width="160" />
              </div>
              <div className="title">
                <h4 className="album-name">
                  {info.title}
                </h4>
                <div className="collaborators">
                  {feats(info.contributors)}
                </div>
              </div>
            </div>
            <div className="other-info">
              <div className="fans">
                <span className="view-list">
                  <FavoriteIcon />
                  {info.fans}
                  {' '}
                  fans
                </span>
                <span className="view-list">
                  <SpeakerGroupIcon />
                  {genres(info.genres)}
                  &nbsp;
                  genres
                </span>
              </div>
            </div>
            <div className="tracks-content">
              <div className="contents">
                <div className="heading">
                  <h3>
                    All Tracks
                    {' '}
                    (
                    {info.nb_tracks}
                    )
                  </h3>
                  <h3>
                    {convertSongDurationSec(info.duration)}
                  </h3>
                </div>
                <div className="track-items" onClick={e => musicPlayer(e, 'track-item')}>
                  {listArray}
                </div>
              </div>
            </div>
            <div className="discography">
              <div className="header">
                <h3>discography</h3>
              </div>
              <div className="artist-albums-content content">
                {discography}
              </div>
            </div>
            <div className="comment-content">
              <div className="header">
                <h3>Comments</h3>
              </div>
              <div className="content">
                {commentArray}
              </div>
            </div>
          </div>
        );
      } else {
        albumContent = (<Loading />);
      }
    } catch (error) {
      albumContent = (
        <div>
          Opps, We encountered an error. Refresh the page or you come back later!
        </div>
      );
      console.log(error);
    }

    return (
      <div className="home-content">
        {albumContent}
      </div>
    );
  }
}

export default ArtistAlbum;
