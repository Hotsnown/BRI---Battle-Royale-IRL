import React, { Component } from "react"
import { Link, hashHistory } from 'react-router'
import firebaseApp from '../../../config/firebase/Firebase'
import { Player } from "../types"
import { rankPlayers, rankSelf, getGameDuration } from "./utils"
import { signOut } from '../../../infra/auth/signOut'
import { Leaderboard } from './LeaderBoard'
import ThemeContext from '../../themeContext'
import { retrieveAllPlayers } from '../../../infra/persistence/read'

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

    async componentDidMount() {
        const players: Player[] = Object.values(await retrieveAllPlayers(firebaseApp))
        console.log(players)
        const rank = rankPlayers(players)
        const rankedSelf = rankSelf(players, this.context.self)
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
                            <div className="scroller">
                                <Leaderboard
                                    data={
                                        this.state.others.map(player => ({
                                            userId: player.uid, 
                                            userName: player.username, 
                                        }))
                                      }
                                    title={value.self.username}
                                    selfRank={this.state.self}
                                />
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