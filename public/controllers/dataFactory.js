angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http', '$location', '$rootScope', '$q', dataFactory])

function dataFactory($http, $location, $rootScope, $q){
  var dataFactory = {};

  dataFactory.getRecentArtists = function(){
     return $http({
        method: 'GET',
        url: '/artistsearch',
        params: {getArtist: "all"}
    }).then(function(recent){
      return recent.data;
    })
  };

  dataFactory.dateFormat = function(reviews){
    if(reviews === undefined){
      return "";
    }
    for(var i = 0; i < reviews.length; i++){
      month = reviews[i].concert_date.substring(5,7);
      year = reviews[i].concert_date.substring(2,4);
      day = reviews[i].concert_date.substring(8,10);
      reviews[i].concert_date = month + "/" + day + "/" + year
    }
    return reviews;
  }

  dataFactory.artistInformation = {};

  dataFactory.checkDb = function(artist){
    return $http({
      method: 'GET',
      url: '/artistsearch',
      params: {artistname: artist}
    })
  };

  dataFactory.avgReview = function(reviews){
    var sum = 0;
    var count = 0;

    for(var i = 0; i < reviews.length; i++){
      count++
      sum += reviews[i].number_of_stars;
    }

    return { 
      avgRating: Number((sum/count).toFixed(1)), 
      reviews: count 
    };
  };

  dataFactory.artistInfoSpotifyAPI = function(artist){
    var artist = artist.artistname;
    return $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist")
  };

  dataFactory.artistIdEchoNest = function(artistName) {
    return $http.get('https://developer.echonest.com/api/v4/artist/search?api_key=T0OOMWQVXVAFNUL14&name=' + artistName)    
  };

  dataFactory.capitalLetter = function(genre){
    if(genre == 'undefined'){
      return "";
    }

    var wordArr = genre.split(" ");
    var newWord = [];

    for(var k in wordArr){
      var capital = wordArr[k].charAt(0).toUpperCase() + wordArr[k].slice(1);
      newWord.push(capital);
    }

    return newWord.join(" ");

  };

  dataFactory.postTodb = function (data) {
    return $http.post('/artistsearch', data);
  };

  dataFactory.findWiki = function(data){
    for(var i = 0; i < data.data.response.biographies.length; i++){
      if(data.data.response.biographies[i].site === 'wikipedia' && (data.data.response.biographies[i].text.indexOf("MIME") === -1)){
        return data.data.response.biographies[i].text.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join("");
      }else if (data.data.response.biographies[i].site === 'last.fm'){
        var newest = data.data.response.biographies[i].text.toString().replace("There are two artists with this name.  1. ","")
        var finaldata = newest.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join("");
        return finaldata;
      }
    } 
  }
  
  dataFactory.postReview = function(data){
    return $http.post('/reviews',data);
  };

  dataFactory.reviewArtist = "";

  dataFactory.artistInfo = {
    artist_name: "",
    artist_genre: "",
    artist_imageurl: "",
    artist_bio: "",
  };

  dataFactory.dateParse = function(date){
    var dateObject ={}
    dateArr = date.split('-')
    var monthNames = {
      '01': "JAN", '02': "FEB", '03': "MAR", '04': "APR", '05': "MAY", 
      '06': "JUN", '07': "JUL", '08': "AUG", '09':  "SEP", '10': "OCT", 
      '11': "NOV", '12': "DEC"
    }
    
    dateObject.month = monthNames[dateArr[1]];
    dateObject.day = dateArr[2];
    dateObject.year = dateArr[0];
    return dateObject;
  }


  dataFactory.getArtistId = function(artistName){
    return $http.jsonp('http://api.songkick.com/api/3.0/search/artists.json?query='+ artistName.artistname + ' &apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK').success(function(data){ return data})
  };
  dataFactory.getArtistConcerts = function(artistId){
    return $http.jsonp('http://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK')
  }

  dataFactory.upcomingConcerts = []

  dataFactory.parseConcerts = function(response){
    var arrOfConcerts = response.data.resultsPage.results.event
    if(!arrOfConcerts){
      return {};
    }
    for(var i = 0; i < arrOfConcerts.length; i++){
      concert = {};
      concert.city = arrOfConcerts[i].location.city;
      concert.venue = arrOfConcerts[i].venue.displayName;
      concert.date = dataFactory.dateParse(arrOfConcerts[i].start.date);
      dataFactory.upcomingConcerts.push(concert);
    }
    console.log('concerts', dataFactory.upcomingConcerts)
    return dataFactory.upcomingConcerts;
  }

  dataFactory.getMetroArea = function(lat, lon){
    return $http.jsonp('https://api.songkick.com/api/3.0/search/locations.json?location=geo:'+ lat + ',' + lon + '&apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK')
  }


  dataFactory.getConcertsNearUser = function(metroId){
    return $http.jsonp('https://api.songkick.com/api/3.0/metro_areas/' + metroId + '/calendar.json?apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK')
  }      

  dataFactory.getAll = function(){
                    var q = $q.defer();
                    navigator.geolocation.getCurrentPosition(assignValues);
                    function assignValues(position) {
                      dataFactory.getMetroArea(position.coords.latitude, position.coords.longitude).then(function(data){
                        var metroLat = data.data.resultsPage.results.location[0].metroArea.lat
                        var metroLng = data.data.resultsPage.results.location[0].metroArea.lng
                        var metroId = data.data.resultsPage.results.location[0].metroArea.id
                        dataFactory.getConcertsNearUser(metroId).then(function(data){
                          events = data.data.resultsPage.results.event;
                          parsedEvent = [];
                          for (var i = 0; i < events.length; i++) {
                            concert = {};
                            for (var j = 0 ; j < events[i].performance.length; j++) {
                              if(events[i].performance.length === 1){
                                concert.eventHeadliner = events[i].performance[0].displayName;
                              } else {
                                if (events[i].performance[j].billing === 'headline') {
                                  concert.eventHeadliner  = events[i].performance[j].displayName;
                                } 
                              }
                            }
                            if (events[i].performance.length > 1) {
                              concert.performance = events[i].performance
                            }
                            concert.id = events[i].id;
                            concert.venue = events[i].venue.displayName;
                            concert.city = events[i].location.city;
                            concert.lat = events[i].location.lat;
                            concert.lng = events[i].location.lng;
                            concert.date = events[i].start.date;
                            concert.popularity = events[i].popularity;
                            parsedEvent.push(concert)
                          }

                          sortByPopularity = parsedEvent.sort(function(a,b){
                            return b.popularity - a.popularity
                          })
                          q.resolve({"closeEvents": sortByPopularity.slice(0,10), 'userLat': metroLat, 'userLng': metroLng})

                        })
                      })
                    }
                    return q.promise;
                  }

  dataFactory.showNav = false;
                    
  
  return dataFactory;

}



