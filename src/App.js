import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

var parseString = require('xml2js').parseString;
class Api {
  search() {
    return fetch(`./test.xml`)
      .then(r => r.text())
      .then(r => {
        let p = new Promise((resolve, reject) => {
          parseString(r, {trim: true}, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        return p;
      });
  }
}

const api = new Api();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      result: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    event.preventDefault();
    api.search().then(r => {
      console.log(r);
      this.setState({
        result: r.resultset.result
      });
    });
  }

  renderMarkers() {
    return this.state.result.map((r, i) => {
      let lat = Number(r.$.latitude);
      let lng = Number(r.$.longitude);
      return <Marker key={i} position={{ lat, lng }} />
    })
  }

  render() {

    const Map = withScriptjs(withGoogleMap((props) => {
      return (
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: 37.98, lng: -120.84}}
        >
          { this.renderMarkers() }
        </GoogleMap>
      );
    }));

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to CampyCamp</h1>
        </header>
        <article>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="submit"/>
          </form>
          <Map 
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </article>
      </div>
    );
  }
}

export default App;
