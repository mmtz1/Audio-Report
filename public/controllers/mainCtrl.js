angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$scope','$http', '$location','dataFactory',mainCtrl]);

function mainCtrl($scope,$http,$location,dataFactory){

  $scope.getArtist = function(artist){
    $location.url("/artist/" + artist);
  }

}    





    




