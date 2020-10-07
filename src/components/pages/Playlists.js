/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import PublicIcon from '@material-ui/icons/Public';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import '../../styles/image_card.scss';
import '../../styles/tracklists.scss';
import '../../styles/album_header.scss';
import '../../styles/comment_section.scss';
import '../../styles/slider_button.scss';
import {
  convertSongDuration,
  convertSongDurationSec,
} from '../../utils/Helper';
import Loading from './Loading';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Playlists = props => {
  const { musicPlayList } = props;
  let mapPlayList;

  if (musicPlayList && musicPlayList.length > 0) {
    mapPlayList = musicPlayList[0].map(playlist => {
      const listArray = playlist.tracks.data.map((list, index) => (
        <div key={list.id} className="track-item">
          <div className="first-row">
            <span>{index + 1}</span>
            <span className="image">
              <img src={playlist.picture_medium} alt={playlist.title} width="60" />
            </span>
            <div>
              <PlayCircleFilledIcon />
            </div>
            <span className="title">
              <span>
                {list.title}
              </span>
            </span>
          </div>
          <div className="extra-info">
            <span className="artist">
              (Song By
              <Link to={`/artists/${list.artist.id}`}>
                {list.artist.name}
              </Link>
              )
            </span>
            <span className="album">
              (Album -
              {' '}
              <Link to={`/albums/${list.album.id}`}>
                {list.album.title}
              </Link>
              )
            </span>
          </div>
          <div className="second-row">
            <span>
              {convertSongDuration(list.duration)}
            </span>
          </div>
        </div>
      ));

      return (
        <div className="album-page-content main-content" key={playlist.id}>
          <div className="album-header">
            <div className="image-cover">
              <img className="album-img" src={playlist.picture_big} alt={playlist.title} width="160" />
            </div>
            <div className="title">
              <h4 className="album-name">
                {playlist.title}
              </h4>
              <div className="creator collaborators">
                <div className="playlist-info collaborator-info">
                  Playlist created by:
                  {' '}
                  {playlist.creator.name}
                </div>
                <div className="playlist-info description collaborator-info">
                  Description:
                  {' '}
                  {playlist.description}
                </div>
                <div className="playlist-info description collaborator-info">
                  Created on:
                  {' '}
                  {playlist.creation_date}
                </div>
              </div>
            </div>
          </div>
          <div className="other-info">
            <div className="fans">
              <span className="view-list">
                <FavoriteIcon />
                {playlist.fans}
                {' '}
                fans
              </span>
              <span className="view-list">
                <PublicIcon />
                {' '}
                Public
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
                  {playlist.nb_tracks}
                  )
                </h3>
                <h3>
                  {convertSongDurationSec(playlist.duration)}
                </h3>
              </div>
              <div className="track-items">
                {listArray}
              </div>
            </div>
          </div>
        </div>
      );
    });
  } else {
    mapPlayList = (<Loading />);
  }

  return (
    <div className="home-content">
      <div className="playlist-content">
        <Slider {...settings}>
          {mapPlayList}
        </Slider>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  musicPlayList: state.musicPlayList,
});

Playlists.propTypes = {
  musicPlayList: PropTypes.arrayOf(PropTypes.array).isRequired,
};

export default connect(mapStateToProps, null)(Playlists);
