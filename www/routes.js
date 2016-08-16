function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('translator', {
      url: '/translator',
      templateUrl: 'components/translator/index.html',
      controller: 'TranslatorController',
      controllerAs: 'TranslatorCtrl'
    });

  $urlRouterProvider.otherwise('/translator');
}
