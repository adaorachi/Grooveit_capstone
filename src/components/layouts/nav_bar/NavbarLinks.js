import React from 'react';

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

export default NavbarLinks;
