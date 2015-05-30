angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$scope','$http', '$location','dataFactory',mainCtrl]);

function mainCtrl($scope,$http,$location,dataFactory){
  $scope.getArtist = function(artist){
      dataFactory.ArtistfromSpotify(artist).success(function(data){
      console.log(data)
      console.log(data.artists.items[0].images[1].url)
      dataFactory.postTodb(data)
    })
  }
};

