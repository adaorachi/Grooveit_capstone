/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shortenWord } from '../../../utils/Helper';
import '../../../styles/image_card.scss';

const mapchartComp = (array, key) => {
  let image;
  let artist;
  let title;
  const mapArray = array.map(list => {
    if (key === 'albums') {
      image = list.cover_big;
      artist = (
        <span>
          By
          {' '}
          <Link to={`/artists/${list.artist.id}`}>
            {shortenWord(list.artist.name, 10)}
          </Link>
        </span>
      );
      title = list.title;
    } else if (key === 'artists') {
      image = list.picture_big;
      artist = (
        <span>
          <Link to={`/artists/${list.name.id}`}>
            {shortenWord(list.name, 10)}
          </Link>
        </span>
      );
      title = '';
    } else if (key === 'playlists') {
      image = list.picture_big;
      title = (
        <span>
          <Link to={`/playlists/${list.id}`}>
            {list.title}
          </Link>
        </span>
      );
      artist = '';
    } else if (key === 'tracks') {
      image = list.album.cover_big;
      title = list.title;
      artist = (
        <span>
          By
          {' '}
          <Link to={`/artists/${list.artist.id}`}>
            {shortenWord(list.artist.name, 10)}
          </Link>
        </span>
      );
    }
    return (
      <div key={list.id} className="card">
        <div className="card-content">
          <div className="card-img">
            <Link to={`/${key}/${list.id}`}>
              <img src={image} alt={list.title} width="100" />
            </Link>
          </div>
          <div className="info">
            <span>
              {shortenWord(title, 15)}
            </span>
            {artist}
          </div>
        </div>
      </div>
    );
  });

  return mapArray;
};

const TopCharts = props => {
  const { assoc } = props;
  let mapCharts;
  let charts;
  const allVals = [];
  const allKeys = [];
  if (assoc && assoc.length > 0) {
    assoc.forEach(ass => {
      charts = ass[1].data;
    });
    Object.entries(charts).forEach(ass => {
      const key = ass[0];
      const value = ass[1].data;
      allVals.push(value);
      allKeys.push(key);
    });

    mapCharts = allVals.map((aa, index) => {
      if (aa.length > 0 && allVals[index] !== 'podcasts') {
        return (
          <div key={allKeys[index]} className="chart-cat">
            <div className="heading">
              <h3>
                Top
                {' '}
                {allKeys[index]}
              </h3>
            </div>
            <div className="content">
              {mapchartComp(aa, allKeys[index])}
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div>
      {mapCharts}
    </div>
  );
};

TopCharts.propTypes = {
  assoc: PropTypes.func.isRequired,
};

export default TopCharts;
