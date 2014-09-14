//TODO clean this mess up

$(function() {
    var TOTAL_ROWS = 4;
    var TOTAL_COLS = 7;
    
    var wordbankHTML = buildWordBankInput(TOTAL_ROWS, TOTAL_COLS);
    $("#wordbank").append(wordbankHTML);

    $("#regen").click(function() {
        fetchAndApplyWords();
    });

    $("[id^=word_]").change(function(obj) {
        setCellByName(this.id, this.value);
    });

    function randomIntForRange(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function pickwords(wordList, rows, cols) {
        var wordArray = [];
        for(var i = 0; i < rows; i++) {
            var subArray = [];
            var tmpCols = cols;
            if (i % 2 == 1) {
               tmpCols -= 1;
            }
            for(var j = 0; j < tmpCols; j++) {
               var idx = randomIntForRange(0, wordList.length);
               subArray.push(wordList[idx]); 
            }
            wordArray.push(subArray);
        }
        return wordArray;
    }

    function setWordArray(wordAry) {
        for(var i = 0; i < wordAry.length; i++) {
            for(var j = 0; j < wordAry[i].length; j++) {3
                var wordname = makeWordName(i,j);
                var value = wordAry[i][j];
                setCellByName(wordname, wordAry[i][j]);
                $("#" + wordname).val(value);
            }
        }
    }

    function buildWordBankInput(maxRows, maxCols) {
        var wordbankHTML = "";
        for(var i = 0; i < maxRows; i++) {
           wordbankHTML += "<div>";
           var cols = maxCols;
           if (i % 2 == 1) {
               cols -= 1;
           }
           for(var j = 0; j < cols; j++) {
             var name = makeWordName(i,j);
             wordbankHTML += "<input " +
                  " type=\"text\" " +
                  " id=\"" + name + "\" " +
                  " maxlength=\"6\" " + 
                  ">";
           }
           wordbankHTML += "</div>";
        }
        return wordbankHTML;
    }

    function makeWordName(x,y) {
        return "word_" + x + "_" + y;
    }

    $(window).load(function() {
        fetchAndApplyWords();
    });

    function fetchAndApplyWords() {
        $.getJSON( "animals.json", {
            format: "json"
        }).done(function(data) {
            var wordAry = pickwords(data.words, TOTAL_ROWS, TOTAL_COLS);
            setWordArray(wordAry);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert('Error fetching word list:' + textStatus + ':' + errorThrown);
        });
    }

    function setCellText(row,col,value) {
        var wordId = "word_" + row + "_" + col;
        setCellByName(wordId, value);
    }

    function setCellByName(wordId, value) {
        var svgcard = $("#svgcard")[0];
        if (typeof svgcard === "undefined") {
            console.log ( 'Unable to find #svgcard.');
            return;
        }
        var doc = svgcard.contentDocument;
        if (typeof doc === "undefined") {
            console.log ( 'Unable to find #svgcard document.');
            return;
        }
        var word = doc.getElementById(wordId);
        if (word === null) {
            console.log ( 'Unable to find ' + wordId + ' in svg document.');
            return;
        }
        word.textContent = value;
    }

});
