angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http', dataFactory])


function dataFactory($http){
  var dataFactory = {};

  dataFactory.artistInformation = {}

  dataFactory.checkDb = function(artist){
     return $http({
        method: 'GET',
        url: '/artistsearch',
        params: {artistname: artist}
    })
  };



  dataFactory.artistfromSpotify = function(artist){
    return $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist");
  }

  dataFactory.artistBio = function(artist){
    return $http.get("http://developer.echonest.com/api/v4/artist/biographies?api_key=T0OOMWQVXVAFNUL14&name=" + artist);
  }

  dataFactory.postTodb = function(data){
    return $http.post('/artistsearch', {
                                      artist_name:data.artists.items[0].name,
                                      artist_genre:data.artists.items[0].genres[0],  
                                      artist_imageurl:data.artists.items[0].images[0].url,
                                      artist_bio:data.artistBio
                                       });
  }

  dataFactory.artistinfo = "";
  
  return dataFactory;

}


