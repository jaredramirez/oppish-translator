angular.module('translator.controllers')
.controller('TranslatorController', ['$scope', function($scope) {
  var i;
  this.output = '';

  this.translate = function() {
    if(this.input.substr(-1) !== ' ') { return; }
    var words = this.input.split(' ').slice(0, -1), translatedWords = '', i;

    for(i=0;i<words.length;i++) {
      if(isEnglish(words[i])) {
        var translatedWord = words[i] + '!';
        translatedWords += (translatedWord + ' ');
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
}]);
