angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http', '$location', '$rootScope', dataFactory])


function dataFactory($http, $location, $rootScope){
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
      month = reviews[i].concert_date.substring(5,7)
      year = reviews[i].concert_date.substring(2,4)
      day = reviews[i].concert_date.substring(8,10)
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
    return { avgRating: Number((sum/count).toFixed(1)), reviews:count };
  };

  dataFactory.artistInfoAPIs = function(artist){
    var artist = artist.artistname;
    return $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist")
  };


          // dataFactory.postTodb(dataFactory.artistInfo).success(function(){
            
          // })

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
    console.log("wiki",data)
    for(var i = 0; i < data.data.response.biographies.length; i++){
      if(data.data.response.biographies[i].site === 'wikipedia' && (data.data.response.biographies[i].text.indexOf("MIME") === -1)){
        return data.data.response.biographies[i].text.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join("");
      }
      else if (data.data.response.biographies[i].site === 'last.fm'){
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
  
  return dataFactory;

}


