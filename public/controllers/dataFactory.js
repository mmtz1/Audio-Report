angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http', '$location', '$rootScope', dataFactory])


function dataFactory($http, $location, $rootScope){
  var dataFactory = {};

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
    return $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist").success(function(data){
        var genre = data.artists.items[0].genres[0] || ""
        dataFactory.artistInfo.artist_genre = dataFactory.capitalLetter(genre);
        dataFactory.artistInfo.artist_imageurl = data.artists.items[0].images[0].url || "";
        dataFactory.artistInfo.artist_name = data.artists.items[0].name || "";
        
        return $http.get("https://developer.echonest.com/api/v4/artist/biographies?api_key=T0OOMWQVXVAFNUL14&name=" + dataFactory.artistInfo.artist_name).success(function(data){
          dataFactory.artistInfo.artist_bio = dataFactory.findWiki(data);
          dataFactory.postTodb(dataFactory.artistInfo).success(function(){
            $rootScope.$broadcast('artist:updated',dataFactory.artistInfo);
          })
        });
    })
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
    
    for(var i = 0; i < data.response.biographies.length; i++){
      if(data.response.biographies[i].site === 'wikipedia' && (data.response.biographies[i].text.indexOf('jpeg') != -1)){
          return data.response.biographies[i].text.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join("");

      }
      else if(data.response.biographies[i].site === 'last.fm'){
        return data.response.biographies[i].text.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join("");
      } 
    }
  };


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


