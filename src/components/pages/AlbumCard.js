/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { shortenWord } from '../../utils/Helper';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 3,
};

const AlbumCard = props => {
  const { albArray } = props;
  const albArr = albArray.map(list => (
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
    <Slider {...settings}>
      {albArr}
    </Slider>
  );
};

AlbumCard.propTypes = {
  albArray: PropTypes.func.isRequired,
};

export default AlbumCard;
