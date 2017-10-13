var mongoose = require("mongoose");
var Schema = mongoose.Schema;

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
    showcase: "_______",
    history: []
  });

  return newWord.save();
};


var Word = mongoose.model("Word", wordSchema);

module.exports = {
  Word
};

// Word.createWord("EEE").then((data) => {
//   console.log("successfully create word");
//   console.log(data._id);
// }).catch((e) => {
//   console.log("something wrong");
// });
