function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('english', {
      url: '/english',
      templateUrl: 'components/english/index.html'
    });

  $urlRouterProvider.otherwise('/english');
}
