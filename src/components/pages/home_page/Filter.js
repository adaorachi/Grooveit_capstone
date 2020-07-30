/* eslint-disable react/prop-types */
import React from 'react';
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

const activeClass = index => {
  return index === 0 ? 'active' : '';
};

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
  } else {
    console.log('mem');
  }

  return (
    <div onClick={e => filterChanged(e)}>
      <Slider {...settings} >
        {mapGenres}
      </Slider>
    </div>

  );
};

const mapStateToProps = state => ({
  musicGenre: state.musicGenre,
});

export default connect(mapStateToProps, null)(Filter);