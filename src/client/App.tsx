import React, { Component } from 'react';
import firebaseApp from '../config/firebase/Firebase';

import './assets/css/font-awesome.css'
import './assets/css/bootstrap-social.css';

import { Shell } from './shell/shell'
import { updatePlayer } from '../infra/persistence/update';
import { Player, Game } from './features/types';
import { hashHistory } from 'react-router'
import ThemeContext from './themeContext';

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
    this.state = {
      loggedin: false,
      game: {
        isGameEnded: false,
        players: {} as Player[]
      },
      playerData: {
        isDead: false,
        isReady: false,
        username: "Pierre",
        uid: "00000",
        position: {
          longitude: 0,
          latitude: 0
        },
        deathHour: 'alive'
      }
    };
    this.onHandleDeath = this.onHandleDeath.bind(this)
    this.onHandleReady = this.onHandleReady.bind(this)
    this.onHandleReplay = this.onHandleReplay.bind(this)
    this.onEndedGame = this.onEndedGame.bind(this)
  }

  componentDidMount() {
    let _this = this;
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        _this.setState({ loggedin: true });
        hashHistory.push('/ready');
      } else {
        _this.setState({ loggedin: false });
      }
    });
  }

  onHandleDeath() {
    this.setState({ playerData: { ...this.state.playerData, isDead: true } });
    const data: Player = {
      isReady: this.state.playerData.isReady,
      uid: this.state.playerData.uid,
      username: this.state.playerData.username,
      isDead: true,
      position: this.state.playerData.position,
      deathHour: this.state.playerData.deathHour
    }
    updatePlayer(firebaseApp, data)
  }

  onHandleReady() {
    this.setState({ playerData: { ...this.state.playerData, isReady: true } });
    const data: Player = {
      isReady: true,
      uid: this.state.playerData.uid,
      username: this.state.playerData.username,
      isDead: this.state.playerData.isReady,
      position: this.state.playerData.position,
      deathHour: this.state.playerData.deathHour
    }
    updatePlayer(firebaseApp, data)
    console.log(this.state.playerData.isReady)
  }

  onHandleReplay() {
    this.setState({ playerData: { ...this.state.playerData, isReady: false } });
    const data: Player = {
      isReady: false,
      uid: this.state.playerData.uid,
      username: this.state.playerData.username,
      isDead: this.state.playerData.isReady,
      position: this.state.playerData.position,
      deathHour: this.state.playerData.deathHour
    }
    updatePlayer(firebaseApp, data)
  }

  onEndedGame() {
    if (this.state.game.players.filter(player => !player.isDead).length === 1) {
      this.setState({ game: { ...this.state.game, isGameEnded: true } })
      hashHistory.push('/finalScore')
    }
  }

  render() {
    return (
      <ThemeContext.Provider value={{
        loggedin: this.state.loggedin,
        onHandleDeath: this.onHandleDeath,
        onHandleReady: this.onHandleReady,
        onEndedGame: this.onEndedGame,
        onHandleReplay: this.onHandleReplay,
        self:this.state.playerData,
        players:this.state.game.players
      }}>
        <Shell
          loggedin={this.state.loggedin}
          onHandleDeath={this.onHandleDeath}
          onHandleReady={this.onHandleReady}
          onHandleReplay={this.onHandleReplay}
          onEndedGame={this.onEndedGame}
        />
      </ThemeContext.Provider>
    );
  }
}

export default App