angular.module('LiveAPP.artist',[])
.controller('artistCtrl', ['$scope', '$http', '$location', 'dataFactory', '$stateParams','getArtists', artistCtrl])

.directive("ratemain", function() {
    return {
        restrict: "A",
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            var $rateYoMain = $(ele).rateYo({
              readOnly: true,
              rating:scope.avgData.avgRating
            })
        }
      }
    })
.directive("ratereview", function() {
    return {
        restrict: "E",
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {
            
            var $rateYoMain = $(ele).rateYo({
              readOnly: true,
              rating:scope.review.number_of_stars,
              starWidth: "20px"
            })
        }
      }
    })

function artistCtrl($scope, $http, $location, dataFactory, $stateParams,getArtists){
    
    $scope.artistInfo =  getArtists.data[0];
    $scope.reviews = getArtists.data[1];
    $scope.avgData = dataFactory.avgReview($scope.reviews);
    
    $scope.reviewArtist = function(){
      dataFactory.reviewArtist = $scope.artistInfo.artist_name;
      $location.url("/review");
    };  
    
}


