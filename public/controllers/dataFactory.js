angular.module('LiveAPP.factory',[])
.factory('dataFactory', ['$http','$location', dataFactory])


function dataFactory($http,$location){
  var dataFactory = {};

  dataFactory.artistInformation = {};

  dataFactory.checkDb = function(artist){
     return $http({
        method: 'GET',
        url: '/artist/' + artist,
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
    return $http.post('/artistsearch', data);
  }

  dataFactory.findWiki = function(data){
    
    for(var i = 0; i < data.data.response.biographies.length; i++){
      if(data.data.response.biographies[i].site === 'wikipedia'){
          return data.data.response.biographies[i].text.match( /[^\.!\?]+[\.!\?]+/g ).splice(0,4).join("");;
      }
    }
  }


  dataFactory.postReview = function(data){
    return $http.post('/reviews',data)
  }

  dataFactory.getArtist = function(artist){   
    return dataFactory.checkDb(artist).then(function(dbData){
      if(dbData.data != "No data"){
          dataFactory.artistInfo = dbData.data
      } 
      return dbData.data
    })
  }


  dataFactory.hitAPI = function(artist){
      dataFactory.artistfromSpotify(artist).success(function(data){
        console.log("SPOTIFY DATA",data)
        dataFactory.artistInformation = data;
        
        dataFactory.artistBio(data.artists.items[0].name).success(function(data){
          dataFactory.artistInformation.artistBio = dataFactory.findWiki(data);
          })
        })   
    }





  dataFactory.reviewArtist = "";

  dataFactory.artistInfo = "";
  
  return dataFactory;

}


