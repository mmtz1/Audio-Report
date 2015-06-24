angular.module('liveAPP.review',['LiveAPP.factory'])
.controller('reviewCtrl', ['$scope','$http','dataFactory','$location',reviewCtrl])

.directive("rating", function() {
    return {
        restrict: "E",
        scope: {
            rating: "="
        },
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            scope.$parent.rating
            var $rateYo = $(ele).rateYo({
              halfStar: true,
              rating:0
            });
            

            $rateYo.on("rateyo.change", function (e, data) {
              scope.$parent.rating = $rateYo.rateYo("rating");
              });  
        }
    };
})

.directive("datepicker", function() {
    return {
      restrict: "E",
      template: '<input type="text" id="datepicker" class="form-control review">',
      link: function( scope, ele, attrs ){
        var date = $('#datepicker').datepicker({onClose: function(selectedDate) {
          scope.review.review_date = selectedDate
        }});
        
      }
  }      
})

function reviewCtrl($scope,$http,dataFactory,$location){
  $scope.rating = "";
  $scope.therating = {
    number:2
  };

  $scope.review = {
    user_name: "",
    venue: "",
    artist_name: dataFactory.reviewArtist,
    number_of_stars: "",
    review_date:""
  
  };

  
  $scope.reviewSubmission = function(review){
    $scope.review.number_of_stars = $scope.rating;
    dataFactory.postReview($scope.review).success(function(lastArtist){
      $location.url('/artist/' + lastArtist);
    })
  };
  
}








