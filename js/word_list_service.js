var word_list_service = (function() {
    
  function fetchWords(config) {
        config.success(AnimalWords);
  }

  return {
    fetchWords: fetchWords
  };
})();


