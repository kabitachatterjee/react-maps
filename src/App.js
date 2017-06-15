import React, { Component } from 'react';
import logo from './logo.svg';
//import MapContainer, {Container} from './containers/MapContainer.js';
import './App.css';
import Map, {Marker,InfoWindow} from 'google-maps-react';
import SearchForm from './components/SearchForm';
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


  componentDidMount() {
    ParksModel.all().then( (res) => {
      this.setState ({
        places: res
      })

      console.log(res)
    })

  }
  searchParks(search){
    let placesOnSearch = this.state.places.filter(function(el) {
      return el.name.toLowerCase().includes(search.toLowerCase())
    });
    this.setState({
      places: placesOnSearch
    })
    console.log(placesOnSearch)
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
      <SearchForm className="Row-spacer" searchParks={this.searchParks.bind(this)}/>
      <Map className="Row-spacer" google={window.google}    className={'map'} zoom={4} style={{width: '100%', height: '100%', margin:'20px 0 0 0', position: 'relative'}}>
          {this.state.places.map((park) => <Marker    onClick={this.onMarkerClick} name={park.name}
          position={{lat: park.lat, lng: park.lng}} image={park.image} link={park.url}/>)}
        <InfoWindow style={{ backgroundColor: 'black', opacity: 0.75, padding: '20px' }} marker={this.state.activeMarker} visible={this.state.showingInfoWindow}>
          <div>
            <h3>{this.state.selectedPlace.name}</h3>
            <img src={this.state.selectedPlace.image} /><br/>
            <strong><span>More info: </span><a href={this.state.selectedPlace.link} target="_blank">{this.state.selectedPlace.image}</a></strong>
          </div>
        </InfoWindow>
        </Map>
        </div>
    );
  }
}

export default App;
