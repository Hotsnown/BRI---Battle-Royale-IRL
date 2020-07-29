import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import firebaseApp from '../../config/firebase/Firebase';
import DeathButton from './Notifications/DeathButton'
import {Dropdown, DropdownButton} from 'react-bootstrap'

interface FooterProps {
  loggedin: boolean
  onHandleDeath: () => void
}

interface FooterState {

}

class Footer extends Component <FooterProps, FooterState> {

  constructor(props) {
      super(props);
      this.signout = this.signout.bind(this);
  }

  signout(){
    firebaseApp.auth().signOut().then(function() {
      console.log("sign out succesful");
      hashHistory.push('/login');
    }, function(error) {
      console.log("an error happened");
    });
  }
  
  render() {
    var loginButton;
    var signup;
    if (this.props.loggedin) {
      loginButton = <button className="btn btn-default" onClick={this.signout}>Logout</button>;
      signup = "";
    } else {
      loginButton = <Link to="/login"><button className="btn btn-default">login</button></Link>;
      signup = <Link to="/signup"><button className="btn btn-default">Sign up</button></Link>;
    }
    return (
      <div className="Navbar">
        <div style = {{display:"flex", alignItems:"center", justifyContent: "space-between"}}>
        <div className="mb-2">
            <DropdownButton
              key={'up'}
              id={`dropdown-button-drop-${'up'}`}
              drop={'up'}
              variant="secondary"
              title={` Drop ${'up'} `}
            >
              <Dropdown.Item href="#ready" eventKey="1">Aller à Ready</Dropdown.Item>
              <Dropdown.Item href="#readyAdmin" eventKey="2">Aller à ReadyAdmin</Dropdown.Item>
              <Dropdown.Item eventKey="3">{loginButton}</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="4">{signup}</Dropdown.Item>
            </DropdownButton>
          </div>
          {/* <input type="image" height="50" width="100" src="/menu.png" name="saveForm" className="btTxt submit" id="saveForm" /> */}
          <DeathButton onHandleDeath={this.props.onHandleDeath}/>
          <Link to="/scoreboard"><input type="image" height="50" width="100" src="/back.png"/></Link>
        </div>
        
      </div>
    );
  }
}

export default Footer;
