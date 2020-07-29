import React, { Component } from 'react'
import firebaseApp from '../../../config/firebase/Firebase'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'
import { retrieveAllPlayers } from '../../../infra/persistence/read'
import { endGame, startGame } from '../../../infra/persistence/update'
import { Player } from '../types'
import Password from './Password'
import ThemeContext from '../../themeContext'

interface ReadyAdminProps {
    
}

interface ReadyAdminState {
    usernames: string[]
    isReady: boolean[]
    isAuthorized: boolean
}

export class ReadyAdmin extends Component <ReadyAdminProps, ReadyAdminState> {
    constructor(props) {
        super(props)
        this.state = {
            usernames:[],
            isReady:[],
            isAuthorized: false
        }
        this.handleStart = this.handleStart.bind(this)
        this.handleEnd = this.handleEnd.bind(this)
        this.handlePlayerList = this.handlePlayerList.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
    }

    async handlePlayerList() {
        const players: Player[] = await retrieveAllPlayers(firebaseApp)
        const usernames = Object.values(players).filter((obj:Player) => obj.username !== undefined).map((obj:Player) => obj.username)
        const isReady = Object.values(players).filter((obj:Player) => obj.isReady !== undefined).map((obj:Player) => obj.isReady)
        console.log(players)
        this.setState({usernames:usernames, isReady:isReady})
      }      

    componentDidMount() {
        this.handlePlayerList()
    }

    showTable() {
        const tableRows:any = [];
        for (let i = 0; i < this.state.usernames.length; i++) {
              tableRows.push(
                <tr key={this.state.usernames[i] + "-" + this.state.usernames[i + 1] + "-" + i}>
                    <td style={{ border: "1px solid green " }}>
                        {this.state.usernames[i]}
                    </td>
                    <td style={{ border: "1px solid green " }}>
                        {(this.state.isReady[i] !== undefined)
                            ? this.state.isReady[i] ? "TRUE" : "FALSE"
                            : null}
                    </td>
                </tr>
              );
        }
        return tableRows;
    }

    onHandleSubmit(passwordText: string): boolean {
        if (passwordText === process.env.REACT_APP_ADMIN_PASSWORD) {
            this.setState({ isAuthorized : true })
            return true
        }
        alert(`${passwordText} est un mauvais mot de passe`)
        return false
    }

    handleStart() {
        startGame(firebaseApp)
    }
    
    handleEnd() {
        endGame(firebaseApp)
    }

    render() {
        const AdminPanel = (
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
        return (
            <ThemeContext.Consumer>
                {value => (
                    this.state.isAuthorized ? AdminPanel : <Password onHandleSubmit={this.onHandleSubmit}/>
                )}
            </ThemeContext.Consumer>
        )
    }
}