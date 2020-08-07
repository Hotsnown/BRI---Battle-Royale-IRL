import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'
import firebaseApp from '../../config/firebase/Firebase';
import DeathButton from './Notifications/DeathButton'
import { Dropdown } from 'react-bootstrap'
import ThemeContext from '../themeContext'
import { updatePlayer } from '../../infra/persistence/update';

interface FooterProps {
  loggedin: boolean
  onHandleDeath: () => void
}

interface FooterState {
  showDeathButton: boolean
}

class Footer extends Component<FooterProps, FooterState> {

  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
    this.state = {showDeathButton: false}
  }

  signout() {
    firebaseApp.auth().signOut().then(function () {
      console.log("sign out succesful");
      hashHistory.push('/login');
    }, function (error) {
      console.log("an error happened");
    });
  }

  componentDidMount() {
    firebaseApp.database().ref('game/isLive')
      .on('value', (snapshot) => {
        const isLive = snapshot?.val()
        if (isLive) {
          this.setState({showDeathButton: true})
        }
      });
  }

  render() {
    var loginButton;
    var signup;
    if (this.props.loggedin) {
      loginButton = <button className="btn btn-default" onClick={this.signout}>Se déconnecter</button>;
      signup = "";
    } else {
      loginButton = <Link to="/login"><button className="btn btn-default">Se connecter</button></Link>;
      signup = <Link to="/signup"><button className="btn btn-default">S'inscrire</button></Link>;
    }
    
    return (
      <ThemeContext.Consumer>
        {value => (
          <div className="Navbar">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="mb-2">
              <Dropdown>
                <Dropdown.Toggle
                  key={'up'}
                  as={MenuButton}
                  id="dropdown-custom-components"
                ></Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#ready" eventKey="1" onClick={() => updatePlayer(firebaseApp, {...value.self, isReady: false})}>Rejouer</Dropdown.Item>
                  <Dropdown.Item href="#readyAdmin" eventKey="2">Admin</Dropdown.Item>
                  <Dropdown.Item eventKey="3">{loginButton}</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">{signup}</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
  
            {this.state.showDeathButton && <DeathButton onHandleDeath={this.props.onHandleDeath} />}
            <Link to="/scoreboard"><input type="image" height="50" width="100" src="/back.png" /></Link>
          </div>
        </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

//@ts-ignore
const MenuButton = React.forwardRef(({ children, onClick }, ref) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a
    href=""
    ref={ref as any}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <input alt="menu button" type="image" height="50" width="100" src="/menu.png" name="saveForm" className="btTxt submit" id="saveForm" />
    {children}
  </a>
));



export default Footer;
