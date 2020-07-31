import React from 'react';
import PropTypes from 'prop-types';

const NavbarLinks = props => {
  const { link } = props;
  return (
    <li className="nav-item">
      <a href={`#${link.toLowerCase().split(' ').join('-')}`} className="nav-link text-primary">
        {link}
      </a>
    </li>
  );
};

NavbarLinks.propTypes = {
  link: PropTypes.func.isRequired,
};

export default NavbarLinks;
