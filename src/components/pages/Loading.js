import React from 'react';
import '../../styles/loader.scss';
import loader from '../../images/loader.gif';

const Loading = () => (
  <div className="loader">
    <img src={loader} alt="loader" />
  </div>
);

export default Loading;
