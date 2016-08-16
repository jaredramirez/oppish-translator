angular.module('translator.services')
.service('DictionaryServcie', ['$http', function($http) {
  var url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/',
      apiKey = 'e150a7a3-547b-450d-8cff-779db62499bd';

  this.getDefinitionRequest = function(word) {
    var requestURL = url;
    requestURL += (word + '?key=' + apiKey);

    return $http.get(requestURL);
  }

}]);
