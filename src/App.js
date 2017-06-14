import React, { Component } from 'react';
import logo from './logo.svg';
import MapContainer, {Container} from './containers/MapContainer.js';
import './App.css';
import Map from 'google-maps-react';
import InfoWindow from 'google-maps-react';
import Marker from 'google-maps-react';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React with Maps</h2>
        </div>
          <Map google={window.google} zoom={100}>

                <Marker onClick={this.onMarkerClick}
                name={"San Francisco"} />

                <InfoWindow onClose={this.onInfoWindowClose}>
              </InfoWindow>
          </Map>
      </div>
    );
  }
}

export default App;
