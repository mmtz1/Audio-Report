angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http', dataFactory])


function dataFactory($http){
  dataFactory.ArtistfromSpotify = function(artist){
    console.log("ArtistfromSpotify")
    return $http.get("https://api.spotify.com/v1/search?q=" + artist + "&type=artist")
  }

  dataFactory.postTodb = function(data){
    return $http.post('/artistsearch', {
                                      artist_name:data.artists.items[0].name,
                                      artist_genre:data.artists.items[0].genres[0],  
                                      artist_img:data.artists.items[0].images[0].url
                                       })
  }

  dataFactory.artistinfo = "SHit";
  
  return dataFactory;

}


