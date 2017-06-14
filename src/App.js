import React, { Component } from 'react';
import logo from './logo.svg';
//import MapContainer, {Container} from './containers/MapContainer.js';
import './App.css';
import Map, {Marker,InfoWindow} from 'google-maps-react';
import ParksModel from './models/Parks';
import $ from 'jquery-ajax';


class App extends Component {
  constructor(){
    super()
    this.state = {
      places : [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
  }

  componentDidMount() {
    ParksModel.all().then( (res) => {
      this.setState ({
        places: res
      })
      console.log(res)
    })
  }
  onMarkerClick(props,marker,e) {
    console.log("clicked ",props);
    // this.setState({
    //   showingInfoWindow: true,
    //   selectedPlace: props,
    //   activeMarker: marker
    //   })
  }
  onClose(infowindow) {
    console.log("Close info window");


  }
  render() {
    return (
      <div className="App">

          <Map google={window.google} className={'map'} zoom={4} style={{width: '100%', height: '100%', position: 'relative'}}>

            {this.state.places.map((park) => <Marker onClick={this.onMarkerClick} name={park.name}
                    position={{lat: park.lat, lng: park.lng}} />)}


            <InfoWindow marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow} onOpen={this.windowHasOpened}
              onClose={this.windowHasClosed}
              visible={this.state.showingInfoWindow}>
            </InfoWindow>
          </Map>
      </div>
    );
  }
}

export default App;

// {this.state.places.map((park) => <Marker name={park.name}
//         position={{lat: park.lat, lng: park.lng}} link={park.link} image={park.image} id={park._id} />)}
