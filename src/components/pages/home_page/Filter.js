/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { connect } from 'react-redux';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 3,
};

const activeClass = index => (index === 0 ? 'active' : '');

const Filter = props => {
  const { musicGenre, filterChanged } = props;
  let mapGenres;
  if (musicGenre && musicGenre.length > 0) {
    const musicGenres = musicGenre[0];
    mapGenres = musicGenres.map((genre, index) => (
      <div key={genre.name} className={`genre-name ${activeClass(index)}`} id={genre.name}>
        <span>
          <img src={genre.picture_small} alt={genre.name} width="30" />
        </span>
        <span>{genre.name}</span>
      </div>
    ));
  }

  return (
    <div onClick={e => filterChanged(e)}>
      <Slider {...settings}>
        {mapGenres}
      </Slider>
    </div>
  );
};

const mapStateToProps = state => ({
  musicGenre: state.musicGenre,
});

Filter.propTypes = {
  filterChanged: PropTypes.func.isRequired,
  musicGenre: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(Filter);
