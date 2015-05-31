angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$scope','$http', '$location','dataFactory',mainCtrl]);

function mainCtrl($scope,$http,$location,dataFactory){
  $scope.getArtist = function(artist){
      dataFactory.ArtistfromSpotify(artist).success(function(data){
      dataFactory.postTodb(data).success(function(datas){
        dataFactory.artistinfo = datas[0]
        $location.path('/artist')
      })
      
    })
  }
};

