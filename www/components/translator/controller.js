angular.module('translator.controllers')
.controller('TranslatorController', ['$scope', 'TranslatorServcie', function($scope, TranslatorServcie) {
  var i, that = this;
  this.op = {
    input: '',
    output: ''
  };

  this.translate = function() {
    if(this.op.input.substr(-1) !== ' ') { return; }
    if(this.op.input === '') {
      this.output = '';
      return;
    }

    var words = this.op.input.split(' ').slice(0, -1);

    TranslatorServcie.translate(words)
      .then(function(translatedWords) {
        that.op.output = translatedWords.join(' '); ;
      }, function(error) {
        console.log(error);
      });

  }
}]);
