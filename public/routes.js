angular.module('LiveAPP', ['ngRoute','LiveAPP.main'])

.config(function($routeProvider, $httpProvider) {
$routeProvider
  .when('/', {
    templateUrl : '/someview.html',
    controller  : 'mainCtrl'
  })

});