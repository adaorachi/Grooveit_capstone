import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArtistContributors = props => {
  const { contributor } = props;

  let names;
  let images;
  let contribs;

  const contribStyle = index => ({
    zIndex: index + 1,
    left: index * 25,
  });

  if (contributor) {
    names = contributor.map((contrib, index) => (
      <Link to={`/artists/${contrib.id}`} key={contrib.id} className="collaborator-info">
        {contrib.name}
        {(contributor.length === 1 || index === contributor.length - 1) ? '' : ', '}
      </Link>
    ));
    images = contributor.map((contrib, index) => (
      <span key={contrib.id} style={contribStyle(index)}>
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

  return (
    <div>
      {contribs}
    </div>
  );
};

ArtistContributors.propTypes = {
  contributor: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ArtistContributors;
