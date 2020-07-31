import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import RepeatIcon from '@material-ui/icons/Repeat';
import { convertSongDuration } from '../../utils/Helper';
import '../../styles/footer.scss';

const Footer = props => {
  const { musicFeatured } = props;
  let mostTop;
  let footerContent;

  if (musicFeatured.length > 0) {
    musicFeatured.forEach(list => {
      list.forEach((li, index) => {
        if (index === 0) {
          mostTop = li;
        }
      });
    });

    footerContent = (
      <div className="footer-content">
        <div className="player-info">
          <img id="player-img" className="player-img" src={mostTop.album.cover_medium} alt={mostTop.title} width="50" />
          <div className="music-info">
            <span id="player-title">{mostTop.title}</span>
            <span id="player-artist">{mostTop.artist.name}</span>
          </div>
        </div>
        <div className="player-play-buttons">
          <SkipPreviousIcon />
          <PlayArrowIcon id="player-audio" />
          <SkipNextIcon />
        </div>
        <div className="player-bar">
          <span className="time-start">0:00</span>
          <span className="player-progress" />
          <span className="time-end">{convertSongDuration(mostTop.duration)}</span>
        </div>
        <div className="player-repeat">
          <RepeatIcon />
          <VolumeUpIcon />
        </div>
        <audio>
          <track kind="captions" />
          <source src={mostTop.preview} type="audio/ogg" />
          <source src={mostTop.preview} type="audio/mpeg" />
          Your browser does not support the audio tag.
        </audio>
      </div>
    );
  }

  return (
    <div className="footer">
      {footerContent}
    </div>
  );
};

const mapStateToProps = state => ({
  musicFeatured: state.musicFeatured,
});

Footer.propTypes = {
  musicFeatured: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Footer);
