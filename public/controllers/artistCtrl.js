angular.module('LiveAPP.artist',[])
.controller('artistCtrl', ['$scope', '$http', '$location', 'dataFactory', '$stateParams', artistCtrl])

.directive("ratestar", function() {
    return {
        restrict: "E",
        template: "<div id='rateYo'></div>",
        link: function( scope, ele, attrs ) {

          
          if(scope.reviews === undefined){
            var $rateYoMain = $(ele).rateYo({
              readOnly: true,
              rating:5
            })
          }else{
            var $rateYo = $(ele).rateYo({
              starWidth: "20px",
              rating:scope.review.number_of_stars,
              readOnly: true
            });
          }
        }
 
        }
    })

function artistCtrl($scope, $http, $location, dataFactory, $stateParams){
    
    $scope.artistName = $stateParams.artistname;
    console.log('artist controller bitch')


    $scope.$watch( 'artistName', function( newValue, oldValue ) {
      
      dataFactory.checkDb( newValue ).then(function(dbData){
        if(dbData.data != "No data"){
          $scope.stars = dataFactory.avgReview(dbData.data[1]);
          $scope.artistInfo = dbData.data[0];
          $scope.reviews = dbData.data[1];
          

        } else{
          dataFactory.artistInfoAPIs(newValue);
        }
      })
    });
    
    // $scope.ratingInfo = {
    //   avgRating:"",
    //   reviews:""
    // }
    
 

    $scope.$on('artist:updated', function(event, data){
      $scope.artistInfo = data;
    });

    
    
    
    $scope.artistInfo = {
      artist_name: dataFactory.artistInfo.artist_name,
      artist_genre: dataFactory.artistInfo.artist_genre,
      artist_imageurl: dataFactory.artistInfo.artist_imageurl,
      artist_bio: dataFactory.artistInfo.artist_bio
    };

    $scope.reviewArtist = function(){
      dataFactory.reviewArtist = $scope.artistInfo.artist_name;
      $location.url("/review");
    };  
    
}


