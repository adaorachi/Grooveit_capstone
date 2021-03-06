/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NavbarLink from './NavbarLinks';
import NavbarDrawer from './NavbarDrawer';
import SearchBar from '../../search/SearchBar';
import { closeDrawer } from '../../../utils/Helper';
import logo from '../../../images/menu.png';
import '../../../styles/navbar.scss';
import '../../../styles/nav_drawer.scss';
import '../../../styles/search_box.scss';
import '../../../styles/toggle_switch.scss';

const Navbar = () => (
  <div className="navbar-wrapper">
    <nav className="navbar navbar-light">
      <div className="navbar-row">
        <ul className="navbar-nav">
          {['Discover', 'New Releases', 'Recommended', 'Charts'].map(text => (
            <NavbarLink link={text} key={text} />
          ))}
        </ul>
      </div>
      <div className="search-area">
        <SearchBar />
      </div>
    </nav>
    <div className="navbar-drawer">
      <div className="navbar-brand">
        <a href="/" className="logo-brand">
          <span className="groove">Groove</span>
          <span className="it">IT</span>
        </a>
        <span className="toggle-icon-close" id="toggle-icon-close" onClick={closeDrawer}>
          <ChevronLeftIcon className="drawer-close" />
          <img src={logo} className="app-logo drawer-open" alt="logo" width="40" />
        </span>
      </div>
      <ul className="navbar-drawer-links">
        {['Home', 'Genres', 'Playlists', 'Artists', 'Albums'].map((text, index) => (
          <NavbarDrawer link={text} index={index} key={text} />
        ))}
      </ul>
    </div>
  </div>
);
export default Navbar;
