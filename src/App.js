import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';

import CampMap from './CampMap';
import SearchBox from './SearchBox';
import Api from './Api';

const api = new Api();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { markers: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    api.search(value).then(r => {
      this.setState({
        markers: r.markers
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CampyCamp</h1>
        </header>
        <article className="App-article">
          <section className="App-searchSection">
            <SearchBox
              onSubmit={this.handleSubmit}
            />
          </section>
          <section className="App-mapSection">
            <CampMap
              markers={this.state.markers}
            />
          </section>
        </article>
      </div>
    );
  }
}

export default App;
