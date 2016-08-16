angular.module('translator.services')
.service('TranslatorServcie', ['DictionaryServcie', 'x2js', function(DictionaryServcie, x2js) {

  this.countSyllables = function(word) {

    DictionaryServcie.getDefinitionRequest(word).then(function(response) {
      var jsonObj = x2js.xml_str2json(response.data);

      if(!angular.isDefined(jsonObj.entry_list.entry)){
        console.log('word', word);
        return word;
      } else {
        console.log('word', jsonObj.entry_list.entry[0].hw);
      }

    }, function(err) {
      console.log('err', err);
    });

    // console.log(xmlText);
    // var jsonObj = x2js.xml_str2json( xmlText );
    // console.log(jsonObj);
  }

}]);
