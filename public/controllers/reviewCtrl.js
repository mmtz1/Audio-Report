angular.module('liveAPP.review',['LiveAPP.factory'])
.controller('reviewCtrl', ['$scope','$http','dataFactory','$location',reviewCtrl])

.directive("rateYoReview", function() {
    return {
        restrict: "A",
        scope: {
            rating: "="
        },
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            var $rateYo = $(ele).rateYo({});
            $rateYo.on("rateyo.change", function (e, data) {
                scope.rating.number = data
                $scope.rating = data
              });  
        }
    };
});


function reviewCtrl($scope,$http,dataFactory,$location){
  $scope.rating = "";
  $scope.therating = {
    number:2
  };

  $scope.review = {
    user_name: "",
    venue: "",
    artist_name: dataFactory.reviewArtist,
    number_of_stars: ""
  }


  

  
  $scope.reviewSubmission = function(review){
    $scope.review.number_of_stars = $scope.therating.number.rating;
    
    dataFactory.postReview($scope.review).success(function(lastArtist){
    
    })
  }

  
}








