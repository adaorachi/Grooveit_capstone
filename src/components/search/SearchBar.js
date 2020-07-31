/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
    };
  }

  getSearch(e) {
    try {
      const cors = 'https://cors-anywhere.herokuapp.com/';
      const response = axios.get(`${cors}https://api.deezer.com/search/track?q=${e.target.value}`);
      response.then(res1 => {
        const res = res1.data.data;
        if (res) {
          this.setState({
            search: res,
          });
          document.getElementById('searched-data-output').style.display = 'block';
        } else {
          this.setState({
            search: null,
          });
        }
      });
    } catch (error) {
      // console.error(error);
    }
  }

  render() {
    const { search } = this.state;
    let dataSearch;
    if (search) {
      const data = search.slice(0, 5).map(list => (
        <Link to={`/tracks/${list.id}`} className="output-item" key={list.id}>
          {list.title}
        </Link>
      ));
      dataSearch = (
        <div id="searched-data-output" className="searched-data-output">
          {data}
        </div>
      );
    }

    return (
      <div>
        <div className="search-input">
          <input className="search-bar-input" id="search-bar-input" onInput={e => this.getSearch(e)} placeholder="Search..." />
        </div>
        {dataSearch}
      </div>
    );
  }
}

export default SearchBar;
