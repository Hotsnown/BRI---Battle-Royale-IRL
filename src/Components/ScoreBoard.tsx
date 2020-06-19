import React, { Component } from "react";
import firebaseApp from '../firebase/Firebase'

export class ScoreBoard extends Component <any, any>{
    constructor(props) {
        super(props)
        this.state = {
            players: []
        }
        this.handlePlayerList = this.handlePlayerList.bind(this)
    }

    async handlePlayerList() {
        function retrieveAllPlayers() {
          const mDatabase = firebaseApp.database().ref()
          return mDatabase.child("position")
            .once('value')
              .then((snapshot) => {
                  const snapshotValue = snapshot.val();
                      return snapshotValue; // note that db will return null if no value found or node does not exist
              })
        }
        const positions:any = await retrieveAllPlayers()
        const players:any = Object.keys(positions)
        console.log(players)
        this.setState({players:players})
      }      

    componentDidMount() {
        this.handlePlayerList()
    }

    render() {
        return (
            <>
            <h5 style={{color:"green", textDecoration:"underline"}}>Joueurs en vie :</h5>
            <ul style={{color:"green"}}>
                {console.log(this.state.players)}
                {this.state.players.map(player => <li>{player}</li>)}
            </ul>
            <h5 style={{color:"green", textDecoration:"underline"}}>Joueurs éliminés :</h5>
            <ul>

            </ul>
        </>
        )
    }
}