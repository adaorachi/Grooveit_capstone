import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { shuffle } from '../../../utils/Helper';
import AlbumCard from '../AlbumCard';
import '../../../styles/image_card.scss';
import '../../../styles/tracklists.scss';
import '../../../styles/related_artists.scss';
import '../../../styles/artist_header.scss';
import Loading from '../Loading';
import RelatedArtist from '../snippet_component/RelatedArtist';
import ArtistTrackList from '../snippet_component/ArtistTrackList';

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
      // console.log(error);
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
        const artistImage = info => ({
          backgroundImage: `url(${info.picture_xl})`,
        });

        artistContent = (
          <div>
            <div className="artist-header">
              <div className="artist-bg" style={artistImage(info)} />
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
                  <div>
                    <ArtistTrackList playlist={playlistArray} trackNo={limit1} />
                  </div>
                </div>
              </div>
              <div className="related-artists">
                <div className="content">
                  <div className="heading">
                    <h3>Related Artists</h3>
                  </div>
                  <div className="related-artist-content">
                    <RelatedArtist relatedArray={relatedArray} />
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
      // console.log(error);
    }

    return (
      <div className="home-content">
        {artistContent}
      </div>
    );
  }
}

ArtistPlaylist.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ArtistPlaylist;
