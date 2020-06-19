import React, { Component } from 'react';
import firebaseApp from './firebase/Firebase';
import { hashHistory } from 'react-router'
import './css/font-awesome.css'
import './css/bootstrap-social.css';

import { GeolocatedProps, geolocated } from 'react-geolocated';
import { ToastContainer, toast } from 'react-toastify';


import Map from './Components/MapScreen/Map'
import Footer from './Components/Layout/Footer.js'
import { Header } from './Components/Layout/Header';

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
        <Header />
        <div style={{ height: '100vh', width: '100%' }}>
        {this.props.children}
        </div>
        <Footer loggedin={this.state.loggedin} />
      </div>
    );
  }
}


export default App;
