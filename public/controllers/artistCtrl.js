angular.module('LiveAPP.artist',[])
.controller('artistCtrl', ['$scope','$http', '$location','dataFactory','$routeParams',artistCtrl])

.directive("rateYo", function() {
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
              });  
        }
    };
});


function artistCtrl($scope,$http, $location,dataFactory,$routeParams){
    
    $scope.artistName = $routeParams.artistname
    
    dataFactory.getArtist($scope.artistName)
    

    $scope.myRating = {
      number:3
    };

    $scope.artistInfo = {
      name: dataFactory.artistinfo.artist_name,
      genre: dataFactory.artistinfo.artist_genre,
      image: dataFactory.artistinfo.artist_imageurl,
      bio: dataFactory.artistinfo.artist_bio
    };

    $scope.somefunc = function(){
      dataFactory.reviewArtist = $scope.artistInfo.name
      $location.url("/review")
    }






}


