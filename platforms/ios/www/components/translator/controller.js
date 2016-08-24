angular.module('translator.controllers')
.controller('TranslatorController', ['$scope', 'TranslatorServcie', function($scope, TranslatorServcie) {
  var i, that = this;
  this.op = {
    input: '',
    output: ''
  };

  this.translate = function() {
    if(that.op.input === '') {
      that.op.output = '';
      return;
    }

    var words = that.op.input.split(' ');
    if(words.length === 0) {
      words = [that.op.input];
    }
    console.log('words', words);

    TranslatorServcie.translate(words)
      .then(function(translatedWords) {
        that.op.output = translatedWords.join(' '); ;
      }, function(error) {
        console.log(error);
      });

  }
}]);
