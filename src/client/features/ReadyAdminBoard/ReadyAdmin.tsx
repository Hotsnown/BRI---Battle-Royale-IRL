import React, { Component } from 'react'
import firebaseApp from '../../../config/firebase/Firebase'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router'
import { retrieveAllPlayers } from '../../../infra/persistence/read'
import { Player } from '../types'
import Password from './Password'
import ThemeContext from '../../themeContext'

interface ReadyAdminProps {
    
}

interface ReadyAdminState {
    usernames: string[]
    isReady: boolean[]
    isAuthorized: boolean
    isDead: boolean[]
}

interface Row extends JSX.Element {
    
}

export class ReadyAdmin extends Component <ReadyAdminProps, ReadyAdminState> {
    constructor(props) {
        super(props)
        this.state = {
            usernames:[],
            isReady:[],
            isAuthorized: false,
            isDead: []
        }
        this.handlePlayerList = this.handlePlayerList.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
    }

    async handlePlayerList() {
        firebaseApp.database().ref('players')
            .on('value', (players) => {
                const usernames = Object.values(players?.val() as Player[]).filter((obj:Player) => obj.username !== undefined).map((obj:Player) => obj.username)
                const isReady = Object.values(players?.val() as Player[]).filter((obj:Player) => obj.isReady !== undefined).map((obj:Player) => obj.isReady)
                const isDead = Object.values(players?.val() as Player[]).filter((obj:Player) => obj.isDead !== undefined).map((obj:Player) => obj.isDead)
                this.setState({usernames:usernames, isReady:isReady, isDead: isDead})
            });
        
      }      

    componentDidMount() {
        this.handlePlayerList()
    }

    showTable() {
        const tableRows:Row[] = [];
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
                    <td style={{ border: "1px solid green " }}>
                        {(this.state.isDead[i] !== undefined)
                            ? this.state.isDead[i] ? "TRUE" : "FALSE"
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

    render() {
        return (
            <ThemeContext.Consumer>
                {value => (
                    this.state.isAuthorized ? 
                    <>
                    <div style = {{display:"flex", justifyContent: "center"}}>
                    <table style={{ border: "1px solid green ", color: "green"}}>
                            <tbody>
                            <th style={{ border: "1px solid green " }}>Joueurs</th>
                            <th style={{ border: "1px solid green " }}>Est prêt ?</th>
                            <th style={{ border: "1px solid green " }}>Est mort ?</th>
                            </tbody>
                            <tbody>{this.showTable()}</tbody>
                        </table>
                    </div>
                    <Link to="/battlefield"><Button onClick={value.onHandleStart}>Lancer la partie</Button></Link>
                    <Button onClick={value.onHandleEnd}>Terminer la partie</Button>
                </> 
                : <Password onHandleSubmit={this.onHandleSubmit}/>
                )}
            </ThemeContext.Consumer>
        )
    }
}