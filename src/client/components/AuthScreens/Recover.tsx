import React, { Component } from 'react';
import * as firebase from 'firebase';
import './Auth.css'

interface RecoverProps {

}

interface RecoverState {
  email: string
}

class Recover extends Component <RecoverProps, RecoverState> {
	constructor(props) {
    	super(props);
    	this.state = {email: ""};
    	//
    	this.handleEmailChange = this.handleEmailChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
	handleSubmit(e) {
	    e.preventDefault();
	    var email = this.state.email.trim();

	    firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Email sent.
        alert("Please check your email "+email+" for instructions ");
      }, function(error) {
        alert("sorry an error has occured, Please try again")
      });
  }
  render() {
    return (
      <div className="Login">
        <h1 className="login-title">Forgot password</h1>
        <div className="col-md-4"></div>
        <div className="form-group col-md-4">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <label className="form-control-label">ENTER EMAIL</label>
              <input type="text" className="form-control" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
          	<br/>
            <div className="col-lg-12 loginbttm">
              <div className="col-lg-6 login-btm login-text">
              </div>
              <div className="col-lg-6 login-btm login-button">
                <button type="submit" className="btn btn-outline-primary">Submit</button>
              </div>
              </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Recover;
