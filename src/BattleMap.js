import React, { Component } from 'react';
import { GeolocatedProps, geolocated } from 'react-geolocated';
import { ToastContainer, toast } from 'react-toastify';

import Map from './Components/Map'

const MainWithGeoloc = geolocated({
	positionOptions: {
	  enableHighAccuracy: false,
	},
	userDecisionTimeout: 5000,
  })(Map);

class BattleMap extends Component {
	
  render() {
    return (
      <div className="Dashboard">
      	<br/>
			<MainWithGeoloc />
      </div>
    );
  }
}

export default BattleMap;
