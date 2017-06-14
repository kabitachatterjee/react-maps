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
      windowPosition: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }
  toggleInfoWindow = (loc) => {
    // clicking 'x' in the info window will pass null, so if we detect that, reset the position in state
    if (loc === null) {
      this.setState({ windowPosition: null })
      return
    }
    // otherwise get coords of clicked marker and set to state
    // let markerLoc = { lat: loc.latLng.lat(), lng: loc.latLng.lng() }
    // this.setState({ windowPosition: markerLoc })
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
    let markerLoc = { lat: props.mapCenter.lat, lng: props.mapCenter.lng }
    console.log(markerLoc);
    this.setState({
      windowPosition: markerLoc,
      showingInfoWindow: true,
      selectedPlace: props,
      activeMarker: marker
      })
    }
  onClose(infowindow) {
    console.log("Close info window");


  }
  render() {
    return (
      <div className="App">

          <Map google={window.google} className={'map'} zoom={4} style={{width: '100%', height: '100%', position: 'relative'}}>

            {this.state.places.map((park) => <Marker onClick={this.onMarkerClick} name={park.name}
                    position={{lat: park.lat, lng: park.lng}} image={park.image} link={park.url}/>)}


            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
                <div>
                <h3>{this.state.selectedPlace.name}</h3>
                <img src={this.state.selectedPlace.image} /><br/>
                <strong>More info: <a href={this.state.selectedPlace.link} target="_blank">{this.state.selectedPlace.image}</a></strong>
              </div>
            </InfoWindow>
          </Map>
      </div>
    );
  }
}

export default App;
