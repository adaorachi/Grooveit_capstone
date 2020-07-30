/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link } from 'react-router-dom';
import { FILTER_GENRE, UPDATE_MUSIC } from '../../../actions/index';
import VideoCard from './VideoCard';
import Filter from './Filter';
import filteredGenres from '../../../utils/FilterGenres';
import { clickGenre, musicPlayer } from '../../../utils/Helper';
import NewRelease from './NewRelease';
import TopCharts from './TopCharts';
import Picks from './Picks';
import Loading from '../Loading';
import '../../../styles/custom_scrollbar.scss';
import '../../../styles/image_circular.scss';
import '../../../styles/home_header.scss';

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleFilterChange(e) {
    const { updateGenreFilter } = this.props;
    if (e.target.classList.contains('genre-name')) {
      clickGenre(e.target.id);
      updateGenreFilter(e.target.id);
    }
  }

  render() {
    const musicArtist = filteredGenres(this.props);
    const { musicAssoc, musicFeatured } = this.props;
    let artistData;
    let homeContent;
    let topFirst;
    const topOthers = [];
    if (musicArtist.length > 0 && musicAssoc.length > 0 && musicFeatured.length > 0) {
      musicArtist.forEach(artist => {
        artistData = artist.data;
      });
      const mapArtists = artistData.map(artist => (
        <div key={artist.id} id={artist.id}>
          <Link to={`artists/${artist.id}`} className="image-round-item">
            <span className="image-round-img">
              <img src={artist.picture_medium} alt={artist.name} width="100" />
            </span>
            <span className="image-round-name">{artist.name.toLowerCase()}</span>
          </Link>
        </div>
      ));

      musicFeatured.forEach(list => {
        list.forEach((li, index) => {
          if (index === 0) {
            topFirst = li;
          } else {
            topOthers.push(li);
          }
        });
      });

      homeContent = (
        <div>
          <div className="header-content">
            <div className="first-row flex-props">
              <div className="groovy-content">
                <div className="header-text">
                  <h1>What is new now?</h1>
                  <h3>
                    Music of the day
                  </h3>
                </div>
                <div className="groovy-music" id={topFirst.id} onClick={e => musicPlayer(e, 'groovy-music')}>
                  <p id={`title-${topFirst.id}`}>{topFirst.title}</p>
                  <div className="flex-props">
                    <img id={`image-${topFirst.id}`} src={topFirst.artist.picture_medium} className="groovy-image" alt={topFirst.album.title} width="40" />
                    <p id={`artist-${topFirst.id}`}>{topFirst.artist.name}</p>
                  </div>
                  <audio>
                    <track kind="captions" />
                    <source id={`image-${topFirst.id}`} src={topFirst.preview} type="audio/ogg" />
                    <source src={topFirst.preview} type="audio/mpeg" />
                    Your browser does not support the audio tag.
                  </audio>
                </div>
              </div>
              <div className="play-music-button">
                <PlayCircleFilledIcon id={`play-button-${topFirst.id}`} className="play-music-icon" />
                <PlayCircleFilledIcon id={`pause-button-${topFirst.id}`} className="play-music-icon" />
              </div>
            </div>
            <div className="second-row past-groovy-videos">
              <div className="header-text">
                <h3>Last 3 Music of the day</h3>
              </div>
              <VideoCard musicInfo={topOthers} />
            </div>
          </div>
          <div className="body-section">
            <section className="genre-section section" id="discover">
              <div className="genre-content">
                <div className="heading">
                  <h3>Discover</h3>
                </div>
                <div className="filter-genre slider-container">
                  <Filter filterChanged={this.handleFilterChange} />
                </div>
                <div className="all-genres image-round-container custom-scrollbar">
                  {mapArtists}
                </div>
              </div>
            </section>
            <section className="new-release-section section" id="new-releases">
              <div className="heading">
                <h3>New Releases</h3>
              </div>
              <div className="new-release slider-container">
                <NewRelease assoc={musicAssoc} />
              </div>
            </section>
            <section className="recommended-section section" id="recommended">
              <div className="heading">
                <h3>Groove Picks</h3>
              </div>
              <div className="selections slider-container">
                <Picks assoc={musicAssoc} />
              </div>
            </section>
            <section className="top-chart-section section" id="charts">
              <div className="heading">
                <h3>Charts</h3>
              </div>
              <div className="charts slider-container">
                <TopCharts assoc={musicAssoc} />
              </div>
            </section>
          </div>
        </div>
      );
    } else {
      homeContent = (<Loading />);
    }

    return (
      <div className="home-content">
        {homeContent}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  genreFilter: state.genreFilter,
  musicArtist: state.musicArtist,
  musicAssoc: state.musicAssoc,
  musicFeatured: state.musicFeatured,
  updateMusic: state.updateMusic,
});

const mapDispatchToProps = dispatch => ({
  updateGenreFilter: category => {
    dispatch(FILTER_GENRE(category));
  },
  updateCurMusic: music => {
    dispatch(UPDATE_MUSIC(music));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
