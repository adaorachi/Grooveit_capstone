import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import '../../../styles/album_header.scss';
import Loading from '../Loading';
import { musicPlayer } from '../../../utils/Helper';

class MusicTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: null,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const trackId = match.params.track_id;
    this.fetchData(trackId);
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    const curtrackId = match.params.track_id;
    const prevtrackId = prevProps.match.params.track_id;
    if (curtrackId !== prevtrackId) {
      this.fetchData(curtrackId);
    }
  }

  fetchData(trackId) {
    try {
      const artistInfo = axios.get(`https://api.deezer.com/track/${trackId}`);
      artistInfo.then(result => {
        this.setState({
          track: result.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { track } = this.state;
    let trackList;
    try {
      if (track) {
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

        trackList = (
          <div className="main-content">
            <div className="album-page-content">
              <div className="album-header">
                <div className="image-cover track-item" id={track.id} onClick={e => musicPlayer(e, 'track-item')}>
                  <img id={`image-${track.id}`} className="album-img" src={track.album.cover_big} alt={track.title} width="160" />
                  <div className="audio-button play-buttons">
                    <PlayCircleFilledIcon className="play-button" id={`play-button-${track.id}`} />
                    <PauseCircleFilledIcon className="pause-button" id={`pause-button-${track.id}`} />
                  </div>
                </div>
                <div className="title">
                  <h4 className="album-name" id={`title-${track.id}`}>
                    {track.title}
                  </h4>
                  <div id={`artist-${track.id}`} className="collaborators">
                    {feats(track.contributors)}
                  </div>
                </div>
                <div className="audio-file">
                  <audio className="audio" id={`audio-${track.id}`}>
                    <track kind="captions" />
                    <source src={track.preview} type="audio/ogg" />
                    <source id={`audio-prev-${track.id}`} src={track.preview} type="audio/mpeg" />
                  </audio>
                </div>
              </div>
            </div>
            <hr className="horizontal-rule" />
            <div className="featured-in-album">
              <div className="heading">
                <h3>Featured In</h3>
              </div>
              <div className="featured-in-content album-page-content">
                <div className="album-header">
                  <Link to={`/albums/${track.album.id}`}>
                    <div className="image-cover">
                      <img className="album-img" src={track.album.cover_big} alt={track.title} width="160" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        trackList = (<Loading />);
      }
    } catch (error) {
      trackList = (
        <div>
          Opps, We encountered an error. Refresh the page or you come back later!
        </div>
      );
      console.log(error);
    }
    return (
      <div className="home-content">
        {trackList}
      </div>
    );
  }
}

export default MusicTrack;
