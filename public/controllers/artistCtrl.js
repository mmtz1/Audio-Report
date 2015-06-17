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
                scope.rating.number = data;
              });  
        }
    };
});


function artistCtrl($scope, $http, $location, dataFactory, $routeParams){
    
    $scope.artistName = $routeParams.artistname;

    $scope.$watch( 'artistName', function( newValue, oldValue ) {
      dataFactory.checkDb( newValue ).then(function(dbData){
        if(dbData.data != "No data"){
          $scope.artistInfo = dbData.data[0];
          $scope.reviews = dbData.data[1];
        } else{
          dataFactory.artistInfoAPIs(newValue)

        }
    })
    });
    
    $scope.$on('artist:updated', function(event,data){
      console.log("THERE WAS A CHANGE HERE'S THERE DATA",data)
      $scope.artistInfo = data
    })


    $scope.myRating = {
      number:3
    };
    
    $scope.artistInfo = {
      artist_name: dataFactory.artistInfo.artist_name,
      artist_genre: dataFactory.artistInfo.artist_genre,
      artist_imageurl: dataFactory.artistInfo.artist_imageurl,
      artist_bio: dataFactory.artistInfo.artist_bio
    };

    $scope.somefunc = function(){
      dataFactory.reviewArtist = $scope.artistInfo.artist_name
      $location.url("/review")
    };

    $scope.reviews = "";

}


