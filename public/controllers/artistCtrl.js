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


function artistCtrl($scope, $http, $location, dataFactory, $routeParams){
    

    $scope.artistName = $routeParams.artistname
    

    $scope.$watch('artistName',function(newValue, oldValue){
      
      dataFactory.checkDb(newValue).then(function(dbData){
        console.log("THIS IS THE DATA",dbData.data)
        if(dbData.data != "No data"){
          $scope.artistInfo = dbData.data[0]
          $scope.reviews = dbData.data[1]
        } else{
          dataFactory.artistfromSpotify(newValue).then(function(spotifyRes){
              var artistMain = spotifyRes.data.artists.items[0]
              
              $scope.artistInfo.artist_genre = artistMain.genres[0] || "Music"
              $scope.artistInfo.artist_imageurl = artistMain.images[0].url || "" 
              $scope.artistInfo.artist_name = artistMain.name || ""
              
                dataFactory.artistBio($scope.artistInfo.artist_name).then(function(data){
                  $scope.artistInfo.artist_bio = dataFactory.findWiki(data)
                }).then(function(){
                  dataFactory.postTodb($scope.artistInfo)
                })
              })
            }
        }
      );
    });
    
    

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
    }

    $scope.reviews = ""


    



}


