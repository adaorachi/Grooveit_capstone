import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { convertSongDuration } from '../../../utils/Helper';

const ArtistTrackList = props => {
  const { playlist, trackNo } = props;

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

  const listArray = playlist.map((list, index) => (
    <div key={list.id} className="track-item" id={list.id}>
      <div className="first-row">
        <span>{parseInt(trackNo, 10) + index + 1}</span>
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
  return (
    <div>
      {listArray}
    </div>
  );
};

ArtistTrackList.propTypes = {
  playlist: PropTypes.func.isRequired,
  trackNo: PropTypes.string.isRequired,
};

export default ArtistTrackList;
