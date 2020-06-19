import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Home from './Home';
import Login from './authscreens/Login';
import Signup from './authscreens/Signup';
import Recover from './authscreens/Recover';
import BattleMap from './BattleMap';
import requireAuth from './utils/RequireAuth';
import './css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ScoreBoard } from './Components/ScoreBoard';
import { Ready } from './Components/Ready';
import { FinalScore } from './Components/FinalScore';
import { ReadyAdmin } from './Components/ReadyAdmin';

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
      <Route path="dashboard" component={BattleMap} onEnter={requireAuth} />
    </Route>
  </Router>
), document.getElementById('root'))