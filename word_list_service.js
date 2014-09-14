var word_list_service = (function() {
  var word_filename = "animals.json";
    
  function fetchWords(config) {
        $.getJSON( word_filename, {
            format: "json"
        }).done(function(data) {
            config.success(data.words);
        }).fail(function(_, _, errorThrown) {
            config.failure('Error fetching word list:' + errorThrown + '.');
        });
  }

  return {
    fetchWords: fetchWords
  };
})();


