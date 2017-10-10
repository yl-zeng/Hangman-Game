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


export default (
  <Router history={history}>
    <div>
      <Route exact path="/" component={Welcome}/>
    </div>
  </Router>
);
