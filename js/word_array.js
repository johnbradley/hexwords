var word_array = (function() {

  function createWordArray(maxRows, maxCols) {
    return {
      maxRows: maxRows,
      maxCols: maxCols,
      
      randomIntForRange: function(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
      },
      
      pickwords: function(wordList) {
        var wordArray = [];
        for(var i = 0; i < maxRows; i++) {
            var subArray = [];
            var tmpCols = maxCols;
            if (i % 2 === 1) {
               tmpCols -= 1;
            }
            for(var j = 0; j < tmpCols; j++) {
               var idx = this.randomIntForRange(0, wordList.length);
               subArray.push(wordList[idx]); 
            }
            wordArray.push(subArray);
        }
        this.wordArray = wordArray;
      },
      
      each: function(fn) {
        for(var i = 0; i < this.wordArray.length; i++) {
            for(var j = 0; j < this.wordArray[i].length; j++) {
                var value = this.wordArray[i][j];
                fn(i,j, value);
            }
        }
      }
    };
  }
 
  return {
    createWordArray: createWordArray
  };
})();
