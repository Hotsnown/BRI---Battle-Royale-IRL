import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { render } from 'react-dom';

import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from './Components/Home';
import Login from './Components/AuthScreens/Login';
import Signup from './Components/AuthScreens/Signup';
import Recover from './Components/AuthScreens/Recover';
import withGeolocalisation from './Components/MapScreen/withGeolocalisation';
import requireAuth from './infra/utils/RequireAuth';
import { ScoreBoard } from './Components/ScoreBoard/ScoreBoard';
import { Ready } from './Components/ReadyBoard/Ready';
import { FinalScore } from './Components/ScoreBoard/FinalScore';
import { ReadyAdmin } from './Components/ReadyBoard/ReadyAdmin';

import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="scoreboard" component={ScoreBoard} />
      <Route path="readyAdmin" component={ReadyAdmin} />
      <Route path="finalscore" component={FinalScore} />
      <Route path="ready" component={Ready} />
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="recover" component={Recover} />
      <Route path="dashboard" component={withGeolocalisation} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'))