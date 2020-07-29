import React from 'react'

import { Header } from '../components/Header'
import Footer from '../components/Footer'

import { Router, Route, hashHistory } from 'react-router'
import Login from '../components/AuthScreens/Login';
import Signup from '../components/AuthScreens/Signup';
import Recover from '../components/AuthScreens/Recover';
import withGeolocalisation from '../features/Battlefield/withGeolocalisation';
import requireAuth from '../../infra/utils/RequireAuth';
import { ScoreBoard } from '../features/AlivePlayerList/AlivePlayerList';
import { Ready } from '../features/ReadyBoard/Ready';
import { FinalScore } from '../features/FinalScoreBoard/FinalScore';
import { ReadyAdmin } from '../features/ReadyAdminBoard/ReadyAdmin';


interface ShellProps {
    loggedin: boolean;
    onHandleDeath: () => void;
    onHandleReady: () => void
    onHandleReplay: () => void
    onEndedGame: () => void
}

export const Shell: React.FC<ShellProps> = (shellProps) => {
    return (
        <>
            <Header />
            <Main />
            <Footer 
                loggedin={shellProps.loggedin} 
                onHandleDeath={shellProps.onHandleDeath} />
        </>
    )
}

const Main = (shellProps) => (
    <div style={{ height: '100vh', width: '100%' }}>
        <Router history={hashHistory}>
            <Route path="scoreboard" component={ScoreBoard} onEnter={requireAuth}/>
            <Route path="readyAdmin" component={ReadyAdmin} onEnter={requireAuth}/>
            <Route path="finalscore" component={FinalScore} onEnter={requireAuth}/>
            <Route path="ready" component={Ready} onEnter={requireAuth}/>
            <Route path="login" component={Login} />
            <Route path="signup" component={Signup} />
            <Route path="recover" component={Recover} />
            <Route path="battlefield" component={withGeolocalisation} onEnter={requireAuth} />
        </Router>
    </div>
)

