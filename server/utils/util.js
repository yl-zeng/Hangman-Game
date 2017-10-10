var _ = require("lodash");


var generateWord = function() {
  return new Promise((resolve, reject) => {
    var word = "";

    for(var i = 0; i < 7; i++) {
      word += String.fromCharCode(_.random(65, 90));
    }

    resolve("haha");
  });
}

generateWord().then((data) => {
  console.log(data);
});
