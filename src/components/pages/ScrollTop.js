import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
			document.getElementById('search-bar-input').value = '';
			//document.getElementById('searched-data-output').style.display = 'none';
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollTop);
