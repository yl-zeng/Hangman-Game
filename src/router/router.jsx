import React from 'react';
import {
  Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import history from "./../history/history.jsx";
import Welcome from "Components/Welcome.jsx";
import Game from "Components/Game.jsx";

export default (
  <Router history={history}>
    <div className="container">
      <Route path="/game" component={Game}/>
      <Route exact path="/" component={Welcome}/>
    </div>
  </Router>
);
