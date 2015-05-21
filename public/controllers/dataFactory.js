angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http', dataFactory])


function dataFactory($http){
  dataFactory.ArtistfromSpotify = function(artist){
    $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist")
  }
  return dataFactory;
}