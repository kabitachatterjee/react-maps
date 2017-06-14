import React, {Component} from 'react';
import {GoogleApiComponent} from 'google-maps-react';
import Map from 'google-maps-react';

class Container extends React.Component {
  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    }
    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <Map google={this.props.google} />
    )
  }
}

// export default GoogleApiComponent({
//   apiKey: "AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo"
// })(Container)
export default Container
