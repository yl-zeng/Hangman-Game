import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import $ from 'jquery';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    var id = sessionStorage.getItem('hangmanId') === null ? 0 : sessionStorage.getItem('hangmanId');

    this.state = {
      id,
      showcase: "_ _ _ _ _ _ _ ",
      history: [],
      count: 0
    };
  }

  componentWillMount() {
    if(this.state.id !== 0) {
      retrieve();
    }
  }

  retrieve() {
    var id = this.state.id;
    var curr = this;
    $.ajax({
      url: "http://localhost:3000/word/" + id,
      method: "GET",
    }).done(function(data) {
      curr.setState({
        showcase: data.showcase,
        history: data.history,
        count: data.count
      })
    }).fail(function() {
      console.log("something wrong");
    });
  }

  render() {

    var misses = this.state.history.map((h) =>
      <span>{" " + h + ","}</span>
    );

    return (
      <div className="text-center">
        <h1>Game Begins</h1>
        <div className="row">
          <div className="col-sm-4">
            <img src="images/0.png"></img>
          </div>
          <div className="col-sm-8" style={{"textAlign":"left"}}>
            <h1>Id:{this.state.id}</h1>
            <h1>Word:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.showcase}</h1>
            <h1>Misses:{misses}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2 col-sm-offset-5">
            <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">Go!</button>
              </span>
              <input type="text" className="form-control" placeholder="One Letter..."/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
