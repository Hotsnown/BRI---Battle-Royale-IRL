import React, { Component } from 'react';
import { GeolocatedProps, geolocated } from 'react-geolocated';

import Map from './Map'

const MainWithGeoloc = geolocated({
	positionOptions: {
	  enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
  })(Map);

class withGeolocalisation extends Component {
	
  render() {
    return (
      <div className="Dashboard">
      	<br/>
			<MainWithGeoloc />
      </div>
    );
  }
}

export default withGeolocalisation;
