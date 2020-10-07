/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import { convertSongDuration, musicPlayer } from '../../../utils/Helper';

const AlbumTrackList = props => {
  const { tracklist, albumInfo } = props;

  const listArray = tracklist.map((list, index) => (
    <div key={list.id} className="track-item" id={list.id}>
      <div className="first-row">
        <span>{index + 1}</span>
        <span className="image">
          <img id={`image-${list.id}`} src={albumInfo.cover_medium} alt={list.title} width="60" />
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
  return (
    <div className="track-items" onClick={e => musicPlayer(e, 'track-item')}>
      {listArray}
    </div>
  );
};

AlbumTrackList.propTypes = {
  tracklist: PropTypes.func.isRequired,
  albumInfo: PropTypes.func.isRequired,
};

export default AlbumTrackList;
