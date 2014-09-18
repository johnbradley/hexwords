$(function() {
    var MAX_ROWS = 4;
    var MAX_COLS = 7;
    var wordArray = word_array.createWordArray(MAX_ROWS, MAX_COLS);
    
    //fetch the word list once the svg has loaded
    $(window).load(function() {
        fetchAndApplyWords();
    });    
    
    $("#regen").click(function() {
        fetchAndApplyWords();
    });
    
    function onWordArrayLoaded() {
        var wordbankHTML = buildWordBankInput();
        var wordbank = $("#wordbank");
        wordbank.empty();
        wordbank.append(wordbankHTML);
        $("[id^=word_]").change(function() {
            setCellByName(this.id, this.value);
        });
        $("[id^=word_]").keyup(function() {
            setCellByName(this.id, this.value);
        });
        setWordArray();
    }

    function setWordArray() {
        wordArray.each(function(i, j, value) {
            var wordname = makeWordName(i,j);
            setCellByName(wordname, value);
            $("#" + wordname).val(value);            
        });
    }

    function buildWordBankInput() {
        var wordbankHTML = "<div>";
        wordArray.each(function(i, j) {
            var newRow = j === 0 && i !== 0;
            if (newRow) {
                wordbankHTML += "</div><div>";
            }
            var name = makeWordName(i,j);
            wordbankHTML += makeInputHTML(name);
        });
        wordbankHTML += "</div>";
        console.log(wordbankHTML);
        return wordbankHTML;
    }
    
    function makeInputHTML(name) {
        return "<input " +
                  " type=\"text\" " +
                  " id=\"" + name + "\" " +
                  " style=\"text-align:center\" size=\"8\" maxlength=\"6\" " + 
                  ">";
    }

    function makeWordName(x,y) {
        return "word_" + x + "_" + y;
    }

    function fetchAndApplyWords() {
        word_list_service.fetchWords({
            success: function(words) {
                wordArray.pickwords(words);
                onWordArrayLoaded();
            },
            failure: function(msg) {
                alert(msg);
            }            
        });
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
