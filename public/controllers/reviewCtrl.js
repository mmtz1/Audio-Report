angular.module('liveAPP.review',['LiveAPP.factory'])
.controller('reviewCtrl', ['$scope','$http','dataFactory',reviewCtrl])

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




function reviewCtrl($scope,$http,dataFactory){
  $scope.rating = "";
  $scope.therating = {
    number:2
  };

  $scope.review = {
    user_name:"",
    venue:"",
    artist_name:dataFactory.reviewArtist,
    number_of_stars:""
  }

  
  $scope.reviewSubmission = function(review){
    console.log($scope.therating.number.rating)
    $scope.review.number_of_stars = $scope.therating.number.rating;
    console.log($scope.review)
    dataFactory.postReview($scope.review)

  }

  
  
}

