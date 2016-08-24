angular.module('translator.services')
.service('TranslatorServcie', ['$q', 'DictionaryServcie', 'x2js', function($q, DictionaryServcie, x2js) {

  this.translate = function(words) {
    return $q(function(resolve, reject) {
      var translatedWords = '', promiseList = [];

      for(word of words) {
        console.log('word', word)
        promiseList.push(
          DictionaryServcie.getDefinitionAsync(word).then(function(response) {
            var jsonResponse = x2js.xml_str2json(response.data);

            if(!angular.isDefined(jsonResponse.entry_list.entry)){
              translatedWords += (word + ' ');
              console.log('1', word);
            } else {
              var syllables = getSyllables(jsonResponse);
              var translatedWord = insertOp(syllables).join('');
              console.log('2', translatedWord);

              translatedWords += (translatedWord + ' ');
            }
          }
        ));
      }

      $q.all(promiseList).then(function(successResponse){
        resolve(translatedWords);
      }, function(errorResponse){
        reject(errorResponse);
      });
    });
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
