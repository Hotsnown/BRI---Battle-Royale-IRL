import React, { Component } from 'react';
import firebaseApp from './firebase/Firebase';
import { hashHistory } from 'react-router'
import './css/font-awesome.css'
import './css/bootstrap-social.css';

import { GeolocatedProps, geolocated } from 'react-geolocated';
import { ToastContainer, toast } from 'react-toastify';


import Map from './Components/Map'
import Navbar from './Navbar'


const MainWithGeoloc = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Map);

class App extends Component<any, any> {
  constructor(props) {
      super(props);
      this.state = {loggedin: false};
  }
  componentWillMount(){
    let _this = this;
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        //if logged in...
        _this.setState({loggedin: true});
          hashHistory.push('/ready'); //after login, redirect to dashboard
      } else {
        //if not logged in...
        _this.setState({loggedin: false});
      }
    });
  } 
  render() {
    return (
      <div >
        <div className="App-header">
          <img src="/biohazard.svg" height="35" width="35" ></img>
          <h4>Battle Royale IRL</h4>
        </div>
        <div style={{ height: '100vh', width: '100%' }}>
        {this.props.children}
        </div>
        <Navbar loggedin={this.state.loggedin} />
      </div>
    );
  }
}

export default App;
