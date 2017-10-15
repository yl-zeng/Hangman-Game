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
  history: [String]
});

wordSchema.statics.createWord = function(word) {
  var newWord = new Word({
    word,
    count: 0,
    showcase: "_ _ _ _ _ _ _ ",
    history: []
  });

  return newWord.save();
};

wordSchema.methods.guess = function(c) {
  var curr = this;
  var word = curr.word;
  var C = c.toUpperCase();

  if(curr.count >= 9) {
    return Promise.reject("game already ended");
  }

  curr.count += 1;
  curr.history.push(c);
  var newShowcase = "";

  for(var i = 0; i < word.length; i++) {
    if(word[i] === C) {
      newShowcase += C + " ";
    }else {
      newShowcase += "_ ";
    }
  }

  curr.showcase = newShowcase;

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
