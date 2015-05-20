angular.module('LiveAPP.artist',[])
.controller('artistCtrl', ['$scope',function($scope){
  $scope.myRating = 
  {number:3}
}])
.directive("rateYo", function() {
    return {
        restrict: "A",
        scope: {
            rating: "="
        },
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            console.log(scope.rating.number)
            $(ele).rateYo({
                rating: scope.rating.number
            });
        }
    };
});
