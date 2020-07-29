import React, { Component } from "react"
import { Link, hashHistory } from 'react-router'
import firebaseApp from '../../../config/firebase/Firebase'
import { Player } from "../types"
import { rankPlayers, rankSelf, getGameDuration } from "./utils"
import { signOut } from '../../../infra/auth/signOut'
import { LeaderBoardTest } from './LeaderBoard'
import ThemeContext from '../../themeContext'

import './FinalScore.css'

interface FinalScoreProps {

}

interface FinalScoreState {
    first: Player
    others: Player[]
    self: number
    gameDuration: Promise<number> | number
}

export class FinalScore extends Component<FinalScoreProps, FinalScoreState> {
    constructor(props) {
        super(props)
        this.state = {
            first: {} as Player,
            others: [] as Player[],
            self: -1,
            gameDuration: -1,
        }
    }

    handleNotReplay() {
        signOut(firebaseApp, hashHistory)
    }

    componentDidMount() {
        const rank = rankPlayers(this.context.players)
        const rankedSelf = rankSelf(this.context.players, this.context.self)
        const gameDuration = getGameDuration()

        this.setState({ first: rank.first })
        this.setState({ others: rank.others })
        this.setState({ self: rankedSelf })
        this.setState({ gameDuration: gameDuration })
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {value => (
                    <>
                        <div className={"FinalScore"}>
                            <h1>{this.state.first.username}</h1>
                            <ul>
                                <li>{value.self.username}</li>
                                <li>{value.players.length || -1}</li>
                                <li>{}</li>
                            </ul>
                            <ul>
                                {this.state.others.map(player => <li>{player.username}</li>)}}
                            </ul>
                            <div className="scroller">
                                <LeaderBoardTest></LeaderBoardTest>
                            </div>
                        </div>
                        <div className="FinalScoreMenu">
                            <Link to="/ready"><input type="image" alt="replay button" height="50" width="100" src="/Replay.png" onClick={value.onHandleReplay} /></Link>
                            <input type="image" alt="not replay button" height="50" width="100" src="/Notreplay.png" onClick={this.handleNotReplay} />
                        </div>
                    </>
                )}
            </ThemeContext.Consumer>
        )
    }
}