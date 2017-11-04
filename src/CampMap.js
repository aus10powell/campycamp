import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const API_KEY = 'AIzaSyCo9b_gwCyRnjm3kCoaLlOBAB0S52SAPkQ';

class CampMap extends Component {

  constructor(props) {
    super(props);
    this.googleMapUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`
    this.defaultCenter = { 
      lat: 37.98,
      lng: -120.84
    };
    this.defaultZoom = 8;
  }

  render() {
    const markers = this.props.markers.map((m,i) => {
      return (
        <Marker 
          key={i}
          position={{lat: m.lat, lng: m.lng}}
        />
      );
    });
    const Map = withScriptjs(withGoogleMap(() => {
      return (
        <GoogleMap
          defaultZoom={this.defaultZoom}
          defaultCenter={this.defaultCenter}
        >
          { markers }
        </GoogleMap>
      );
    }));

    return (
      <Map 
        googleMapURL={this.googleMapUrl}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      >
      </Map>
    );
  }
}

export default CampMap;
