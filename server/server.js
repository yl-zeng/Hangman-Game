var express = require('express');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;
var {generateWord} = require("./utils/util");

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

// app.post("/guess/", function(req, res) {
//
// });

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
  console.log(process.env.NODE_ENV);
});
