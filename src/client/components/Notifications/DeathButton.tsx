import React from "react";
import SweetAlert from "react-bootstrap-sweetalert";

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

interface DeleteallProps {
  onHandleDeath: () => void
}

interface DeleteallState {
  showWarning: boolean
}

class DeathButton extends React.Component<DeleteallProps, DeleteallState> {
    constructor(props) {
        super(props);
        this.state = { showWarning: true };
        this.handleToggleClick = this.handleToggleClick.bind(this);
        this.handleDeath = this.handleDeath.bind(this)
      }
  
  handleDeath() {
    this.props.onHandleDeath()
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

export default DeathButton;
