import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';
import history from '../history/history.jsx';

export default class Game extends React.Component {

  constructor(props) {
    super(props);
    var id = sessionStorage.getItem('hangmanId') === null ? 0 : sessionStorage.getItem('hangmanId');
    console.log("constructor");
    this.state = {
      id,
      showcase: "_ _ _ _ _ _ _ ",
      history: [],
      count: 0,
      win: false,
      done: false
    };
  }

  componentWillMount() {
    console.log("componentWillMount");
    if(this.state.id !== 0) {
      this.retrieveWord();
    } else {
      this.createWord();
    }
  }

  createWord = () => {
    var curr = this;

    $.ajax({
      url: "/word/",
      type: "POST",
      dataType: "json",
      contentType: "application/json"
    }).done(function(data) {
      curr.setState({
        id: data._id,
        showcase: data.showcase,
        history: data.history,
        count: data.count,
        done: data.done,
        win: data.win
      }, function() {
        sessionStorage.setItem('hangmanId', data._id);
      });
    }).fail(function() {
      console.log(err.responseText);
      console.log("something wrong");
    });
  }

  retrieveWord = () => {
    var id = this.state.id;
    var curr = this;
    $.ajax({
      url: "/word/" + id,
      type: "GET",
      dataType: "json",
      contentType: "application/json"
    }).done(function(data) {
      curr.setState({
        showcase: data.showcase,
        history: data.history,
        count: data.count,
        done: data.done,
        win: data.win
      })
    }).fail(function(err) {
      console.log(err.responseText);
      curr.createWord();
    });
  }

  guessWord = (id, guess) => {
    var curr = this;

    $.ajax({
      url: "/word/" + id,
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(guess)
    }).done(function(data) {
      curr.setState({
        showcase: data.showcase,
        history: data.history,
        count: data.count,
        done: data.done,
        win: data.win
      })
    }).fail(function(err) {
      console.log(err.responseText);
    });
  }

  handleGuess = () => {
    var id = this.state.id;
    var data = {
      guess: $("#guess").val()
    };
    $("#guess").val("");

    this.guessWord(id, data);
  }

  handleClose = () => {
    history.goBack();
  }

  handleRestart = () => {
    this.createWord();
  }

  render() {
    var misses;

    if(this.state.history) {
      misses = this.state.history.map((h) =>
        <span>{" " + h + ","}</span>
      );
    } else {
      misses = <span></span>;
    }

    return (
      <div className="text-center">
        <h1>Game Begins</h1>
        <div className="row">
          <div className="col-sm-4">
            <img src={"images/" + this.state.count + ".png"}></img>
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
                <button className="btn btn-secondary" onClick={this.handleGuess} type="button">Go!</button>
              </span>
              <input id="guess" type="text" className="form-control" placeholder="One Letter..."/>
            </div>
          </div>
        </div>

        <div className="backdrop" style={{"display":this.state.done ? "block" : "none"}}></div>
        <div className="modal" tabindex="-1" role="dialog" style={{"display":this.state.done ? "block" : "none"}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={this.handleClose} data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">You win</h4>
                    </div>
                    <div className="modal-body">
                        <p>Good Game</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={this.handleClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.handleRestart}>Restart</button>
                    </div>
                </div>
            </div>
       </div>
      </div>
    );
  }
}
