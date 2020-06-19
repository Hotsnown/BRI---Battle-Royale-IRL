import React, { Component } from 'react';
import { Player } from './Player';
import firebaseApp from '../../firebase/Firebase'

class Players extends Component <any, any> {
  constructor(props) {
    super(props)
    this.state = {
      players:{}
    }
  }

  componentWillMount(){
    var _this = this;
    var selfPosition = firebaseApp.database().ref('position');
    selfPosition.on('value', function(snapshot) {
      var obj = snapshot!.val();
      _this.setState({players: obj});
      console.log(_this.state.players)
    });
  }

  render() {
    return Object.values(this.state.players).map( (player:any) => <Player lat={player.latitude} lng={player.longitude}/> );
  }
}

export default Players;
