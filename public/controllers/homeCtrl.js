angular.module('LiveAPP.home',['LiveAPP.factory'])
.controller('homeCtrl', ['$rootScope','$scope','$http', '$location','dataFactory','artists', homeCtrl])

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


function homeCtrl($rootScope,$scope,$http,$location,dataFactory,artists){
  
  $scope.recentArtist = dataFactory.dateFormat(artists);
  $scope.somefunc = function(artist){
    $location.url("/artist/" + artist)
  }
  


}    
