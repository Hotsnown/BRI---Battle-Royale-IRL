import React, { Component } from 'react';
import firebaseApp from '../config/firebase/Firebase';

import './assets/css/font-awesome.css'
import './assets/css/bootstrap-social.css';

import { Shell } from './shell/shell'
import { updatePlayer } from '../infra/persistence/update';
import { Player, Game } from './features/types';
import { hashHistory } from 'react-router'
import ThemeContext from './themeContext';
import { Position } from './features/types';
import { endGame, startGame } from '../infra/persistence/update'
import { Timer } from '../services/timer'
import WakeLock from 'react-wakelock-react16';

interface AppProps {

}

interface AppState {
  loggedin: boolean
  playerData: Player
  game: Game
}

if (!process.env.REACT_APP_GOOGLE_MAP_API_KEY) {
  throw new Error()
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    firebaseApp.auth().onAuthStateChanged(function(user) {
      if (user) {
        user = firebaseApp.auth().currentUser
      } else {
        console.error("Il faut s'inscrire!")
      }
    });
    this.state = {
      loggedin: false,
      game: {
        players: {} as Player[],
        isLive: false,
        radius: Timer.getInstance().read()
      },
      playerData: {
        isDead: false,
        isReady: false,
        username: 'unknown',
        uid: Math.random().toString(),
        position: {
          latitude: 45.51324901,
          longitude: 0.32382846,
        },
        deathHour: 'alive'
      }
    };

    this.onHandleDeath = this.onHandleDeath.bind(this)
    this.onHandleReplay = this.onHandleReplay.bind(this)
    this.onHandleEnd = this.onHandleEnd.bind(this)
    this.onHandleStart = this.onHandleStart.bind(this)
    this.onHandleSubmitPlayerPosition = this.onHandleSubmitPlayerPosition.bind(this)
  }

  componentDidMount() {
    let _this = this;
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        _this.setState({ 
          loggedin: true,
          playerData: {
            ...this.state.playerData,
            username: user.email,
            uid: user.uid
          }
         });
        hashHistory.push('/ready');
      } else {
        _this.setState({ loggedin: false });
        hashHistory.push('/signup');
      }
    });
    
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(console.log, err => alert('Erreur:' + err));
      }
  }

  onHandleDeath(): boolean {
    const isLive = firebaseApp.database().ref("game/isLive").once("value")
    if (isLive) {
      this.setState({ playerData: { ...this.state.playerData, isReady: false, isDead: true, deathHour: new Date() } });
      updatePlayer(firebaseApp, this.state.playerData)
      return true 
    } else {
      alert('On ne peut mourir qu\'après le début de la partie')
      return false
    }
  }

  onHandleReplay() {
    this.setState({ playerData: { ...this.state.playerData, isReady: false, isDead: false, deathHour: 'alive' } });
    updatePlayer(firebaseApp, this.state.playerData)
  }

  onHandleEnd() {
    this.setState({ game: {...this.state.game, isLive: false}})
    endGame(firebaseApp)
  }

  onHandleSubmitPlayerPosition(coords: Position) {
    this.setState({playerData: {...this.state.playerData, position: {latitude: coords.latitude, longitude: coords.longitude}}})
    updatePlayer(firebaseApp, this.state.playerData);
  }

  onHandleStart() {
    this.setState({game: {...this.state.game, isLive: true}})
    startGame(firebaseApp)
  }

  render() {
    return (
      <ThemeContext.Provider value={{
        loggedin: this.state.loggedin,
        onHandleDeath: this.onHandleDeath,
        onHandleEnd: this.onHandleEnd,
        onHandleStart: this.onHandleStart,
        onHandleReplay: this.onHandleReplay,
        onHandleSubmitPlayerPosition: this.onHandleSubmitPlayerPosition,
        self:this.state.playerData,
        game: this.state.game,
      }}>
        <WakeLock />
        <Shell
          loggedin={this.state.loggedin}
          onHandleDeath={this.onHandleDeath}
        />
      </ThemeContext.Provider>
    );
  }
}

export default App