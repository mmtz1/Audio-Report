angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http','$location', '$rootScope',dataFactory])


function dataFactory($http,$location,$rootScope){
  var dataFactory = {};

  dataFactory.artistInformation = {};

  dataFactory.checkDb = function(artist){
     return $http({
        method: 'GET',
        url: '/artistsearch',
        params: {artistname: artist}
    })
  };



  dataFactory.artistInfoAPIs = function(artist){
    return $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist").success(function(data){
      var capitalLetter = function(genre){
          if(genre === ""){
              return "";
          }

          var wordArr = genre.split(" ");
          var newWord = [];

          for(var k in wordArr){
              var capital = wordArr[k].charAt(0).toUpperCase() + wordArr[k].slice(1)
              newWord.push(capital)
          }

          return newWord.join(" ")
      }

        dataFactory.artistInfo.artist_genre = capitalLetter(data.artists.items[0].genres[0]) || "";
        dataFactory.artistInfo.artist_imageurl = data.artists.items[0].images[0].url || "";
        dataFactory.artistInfo.artist_name = data.artists.items[0].name || "";
        
        return $http.get("https://developer.echonest.com/api/v4/artist/biographies?api_key=T0OOMWQVXVAFNUL14&name=" + artist).success(function(data){
          dataFactory.artistInfo.artist_bio = dataFactory.findWiki(data);
          
          dataFactory.postTodb(dataFactory.artistInfo).success(function(){
            $rootScope.$broadcast('artist:updated',dataFactory.artistInfo);
          })
        });
    })
  };


  dataFactory.postTodb = function(data){
    console.log("THIS IS THE DATA WE ARE POSTING",data)

    return $http.post('/artistsearch', data);
  };

  dataFactory.findWiki = function(data){
    for(var i = 0; i < data.response.biographies.length; i++){
      if(data.response.biographies[i].site === 'wikipedia'){
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


