angular.module('LiveAPP.main',[])
.controller('mainCtrl', ['$scope','$http', '$location',mainCtrl]);

function mainCtrl($scope,$http,$location){
  $scope.somefunc = function(artistname){


  $http.get("https://api.spotify.com/v1/search?q=" + artistname + "&type=artist")
  .success(function(data, status, headers, config) {
    $http.post('/artist',{
                          artist_name: data.artists.items[0].name,
                          artist_genre: data.artists.items[0].genres[0]
                        })
  }).
  error(function(data, status, headers, config) {
    console.log("there was an error")
  });







  }

};


