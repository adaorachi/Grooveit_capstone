import React from 'react';
import PropTypes from 'prop-types';
import HomeIcon from '@material-ui/icons/Home';
import HeadsetIcon from '@material-ui/icons/Headset';
import AlbumIcon from '@material-ui/icons/Album';
import MicIcon from '@material-ui/icons/Mic';
import SpeakerGroupIcon from '@material-ui/icons/SpeakerGroup';
import { NavLink } from 'react-router-dom';

const NavbarDrawer = props => {
  const { link, index } = props;
  const listIcons = {
    0: { icon: <HomeIcon />, link: '/' },
    1: { icon: <SpeakerGroupIcon />, link: '/genres' },
    2: { icon: <HeadsetIcon />, link: '/playlists' },
    3: { icon: <MicIcon />, link: '/artists' },
    4: { icon: <AlbumIcon />, link: '/albums' },
  };

  const exactLink = (listIcons[index].link === '/');

  return (
    <li className="nav-list">
      <NavLink exact={exactLink} to={listIcons[index].link} className="nav-item text-primary-dim">
        <div className="nav-link">
          <div className="list-icon">{listIcons[index].icon}</div>
          <div className="list-name">
            {link}
          </div>
        </div>
      </NavLink>
    </li>
  );
};

NavbarDrawer.propTypes = {
  link: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default NavbarDrawer;
