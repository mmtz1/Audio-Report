angular.module('LiveAPP', ['ngRoute','LiveAPP.main','LiveAPP.signUp'])

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

});