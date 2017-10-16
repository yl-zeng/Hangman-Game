var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var {ObjectId} = require("mongodb");

mongoose.connect('mongodb://localhost/hangman');

var db = mongoose.connection;
db.once('open', function() {
  console.log("MongoDB connected");
})

var wordSchema = new Schema({
  word: {
    type: String,
    uppercase: true,
    required: true
  },
  count: Number,
  showcase: String,
  history: [String],
  done: Boolean,
  win: Boolean
});

wordSchema.statics.createWord = function(word) {

  var newWord = new Word({
    word,
    count: 0,
    showcase: "_ _ _ _ _ _ _ ",
    history: [],
    done: false,
    win: false
  });

  return newWord.save();
};

wordSchema.methods.guess = function(c) {
  var curr = this;
  var word = curr.word;
  var C = c.toUpperCase();

  if(C.length != 1 || C.charCodeAt(0) < 65 || C.charCodeAt(0) > 90)
    return Promise.reject("invalid input");

  if(curr.done)
    return Promise.reject("game already ended");

  if(curr.history.includes(C))
    return Promise.reject("try another guess");

  if(word.includes(C)) {
    var newShowcase = curr.showcase.split("");

    for(var i = 0; i < newShowcase.length; i++) {
      if(newShowcase[i] === '_' && word[i] === C) {
        newShowcase[i] = C;
      }
    }

    curr.showcase = newShowcase.join("");
  } else {
    curr.count += 1;
  }

  curr.history.push(C);

  if(curr.word === curr.showcase) {
    curr.win = true;
    curr.done = true;
  }

  if(curr.count >= 6) {
    curr.done = true;
  }

  return curr.save();
}

var Word = mongoose.model("Word", wordSchema);

module.exports = {
  Word
};

// Word.findById("59e0211e6053cb1ff40db866").then((word) => {
//
//   word.guess("Y").then((updatedWord) => {
//     console.log("updated word");
//     console.log(word);
//   }).catch((e) => {
//     console.log(e);
//   });
// });
