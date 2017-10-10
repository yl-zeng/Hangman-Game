import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="text-center">
        <h1>Game Begins</h1>
        <div className="row">
          <div className="col-sm-4">
            <img src="images/0.png"></img>
          </div>
          <div className="col-sm-8">

          </div>
        </div>
        <div className="row">
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button">Go!</button>
            </span>
            <input type="text" className="form-control" placeholder="One Letter..."/>
          </div>
        </div>
      </div>
    );
  }
}
