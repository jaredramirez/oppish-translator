angular.module('translator', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('translator', {
      url: '/translator'
    })
    .state('translator.english', {
      url: '/english',
      templateUrl: 'components/english/index.html'
    });

  $urlRouterProvider.otherwise('/translator/english');
});
