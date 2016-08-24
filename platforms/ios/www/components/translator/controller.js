angular.module('translator.controllers')
.controller('TranslatorController', ['$scope', 'TranslatorServcie', function($scope, TranslatorServcie) {
  var i;
  this.output = '';

  this.translate = function() {
    if(this.input.substr(-1) !== ' ') { return; }

    var words = this.input.split(' ').slice(0, -1);
    TranslatorServcie.translate(words).then(function(translatedWords) {
      console.log('translatedWords', translatedWords);
      this.output = translatedWords;
    }, function(error) {

    });
  }
}]);



/*
var i;
this.output = '';

this.translate = function() {
  if(this.input.substr(-1) !== ' ') { return; }
  var words = this.input.split(' ').slice(0, -1), translatedWords = '', i;

  for(i=0;i<words.length;i++) {
    if(isEnglish(words[i])) {

      TranslatorServcie.translateWord(words[i]).then(function(translatedWord) {
        console.log('translatedWord', translatedWord);
        translatedWords += (translatedWord + ' ');
      });

    } else {
      translatedWords += (words[i] + ' ');
    }
  }

  this.output = translatedWords;
}

function isEnglish(word) {
  var english = /^[A-Za-z0-9]*$/, i;

  if(!english.test(word)) {
    return false;
  } else {
    return true;
  }
}
*/
