angular.module('LiveAPP', [
                          'ngRoute',
                          'LiveAPP.main',
                          'LiveAPP.artist',
                          'liveAPP.signup',
                          'LiveAPP.factory',
                          'liveAPP.review'
                          ])

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
  .when('/artist/:artistname',{
    templateUrl : '/artistpage.html',
    controller  : 'artistCtrl'
  })
  .when('/review',{
    templateUrl : '/review.html',
    controller  : 'reviewCtrl'
  })

})

