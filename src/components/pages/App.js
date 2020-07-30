import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from '../layouts/nav_bar/Navbar';
import Footer from '../layouts/Footer';
import Home from './home_page/Home';
import Genres from './genre_page/Genres';
import Playlists from './Playlists';
import Artists from './Artists';
import Albums from './Albums';
import ArtistPlayList from './single_component/ArtistPlaylist';
import ArtistAlbum from './single_component/ArtistAlbum';
import ArtistGenre from './single_component/ArtistGenre';
import MusicTrack from './single_component/MusicTrack';
import MusicPlaylist from './single_component/MusicPlaylist';
import ScrollTop from './ScrollTop';
import { navScroll } from '../../utils/Helper';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollTop>
  
          <div className="app-body-container" onScroll={navScroll()}>
            <div className="wrapper-container bg-primary">
              <Navbar onKeyDown={this.handleKeyPress} />
              <main className="main-container">
                <Route exact path="/" component={Home} />
                <Route exact path="/genres" component={Genres} />
                <Route exact path="/playlists" component={Playlists} />
                <Route exact path="/artists" component={Artists} />
                <Route exact path="/albums" component={Albums} />
                <Route path="/artists/:artist_id" component={ArtistPlayList} />
                <Route path="/albums/:album_id" component={ArtistAlbum} />
                <Route path="/genres/:genre_id" component={ArtistGenre} />
                <Route path="/tracks/:track_id" component={MusicTrack} />
                <Route path="/playlists/:playlist_id" component={MusicPlaylist} />
              </main>
              <Footer />
            </div>
          </div>
        </ScrollTop>
      </BrowserRouter>
    );
  }
}

export default App;
