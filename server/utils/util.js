var _ = require("lodash");

var Word = require("./../db/db.js").Word;


var generateWord = function() {
  var word = "";

  for(var i = 0; i < 7; i++) {
    word += String.fromCharCode(_.random(65, 90)) + " ";
  }

  return Word.createWord(word);
}



module.exports = {
  generateWord,
};
