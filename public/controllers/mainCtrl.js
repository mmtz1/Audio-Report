angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$rootScope', '$scope', '$http', '$location', 'dataFactory', mainCtrl])


function mainCtrl($rootScope, $scope, $http, $location, dataFactory){
  $scope.getArtist = function(artist){ 
    $location.url("/artist/" + artist);
  };
     
  $scope.artist = ''
  
}    


    




