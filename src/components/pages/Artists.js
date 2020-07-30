import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../styles/image_circular.scss';
import '../../styles/topography.scss';
import Loading from './Loading';

const Artists = props => {
  const { musicArtist } = props;
  let mapArtists;
  const artistData = [];
  const genreName = [];

  if (musicArtist && musicArtist.length > 0) {
    musicArtist.forEach(artist => {
      artist.forEach(art => {
        artistData.push(art.data);
        genreName.push(art.name);
      });
    });
    // console.log(artistData);
    const mapp = artist => (
      artist.map(a => (
        <div key={a.id} id={a.id}>
          <Link to={`artists/${a.id}`} className="image-round-item">
            <span className="image-round-img">
              <img src={a.picture_medium} alt={a.name} width="100" />
            </span>
            <span className="image-round-name">{a.name}</span>
          </Link>
        </div>
      ))
    );

    mapArtists = (
      <div className="main-content">
        { artistData.map((artist, indexes) => (
          <div key={genreName[indexes]}>
            <div className="heading">
              <h3 className="header-popped">{genreName[indexes]}</h3>
            </div>
            <div className="image-round-container">
              {mapp(artist)}
            </div>
          </div>
        )) }
        ;
      </div>
    );
  } else {
    mapArtists = (<Loading />);
  }
  return (
    <div className="home-content">
      {mapArtists}
    </div>
  );
};

const mapStateToProps = state => ({
  musicArtist: state.musicArtist,
});

export default connect(mapStateToProps, null)(Artists);
