angular.module('translator.services')
.service('SyllableServcie', ['x2js', function(x2js) {

  // http://stackoverflow.com/questions/33425070/how-to-calculate-syllables-in-text-with-regex-and-java;

  this.countSyllables = function(word) {
    var result = x2js.xml2json('<root>Hello xml2js!</root>')

    console.log(result);
  }

}]);
