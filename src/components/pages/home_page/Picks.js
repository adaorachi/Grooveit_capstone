import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { shortenWord } from '../../../utils/Helper';
import '../../../styles/image_card.scss';
import '../../../styles/slider_button.scss';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 3,
};

const Picks = props => {
  const { assoc } = props;
  let picks;
  let mapPicks;
  if (assoc && assoc.length > 0) {
    assoc.forEach(ass => {
      picks = ass[2].data.data;
    });

    mapPicks = picks.map(list => (
      <div key={list.id} className="card">
        <div className="card-content">
          <div className="title">
            <span>
              {shortenWord(list.title, 15)}
            </span>
          </div>
          <div className="card-img">
            <Link to={`/albums/${list.id}`}>
              <img src={list.cover_big} alt={list.title} width="100" />
            </Link>
          </div>
          <div className="info">
            <span>
              {shortenWord(list.title, 15)}
            </span>
            <span>
              By
              {' '}
              <Link to={`/artists/${list.artist.id}`}>
                {shortenWord(list.artist.name, 15)}
              </Link>
            </span>
          </div>
        </div>
      </div>
    ));
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Slider {...settings}>
      {mapPicks}
    </Slider>
  );
};

Picks.propTypes = {
  assoc: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Picks;
