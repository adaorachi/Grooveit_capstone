import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { shortenWord } from '../../../utils/Helper';
import '../../../styles/image_card.scss';
import Loading from '../Loading';

class ArtistGenre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      radio: null,
    };

    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const genreId = match.params.genre_id;
    this.fetchData(genreId);
  }

  fetchData(genreId) {
    try {
      const cors = 'https://stark-taiga-63457.herokuapp.com/';
      const genreName = () => axios.get(`${cors}https://api.deezer.com/genre/${genreId}`);
      const genreRadio = () => axios.get(`${cors}https://api.deezer.com/genre/${genreId}/radios`);

      Promise.all([genreName(), genreRadio()])
        .then(results => {
          this.setState({
            name: results[0].data,
            radio: results[1].data,
          });
        });
    } catch (error) {
      // console.log(error);
    }
  }

  render() {
    const {
      name,
      radio,
    } = this.state;

    let radioMap;
    try {
      if (name && radio) {
        const { name } = this.state;
        const genreRadio = radio.data.map(list => (
          <div key={list.id} className="card image-card-flexed">
            <div className="card-content">
              <div className="card-img">
                <Link to={`/radio/${list.id}`}>
                  <img src={list.picture_big} alt={list.title} width="100" />
                </Link>
              </div>
              <div className="info">
                <span>
                  {shortenWord(list.title, 15)}
                </span>
              </div>
            </div>
          </div>
        ));

        radioMap = (
          <div className="main-content">
            <div className="heading">
              <h3>
                Groovy Radio -
                {' '}
                {name.name}
                {' '}
                genre
              </h3>
            </div>
            <div className="image-card-content-flexed">
              {genreRadio}
            </div>
          </div>
        );
      } else {
        radioMap = (<Loading />);
      }
    } catch (error) {
      radioMap = (
        <div>
          Opps, We encountered an error. Refresh the page or you come back later!
        </div>
      );
      // console.log(error);
    }

    return (
      <div className="home-content">
        {radioMap}
      </div>
    );
  }
}

ArtistGenre.propTypes = {
  match: PropTypes.func.isRequired,
};

export default ArtistGenre;
