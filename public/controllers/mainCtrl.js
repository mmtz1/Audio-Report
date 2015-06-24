angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$scope','$http', '$location','dataFactory',mainCtrl]);

function mainCtrl($scope,$http,$location,dataFactory){

  $scope.getArtist = function(artist){
    $location.url("/artist/" + artist);
  };

  $scope.getRecentArtists = function(){
     return $http({
        method: 'GET',
        url: '/artistsearch',
        params: {getArtist: "all"}
    }).then(function(recent){
      
      $scope.recentArtist = recent.data
      
    })
  };

  $scope.recentArtist = ""

  $scope.getRecentArtists();


}    





    




