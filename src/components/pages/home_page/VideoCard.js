/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { convertSongDuration, musicPlayer } from '../../../utils/Helper';
import '../../../styles/card_small.scss';

const VideoCard = props => {
  const { musicInfo } = props;
  const vid = musicInfo.map(list => (
    <div className="card-small" key={list.id} id={list.id}>
      <div className="right-row">
        <img id={`image-${list.id}`} src={list.artist.picture_medium} className="groovy-image" alt={list.album.title} width="40" />
        <span id={`title-${list.id}`}>{list.title}</span>
        <span id={`artist-${list.id}`} hidden>{list.artist.name}</span>
      </div>
      <div className="left-row">
        <span className="play-time">{convertSongDuration(list.duration)}</span>
      &nbsp;
        <span className="audio-button play-icon">
          <PlayCircleFilledIcon className="play-button" id={`play-button-${list.id}`} />
          <PauseCircleFilledIcon className="pause-button" id={`pause-button-${list.id}`} />
        </span>
      </div>
      <audio id={`audio-${list.id}`}>
        <track kind="captions" />
        <source src={list.preview} type="audio/ogg" />
        <source id={`audio-prev-${list.id}`} src={list.preview} type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  ));

  return (
    <div className="content card-snip" onClick={e => musicPlayer(e, 'card-small')}>
      {vid}
    </div>
  );
};

VideoCard.propTypes = {
  musicInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideoCard;
