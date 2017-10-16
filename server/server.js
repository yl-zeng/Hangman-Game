var express = require('express');
var {ObjectId} = require("mongodb");
var _ = require("lodash");

const bodyParser = require("body-parser");
// Create our app
var app = express();
const PORT = process.env.PORT || 3000;
var {generateWord} = require("./utils/util");
var {Word} = require("./db/db");


app.use(bodyParser.json());

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));


// createWord
app.post("/word", function(req, res) {

  console.log("POST /word/ Create word");
  generateWord().then((word) => {
    res.status(200).send(word);
  }).catch((e) => {
    res.status(404).send("cannot create word");
  });
});


// retrieveWord
app.get("/word/:id", function(req, res) {
  var id = req.params.id;

  if(!ObjectId.isValid(id)) {
    return res.status(404).send("not found id");
  }

  console.log("GET /word/:id ID: " + id + " Retrieve Word ");

  Word.findById(new ObjectId(id)).then((word) => {
    if(!word) {
      return res.status(404).send("Id not found");
    }

    res.status(200).send(_.pick(word, ["count", "showcase", "history", "done", "win"]));
  }).catch((e) => {
    res.status(404).send("something wrong");
  });
});


// guessWord
app.post("/word/:id", function(req, res) {
  var id = req.params.id;
  if(!ObjectId.isValid(id)) {
    return res.status(404).send("invalid id");
  }

  console.log("POST /word/:id ID: " + id + " Guess " + req.body.guess);

  Word.findById(new ObjectId(id)).then((word) => {
    if(!word) {
      return res.status(404).send("Id not found");
    }

    return word.guess(req.body.guess);
  }).then((updatedWord) => {
    res.status(200).send(_.pick(updatedWord,["count", "showcase", "history", "done", "win"]));
  }).catch((e) => {
    res.status(404).send(e);
  });
});

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
  console.log(process.env.NODE_ENV);
});
