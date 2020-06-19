import React, { Component } from "react"
import { Link, hashHistory } from 'react-router'
import firebaseApp from '../../firebase/Firebase'

export class FinalScore extends Component<any, any> {
    constructor(props) {
        super(props)
        this.handleReplay = this.handleReplay.bind(this)
        this.handleNotReplay = this.handleNotReplay.bind(this)
    }

    handleReplay() {
        const mDatabase = firebaseApp.database().ref()
        mDatabase.child("position/pierre").update({
            isReady:false
        })
        .then(function() {
            console.log("set isReady to false");
        }, function(error) {
            console.log("an error happened");
        });
    }

    handleNotReplay() {
        firebaseApp.auth().signOut().then(function() {
            console.log("sign out succesful");
            hashHistory.push('/login');
          }, function(error) {
            console.log("an error happened");
          });
    }

    render() {
        return (
            <>
            <div className={"FinalScore"} style={{display:"flex", flexDirection: "column", alignContent: "center", color:"green"}}>
                <h5>Pierre</h5>
                <ul>
                    <li>Votre rang : 2ème</li>
                    <li>Nombre de joueurs : 6</li>
                    <li>Temps de Partie : 23:52</li>
                </ul>
                <ul>
                    <li>1ère place : Sheena</li>
                    <li>2ème place : Une légende</li>
                    <li>3ème place : Dedain</li>
                    <li>4ème place : Jibay</li>
                    <li>5ème place : Reyvix</li>
                </ul>
            </div>
            <div style={{display:"flex", justifyContent: "space-evenly", alignContent: "center"}}>

                <Link to="/ready"><input type="image" height="50" width="100" src="/Replay.png" onClick={this.handleReplay}/></Link>
                <input type="image" height="50" width="100" src="/Notreplay.png" onClick={this.handleNotReplay}/>
            

            </div>
            </>
        )
    }
}