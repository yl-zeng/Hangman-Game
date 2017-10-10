import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';

export default class Welcome extends React.Component {


  render() {
    return (
      <div className="text-center">
        <br/>
        <div><img src="images/index.png" width="30%"></img></div>
        <Link to="/game"><h1>Start Hangman</h1></Link>
      </div>
    );
  }
}
