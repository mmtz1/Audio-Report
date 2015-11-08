angular.module('LiveAPP.ArtistInfo',[])
.factory('ArtistInfoFactory', ['$http', '$location', '$rootScope', '$q','dataFactory', ArtistInfoFactory])


function ArtistInfoFactory($http, $location, $rootScope, $q, dataFactory) {
  ArtistInfoFactory = {};

  ArtistInfoFactory.artistInfoSpotifyAPI = function(artist) {
    var artist = artist.artistname;
    return $http.get('https://api.spotify.com/v1/search?q=' + artist + '&type=artist')
  };

  ArtistInfoFactory.artistIdEchoNest = function(artistName) {
    return $http.get('https://developer.echonest.com/api/v4/artist/search?api_key=T0OOMWQVXVAFNUL14&name=' + artistName)    
  };

  ArtistInfoFactory.getArtistId = function(artistName) {
    return $http.jsonp('http://api.songkick.com/api/3.0/search/artists.json?query='+ artistName.artistname + ' &apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK').success(function(data){ return data})
  };
  ArtistInfoFactory.getArtistConcerts = function(artistId) {
    return $http.jsonp('http://api.songkick.com/api/3.0/artists/' + artistId + '/calendar.json?apikey=yAVnutMub1F9Xpe4&jsoncallback=JSON_CALLBACK')
  }

  ArtistInfoFactory.findWiki = function(data){
    var biographies = data.data.response.biographies;
    for (var i = 0; i < biographies.length; i++) {
      if (biographies[i].site === 'wikipedia' && (biographies[i].text.indexOf('MIME') === -1)) {
        return biographies[i].text.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join('');
      } else if (biographies[i].site === 'last.fm') {
        var newest = biographies[i].text.toString().replace('There are two artists with this name.  1. ','')
        var finaldata = newest.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join('');
        return finaldata;
      }
    } 
  }
  
  ArtistInfoFactory.getArtistInfo = function(artist){
    return ArtistInfoFactory.artistInfoSpotifyAPI(artist).then(function(data){
      artistInformation = data.data.artists.items[0]
      if(!artistInformation){
        return $location.url('/notfound')
      }
      var genre = artistInformation.genres[0] || '';
      ArtistInfoFactory.artistInfo.artist_genre = dataFactory.capitalLetter(genre);
      ArtistInfoFactory.artistInfo.artist_imageurl = artistInformation.images[0].url || '';
      ArtistInfoFactory.artistInfo.artist_name = artistInformation.name || '';
      return $http.get('http://developer.echonest.com/api/v4/artist/biographies?api_key=T0OOMWQVXVAFNUL14&name=' + ArtistInfoFactory.artistInfo.artist_name).then(function(data){
        ArtistInfoFactory.artistInfo.artist_bio =  ArtistInfoFactory.findWiki(data);
        dataFactory.postArtist(ArtistInfoFactory.artistInfo)
        return ArtistInfoFactory.artistInfo;
      })
    })
  }

  ArtistInfoFactory.upcomingConcerts = [];

  ArtistInfoFactory.parseConcerts = function(response) {
    var arrOfConcerts = response.data.resultsPage.results.event
    if (!arrOfConcerts) {
      return {};
    }

    for (var i = 0; i < arrOfConcerts.length; i++) {
      concert = {};
      concert.city = arrOfConcerts[i].location.city;
      concert.venue = arrOfConcerts[i].venue.displayName;
      concert.date = ArtistInfoFactory.dateParse(arrOfConcerts[i].start.date);
      ArtistInfoFactory.upcomingConcerts.push(concert);
    }
    
    return ArtistInfoFactory.upcomingConcerts;
  };

  ArtistInfoFactory.dateParse = function(date) {
    var dateObject ={};
    dateArr = date.split('-');
    var monthNames = {
      '01': 'JAN', '02': 'FEB', '03': 'MAR', '04': 'APR', '05': 'MAY', 
      '06': 'JUN', '07': 'JUL', '08': 'AUG', '09':  'SEP', '10': 'OCT', 
      '11': 'NOV', '12': 'DEC'
    };
    
    dateObject.month = monthNames[dateArr[1]];
    dateObject.day = dateArr[2];
    dateObject.year = dateArr[0];
    return dateObject;
  }

  ArtistInfoFactory.artistInfo = {
    artist_name: '',
    artist_genre: '',
    artist_imageurl: '',
    artist_bio: '',
  };

  return ArtistInfoFactory;

}