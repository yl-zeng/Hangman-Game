var express = require('express');
var {ObjectId} = require("mongodb");
var _ = require("lodash");

const bodyParser = require("body-parser");
// Create our app
var app = express();
const PORT = process.env.PORT || 3000;
var {generateWord} = require("./utils/util");


app.use(bodyParser.json());

app.use(function (req, res, next){
  if (req.headers['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static('public'));

app.post("/create", function(req, res) {
  generateWord().then((word) => {
    res.status(200).send(word);
  }).catch((e) => {
    res.status(404);
  });
});

app.post("/guess/:id", function(req, res) {
  var id = req.params.id;
  if(!ObjectId.isValid(id)) {
    return res.status(404).send({
      err: "invalid id"
    });
  }

  Word.findById(new ObjectId(id)).then((word) => {
    word.guess(_.pick(req.body, "input")).then((updatedWord) => {
      res.status(200).send(updatedWord);
    }).catch((e) => {
      res.status(403).send();
    });
  }).catch((e) => {
    res.status(404).send({
      error:"cannot update"
    });
  });
});

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
  console.log(process.env.NODE_ENV);
});
