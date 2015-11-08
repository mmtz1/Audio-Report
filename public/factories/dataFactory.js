angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http', '$location', '$rootScope', '$q', dataFactory])

function dataFactory($http, $location, $rootScope, $q){
  var dataFactory = {};

  dataFactory.getRecentArtists = function() {
     return $http({
        method: 'GET',
        url: '/artistsearch',
        params: {getArtist: 'all'}
    }).then(function(recent) {
      return recent.data;
    })
  };

  dataFactory.getArtist = function(artist) {
    return $http({
      method: 'GET',
      url: '/artistsearch',
      params: {artistname: artist}
    })
  };

  dataFactory.postArtist = function (data) {
    return $http.post('/artistsearch', data);
  };

  
  dataFactory.postReview = function(data) {
    return $http.post('/reviews', data);
  };

  dataFactory.dateFormat = function(reviews){
    if(reviews === undefined){
      return '';
    }
    for(var i = 0; i < reviews.length; i++){
      month = reviews[i].concert_date.substring(5,7);
      year = reviews[i].concert_date.substring(2,4);
      day = reviews[i].concert_date.substring(8,10);
      reviews[i].concert_date = month + '/' + day + '/' + year
    }
    return reviews;
  }

  dataFactory.artistInformation = {};



  dataFactory.avgReview = function(reviews) {
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

  dataFactory.capitalLetter = function(genre){
    if(genre == 'undefined'){
      return '';
    }

    var wordArr = genre.split(' ');
    var newWord = [];

    for(var k in wordArr){
      var capital = wordArr[k].charAt(0).toUpperCase() + wordArr[k].slice(1);
      newWord.push(capital);
    }

    return newWord.join(' ');

  };

  dataFactory.reviewArtist = '';

  dataFactory.artistInfo = {
    artist_name: '',
    artist_genre: '',
    artist_imageurl: '',
    artist_bio: '',
  };

  return dataFactory;

}



