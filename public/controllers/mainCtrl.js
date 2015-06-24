angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$rootScope','$scope','$http', '$location','dataFactory',mainCtrl])

.directive('ratehome',function(){
  return {
    restrict:"E",
    template: "<div id='rateYo'></div>",
    link: function(scope, ele, attrs){
      
        $(ele).rateYo({
              readOnly: true,
              rating:scope.artists.number_of_stars
        })
    }
  }
})


function mainCtrl($rootScope,$scope,$http,$location,dataFactory){

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
      $rootScope.$broadcast('artistLoaded');
      
    })
  };

  $scope.recentArtist = ""

  $scope.getRecentArtists();

  $scope.$watch('recentArtist',function(newValue,oldValue){
    
    $scope.recentArtist = newValue
  })


}    


    




