import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import {
  convertSongDurationSec,
  shuffle,
} from '../../../utils/Helper';
import '../../../styles/tracklists.scss';
import '../../../styles/album_header.scss';
import '../../../styles/comment_section.scss';
import Loading from '../Loading';
import CommentCard from '../snippet_component/CommentCard';
import ArtistContributors from '../snippet_component/ArtistContributors';
import AlbumDiscography from '../snippet_component/AlbumDiscography';
import AlbumTrackList from '../snippet_component/AlbumTrackList';

class ArtistAlbum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      info: null,
      comments: null,
      tracks: null,
    };

    this.fetchData = this.fetchData.bind(this);
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
      const cors = 'https://stark-taiga-63457.herokuapp.com/';
      const albumInfo = () => axios.get(`${cors}https://api.deezer.com/album/${albumId}`);
      const albumComments = () => axios.get(`${cors}https://api.deezer.com/album/${albumId}/comments`);

      Promise.all([albumInfo(), albumComments()])
        .then(results => {
          this.setState({
            info: results[0].data,
            comments: results[1].data,
          });
          const artistId = results[0].data.artist.id;
          const albumTracks = axios.get(`${cors}https://api.deezer.com/artist/${artistId}/albums`);
          albumTracks.then(response => {
            this.setState({
              tracks: response,
            });
          });
        });
    } catch (error) {
      // console.log(error);
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
                  <ArtistContributors contributor={info.contributors} />
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
            <div className="album-tracks tracks-content">
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
                <div>
                  <AlbumTrackList tracklist={info.tracks.data} albumInfo={info} />
                </div>
              </div>
            </div>
            <div className="discography">
              <div className="header">
                <h3>discography</h3>
              </div>
              <div className="discography-items">
                <AlbumDiscography discography={discographyTracks} />
              </div>
            </div>
            <div className="comment-content">
              <div className="header">
                <h3>Comments</h3>
              </div>
              <div className="content">
                <CommentCard commentData={comments.data} />
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
      // console.log(error);
    }

    return (
      <div className="home-content">
        {albumContent}
      </div>
    );
  }
}

ArtistAlbum.propTypes = {
  match: PropTypes.func.isRequired,
};

export default ArtistAlbum;
