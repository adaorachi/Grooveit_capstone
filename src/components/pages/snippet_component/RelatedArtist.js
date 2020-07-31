/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shortenWord, musicPlayer } from '../../../utils/Helper';

const RelatedArtist = props => {
  const { relatedArray } = props;

  const relArray = relatedArray.map(list => (
    <Link to={`/artists/${list.id}`} key={list.id} className="related-list">
      <img src={list.picture_xl} alt={list.name} width="80" />
      <span>{shortenWord(list.name, 15)}</span>
    </Link>
  ));

  return (
    <div className="all-tracks" onClick={e => musicPlayer(e, 'track-item')}>
      {relArray}
    </div>
  );
};

RelatedArtist.propTypes = {
  relatedArray: PropTypes.func.isRequired,
};

export default RelatedArtist;
