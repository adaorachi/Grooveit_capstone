/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: null,
      display: null,
      searchValue: null,
    };
    this.getSearch = this.getSearch.bind(this);
    this.removeAutoComplete = this.removeAutoComplete.bind(this);
  }

  getSearch(e) {
    try {
      const response = axios.get(`https://api.deezer.com/search/track?q=${e.target.value}`);
      response.then(res1 => {
        const res = res1.data.data;
        if (res) {
          this.setState({
            search: res,
            searchValue: e.target,
            display: 'block',
          });
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

  removeAutoComplete() {
    this.setState({ display: 'none', searchValue: '' });
  }

  render() {
    const { search } = this.state;
    const { display } = this.state;
    const { searchValue } = this.state;
    let dataSearch;
    if (search) {
      const data = search.slice(0, 5).map(list => (
        <Link to={`/tracks/${list.id}`} className="output-item" key={list.id}>
          {list.title}
        </Link>
      ));
      dataSearch = (
        <div
          id="searched-data-output"
          className="searched-data-output"
          onClick={() => this.removeAutoComplete()}
          style={{ display }}
        >
          {data}
        </div>
      );
    }

    return (
      <div>
        <div className="search-input">
          <input
            className="search-bar-input"
            id="search-bar-input"
            autoComplete="off"
            onInput={e => this.getSearch(e)}
            placeholder="Search..."
            value={searchValue}
          />
        </div>
        {dataSearch}
      </div>
    );
  }
}

export default SearchBar;
