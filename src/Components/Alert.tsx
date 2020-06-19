import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import firebaseApp from "../firebase/Firebase"

function Alert(props) {
  if (props.warn) {
    return null;
  }
  return (
    <SweetAlert
      warning
      showCancel
      confirmBtnText="Oui!"
      confirmBtnBsStyle="danger"
      title="Retour au lobby ?"
      onConfirm={props.handleDeath}
      onCancel={props.cancel}
      focusCancelBtn
    >
      Ca veut dire que vous être mort
    </SweetAlert>
  );
}

class Deleteall extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { showWarning: true };
        this.handleToggleClick = this.handleToggleClick.bind(this);
      }
  
  handleDeath() {
    const mDatabase = firebaseApp.database().ref()
    mDatabase.child("position/pierre").update({
        isDead:true
    })
    .then(function() {
        console.log("set isDead to true");
    }, function(error) {
        console.log("an error happened");
    });    
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <>
        <Alert
          warn={this.state.showWarning}
          handleDeath={this.handleDeath}
          cancel={this.handleToggleClick}
        />
        <input type="image" height="100" width="200" src="/dead.png" onClick={this.handleToggleClick} />
      </>
    );
  }
}

export default Deleteall;
