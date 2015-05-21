angular.module('LiveAPP', ['ngRoute',
                          'LiveAPP.main',
                          'LiveAPP.signUp',
                          'LiveAPP.artist'])

.config(function($routeProvider, $httpProvider) {
$routeProvider
  .when('/', {
    templateUrl : '/home.html',
    controller  : 'mainCtrl'
  })
  .when('/signup',{
    templateUrl : '/signup.html',
    controller  : 'signUpCtrl'
  })
  .when('/artist',{
    templateUrl : '/artistpage.html',
    controller  : 'artistCtrl'
  })
})
