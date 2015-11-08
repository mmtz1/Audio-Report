angular.module('LiveAPP.LocalConcerts',[])
.factory('LocalConcertsFactory', ['$http', '$location', '$rootScope', '$q', LocalConcertsFactory])


function LocalConcertsFactory($http, $location, $rootScope, $q){

  LocalConcertsFactory = {};

  LocalConcertsFactory.getMetroArea = function(lat, lon){
    return $http.jsonp('https://api.songkick.com/api/3.0/search/locations.json?location=geo:'+ lat + ',' + lon + '&apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK')
  }

  LocalConcertsFactory.getConcertsNearUser = function(metroId){
    return $http.jsonp('https://api.songkick.com/api/3.0/metro_areas/' + metroId + '/calendar.json?apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK')
  }      

  LocalConcertsFactory.sortPopularConcerts = function(events){
    var sortedEvents = events.sort(function(a,b){
      return b.popularity - a.popularity
    })
    
    return sortedEvents.slice(0, 10)
  }

  LocalConcertsFactory.parseConcertsNearUser = function(events){
    parsedEvent = [];

    for (var i = 0; i < events.length; i++) {
      concert = {};
      for (var j = 0 ; j < events[i].performance.length; j++) {
        if(events[i].performance.length === 1) {
          concert.eventHeadliner = events[i].performance[0].displayName;
        } else {
          if (events[i].performance[j].billing === 'headline') {
            concert.eventHeadliner  = events[i].performance[j].displayName;
          } 
        }
      }
      if (events[i].performance.length > 1) {
        concert.performance = events[i].performance;
      }
      concert.id = events[i].id;
      concert.venue = events[i].venue.displayName;
      concert.city = events[i].location.city;
      concert.lat = events[i].location.lat;
      concert.lng = events[i].location.lng;
      concert.date = events[i].start.date;
      parsedEvent.push(concert);
    }

    return parsedEvent;
  }

  LocalConcertsFactory.getUserLocation = function() {
    var q = $q.defer();
    navigator.geolocation.getCurrentPosition(assignValues);
    function assignValues(position) {
      LocalConcertsFactory.getMetroArea(position.coords.latitude, position.coords.longitude).then(function(songKickResponse){
        var location = songKickResponse.data.resultsPage.results.location[0]
        q.resolve({'metroId': location.metroArea.id, 'userLat': location.metroArea.lat, 'userLng': location.metroArea.lng})
      })
    }
    return q.promise;
  }

  return LocalConcertsFactory;
};
