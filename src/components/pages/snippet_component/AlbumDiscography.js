import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shortenWord } from '../../../utils/Helper';

const AlbumDiscography = props => {
  const { discography } = props;

  const discographyMapped = discography.map(list => (
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
  return (
    <div className="artist-albums-content content">
      {discographyMapped}
    </div>
  );
};

AlbumDiscography.propTypes = {
  discography: PropTypes.func.isRequired,
};

export default AlbumDiscography;
