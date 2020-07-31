import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ScrollTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
      document.getElementById('search-bar-input').value = '';
      // document.getElementById('searched-data-output').style.display = 'none';
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

ScrollTop.propTypes = {
  location: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default withRouter(ScrollTop);
