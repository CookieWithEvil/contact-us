import React, {useEffect} from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class Map extends React.Component {
  render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={{ width: '100%', height: '100%'}}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        />
    );
  }
}
