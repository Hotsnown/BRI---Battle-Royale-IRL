import React, { Component } from "react";
import firebaseApp from '../../../config/firebase/Firebase'
import { retrieveAllPlayers } from '../../../infra/persistence/read'
import ThemeContext from '../../themeContext'

interface ScoreBoardProps {

}

interface ScoreBoardState {
    players: any
}

export class ScoreBoard extends Component<ScoreBoardProps, ScoreBoardState>{
    constructor(props) {
        super(props)
        this.state = {
            players: []
        }
        this.handlePlayerList = this.handlePlayerList.bind(this)
    }

    async handlePlayerList() {
        const positions = await retrieveAllPlayers(firebaseApp)
        const players = Object.keys(positions)
        console.log(players)
        this.setState({ players: players })
    }

    componentDidMount() {
        this.handlePlayerList()
    }

    render() {
        return (
                <ThemeContext.Consumer>
                    {value => (
                        <>
                        <h5 style={{ color: "green", textDecoration: "underline" }}>Joueurs en vie :</h5>
                        <ul style={{ color: "green" }}>
                            {this.state.players.map(player => <li>{player}</li>)}
                        </ul>
                        <h5 style={{ color: "green", textDecoration: "underline" }}>Joueurs éliminés :</h5>
                        <ul>
                        </ul>
                        </>
                    )}
                </ThemeContext.Consumer>
        )
    }
}