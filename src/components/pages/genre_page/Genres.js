import React from 'react';
import { connect } from 'react-redux';
import '../../../styles/image_circular.scss';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const Genres = props => {
  const { musicGenre } = props;
  let genrePageContent;

  if (musicGenre && musicGenre.length > 0) {
    const mapGenres = musicGenre[0].map(genre => (
      <Link to={`/genres/${genre.id}`} key={genre.name}>
        <div className="image-round-item" id={genre.name}>
          <span className="image-round-img">
            <img src={genre.picture_xl} alt={genre.name} width="30" />
          </span>
          <span className="image-round-name">{genre.name}</span>
        </div>
      </Link>
    ));

    genrePageContent = (
      <div className="main-content">
        <div className="heading">
          <h3>All Genres</h3>
        </div>
        <div className="image-round-container">
          {mapGenres}
        </div>
      </div>
    );
  } else {
    genrePageContent = (<Loading />);
  }

  return (
    <div className="home-content">
      {genrePageContent}
    </div>
  );
};

const mapStateToProps = state => ({
  musicGenre: state.musicGenre,
});

export default connect(mapStateToProps, null)(Genres);
