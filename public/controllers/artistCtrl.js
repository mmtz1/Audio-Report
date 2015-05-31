angular.module('LiveAPP.artist',[])
.controller('artistCtrl', ['$scope','$http', '$location','dataFactory',artistCtrl])

.directive("rateYo", function() {
    return {
        restrict: "A",
        scope: {
            rating: "="
        },
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            
            $(ele).rateYo({
                rating: scope.rating.number
            });
        }
    };
});


function artistCtrl($scope,$http, $location,dataFactory){
   $scope.myRating = {number:3}
   $scope.artistInfo = {
    name:dataFactory.artistinfo.artist_name,
    genre:dataFactory.artistinfo.artist_genre
  }

   

   $scope.console = function(){
    console.log(dataFactory.artistinfo.artist_name)
   }
   $scope.console();
}


