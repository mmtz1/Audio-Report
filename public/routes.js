angular.module('LiveAPP', [
                          'ngRoute',
                          'LiveAPP.main',
                          'LiveAPP.artist',
                          'liveAPP.signup',
                          'LiveAPP.factory'
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
  .when('/artist',{
    templateUrl : '/artistpage.html',
    controller  : 'artistCtrl'
  })
})

angular.module('LiveAPP').factory('dataFactory', ['$http', dataFactory])


function dataFactory($http){
  dataFactory.ArtistfromSpotify = function(artist){
    $http.get("https://api.spotify.com/v1/search?q=" + artistname + "&type=artist")
  }
  return dataFactory;
}