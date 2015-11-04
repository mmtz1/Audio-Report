angular.module('LiveAPP.home',['LiveAPP.factory'])
.controller('homeCtrl', ['$rootScope', '$scope', '$http', '$location', 'dataFactory', 'artists', 'uiGmapGoogleMapApi', homeCtrl])

.directive('ratehome', function(){
  return {
    restrict:"E",
    template: "<div id='rateYo'></div>",
    link: function(scope, ele, attrs){
      $(ele).rateYo({
        readOnly: true,
        rating: scope.artist.number_of_stars,
        starWidth: "20px"
      })
    }
  }
})


.directive('googlemap', function(dataFactory){
  return {
    restrict: 'E',
    template: '<div id="map" style="width: 85%; height: 300px;"></div>',
    replace: true,
    link: function(scope, el, attrs){
      el.append('<div class="col-sm-12"><img style="width: 85%; height: 300px;" src="https://d13yacurqjgara.cloudfront.net/users/63485/screenshots/1136567/earth-gif-preloader.gif"></div>')
      var listOfEvents;
      dataFactory.getAll().then(function(data){
        googleMapsData = data;
        scope.googleData = data;
        var mapCanvas = document.getElementById('map');
        var map = new google.maps.Map(mapCanvas, {
          zoom: 12,
          center: new google.maps.LatLng(googleMapsData.userLat, googleMapsData.userLng)
        });      

        for(var i = 0; i < googleMapsData.closeEvents.length; i++){
          var concertInfo =  '<h4><strong>' + googleMapsData.closeEvents[i].eventHeadliner  + '</strong></h4>' +
              '<p>' + googleMapsData.closeEvents[i].venue + '</p>' + 
              '<p>' + googleMapsData.closeEvents[i].date + '</p>' + 
              '<p>' + googleMapsData.closeEvents[i].city + '</p>' 
          var myinfowindow = new google.maps.InfoWindow({
            content: concertInfo
          });


          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(googleMapsData.closeEvents[i].lat, googleMapsData.closeEvents[i].lng),
            infowindow: myinfowindow
          })

          google.maps.event.addListener(marker, 'click', function() {
            this.infowindow.open(map, this);
          });
          
          marker.setMap(map)
        }
      })
    }
  }
})


function homeCtrl($rootScope, $scope, $http, $location, dataFactory, artists, uiGmapGoogleMapApi){
  $scope.recentArtist = dataFactory.dateFormat(artists);

  $scope.takeToArtistPage = function(artist){
    $location.url("/artist/" + artist);
  }
  
  $scope.googleData = ''

  $scope.getArtist = function(artist) {
    $location.url("/artist/" + artist);
  }

  $scope.showLineup = false;

}