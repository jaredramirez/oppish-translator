angular.module('translator.services')
.service('TranslatorServcie', ['$q', 'x2js', 'DictionaryServcie', function($q, x2js, DictionaryServcie) {

  this.translate = function(words) {
    var deferred = $q.defer(),
        translatedWords = [],
        promises = [];

    for(word of words) {
      promises.push(DictionaryServcie.getDefinitionAsync(word));
    }

    $q.all(promises).then(function(responses) {
      for(index in responses){
        var jsonResponse = x2js.xml_str2json(responses[index].data);

        if(!angular.isDefined(jsonResponse.entry_list.entry)){
          translatedWords.push(words[index]);
        } else {
          var syllables = getSyllables(jsonResponse);
          var translatedWord = insertOp(syllables).join('');
          translatedWords.push(translatedWord);
        }
      }

      deferred.resolve(translatedWords);
    });

    return deferred.promise;
  }

  function getSyllables(jsonResponse) {
    var ref;
    if(jsonResponse.entry_list.entry[0] === undefined) {
      ref = jsonResponse.entry_list.entry;
    } else {
      ref = jsonResponse.entry_list.entry[0];
    }

    if(ref.hw.__text) {
      return [ref.hw.__text];
    } else {
      return ref.hw.split("*");
    }
  }

  function insertOp(syllables) {
    var translatedSyllables = [];
    for(syllable of syllables) {
      if(isEnglish(syllable)) {
        var i;
        for(i=0;i<syllable.length;i++) {
          if(isVowel(syllable.charAt(i))) {
            translatedSyllables.push(insert(syllable, i, 'op'));
            break;
          };
        }
      }
    }
    return translatedSyllables;
  }

  function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
  }

  function isEnglish(word) {
    var english = /^[A-Za-z0-9']*$/, i;

    if(!english.test(word)) {
      return false;
    } else {
      return true;
    }
  }

  function isVowel(c) {
    return ['a', 'e', 'i', 'o', 'u'].indexOf(c.toLowerCase()) !== -1
  }

}]);

/*

.then(function(response) {
  var jsonResponse = x2js.xml_str2json(response.data);
  console.log('jsonResponse', jsonResponse);

  if(!angular.isDefined(jsonResponse.entry_list.entry)){
    translatedWords.push({index: words.indexOf(word), word: word});
  } else {
    var syllables = getSyllables(jsonResponse);
    var translatedWord = insertOp(syllables).join('');
    translatedWords.push({index: words.indexOf(word), word: translatedWord});
  }
})

//uses $q.all
this.translate_old = function(words) {
  var deferred = $q.defer(),
      translatedWords = [],
      promises = [];

  console.log('words', words);
  angular.forEach(words, function(word){
    console.log('word', word);
    promises.push(
      DictionaryServcie.getDefinitionAsync(word).then(function(response) {
        var jsonResponse = x2js.xml_str2json(response.data);

        if(!angular.isDefined(jsonResponse.entry_list.entry)){
          console.log('translatedWord', word);
          translatedWords.push(word);
        } else {
          var syllables = getSyllables(jsonResponse);
          var translatedWord = insertOp(syllables).join('');
          console.log('translatedWord', translatedWord);
          translatedWords.push(translatedWord);
        }
      }
    ));
  });

  console.log('promises', promises);
  $q.all(promises).then(function() {
    console.log('translatedWords', translatedWords);
    deferred.resolve(translatedWords);
  });

  return deferred.promise;
}

//uses reduce
this.translate = function(words) {
  var deferred = $q.defer(),
      translatedWords = [],
      promises = [];

  angular.forEach(words, function(word){
    promises.push(
      {promise: DictionaryServcie.getDefinitionAsync(word), word: word}
    );
  });

  var chain = promises.reduce(function (previous, current) {
    return current.promise.then(function(response) {
      var jsonResponse = x2js.xml_str2json(response.data);

      if(!angular.isDefined(jsonResponse.entry_list.entry)){
        var array = previous.$$state.value;
        return current.word;
      } else {
        var syllables = getSyllables(jsonResponse);
        var translatedWord = insertOp(syllables).join('');

        return translatedWord
      }
    })
  }, $q.when([]));

  chain.then(function (lastValue) {
    console.log('lastValue', lastValue);
    deferred.resolve(translatedWords);
  });

  return deferred.promise;
}
*/
