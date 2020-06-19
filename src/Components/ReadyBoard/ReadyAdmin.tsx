import React, { Component } from 'react'
import firebaseApp from '../../firebase/Firebase'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'

export class ReadyAdmin extends Component <any, any> {
    constructor(props) {
        super(props)
        this.state = {
            players:["pierre"],
            isReady:[false]
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleEnd = this.handleEnd.bind(this)
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
        const isReady:any = Object.values(positions).filter((obj:any) => obj.isReady !== undefined).map((obj:any) => obj.isReady)
        console.log(isReady)
        this.setState({players:players, isReady:isReady})
        
      }      

    componentDidMount() {
        this.handlePlayerList()
    }

    showTable() {
        const tableRows:any = [];
        for (let i = 0; i < this.state.players.length; i = i + 2) {
              tableRows.push(
                <tr key={this.state.players[i] + "-" + this.state.players[i + 1] + "-" + i}>
                    <td style={{ border: "1px solid green " }}>
                        {this.state.players[i]}
                    </td>
                    <td style={{ border: "1px solid green " }}>
                        {console.log(this.state.isReady[i + 1])}
                        {(this.state.isReady[i + 1] !== undefined)
                            ? this.state.isReady[i + 1].toString()
                            : null}
                    </td>
                </tr>
              );
        }
        return tableRows;
    }

    handleStart() {
        const mDatabase = firebaseApp.database().ref()
        mDatabase.child("position/pierre").update({
            isDead:false,
            inGame:true
        });
    }
    
    handleEnd() {
        const mDatabase = firebaseApp.database().ref()
        mDatabase.child("position/pierre").update({
            inGame:false
        });
    } 

    render() {
        return (
            <>
                <div style = {{display:"flex", justifyContent: "center"}}>
                <table style={{ border: "1px solid green ", color: "green"}}>
                        <tbody>
                        <th style={{ border: "1px solid green " }}>Joueurs</th>
                        <th style={{ border: "1px solid green " }}>Est prêt ?</th>
                        </tbody>
                        <tbody>{this.showTable()}</tbody>
                    </table>
                </div>
                <Link to="/dashboard"><Button onClick={this.handleStart}>Lancer la partie</Button></Link>
                <Button onClick={this.handleStart}>Terminer la partie</Button>
            </>
        )
    }


}