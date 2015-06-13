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
    return $http.post('/artistsearch', {
                                      artist_name: data.artists.items[0].name,
                                      artist_genre: data.artists.items[0].genres[0],  
                                      artist_imageurl: data.artists.items[0].images[0].url,
                                      artist_bio: data.artistBio
                                       });
  }

  dataFactory.findWiki = function(data){
    for(var i = 0; i < data.response.biographies.length; i++){
      if(data.response.biographies[i].site === 'wikipedia'){
          return data.response.biographies[i].text;
      }
    }
  }


  dataFactory.postReview = function(data){
    return $http.post('/reviews',data)
  }

  dataFactory.getArtist = function(artist){ 
    return dataFactory.checkDb(artist).then(function(caca){
      console.log(caca)
      if(caca.data != "No data"){
        dataFactory.artistinfo = caca.data.pop()
        dataFactory.artistReviews = caca.data
        $location.url("/artist/" + dataFactory.artistinfo.artist_name)
      }
      return caca.data;
    }).then(function(data){
      console.log("THIS SHOULD NOT BE no data",data)
      if(data === "No data"){
        console.log("API WAS HIT")
        dataFactory.hitAPI(artist);
      } else{
        $location.url("/artist/" + dataFactory.artistinfo.artist_name)
      }
    })
  }


  dataFactory.hitAPI = function(artist){
      
      dataFactory.artistfromSpotify(artist).success(function(data){
        console.log("SPOTIFY DATA",data)
        dataFactory.artistInformation = data;
        
        dataFactory.artistBio(data.artists.items[0].name).success(function(data){
          console.log("BIO DATA",data)
          dataFactory.artistInformation.artistBio = dataFactory.findWiki(data);

          dataFactory.postTodb(dataFactory.artistInformation).success(function(dbData){  
            dataFactory.checkDb(dbData).success(function(data){
              console.log("THIS IS THE FINAL", data)
              dataFactory.artistinfo = data[0]    
            }).then(function(){
              console.log("alldone getting info")
              $location.url("/artist/" + artist)
            })
          })
        })   
      })
    }





  dataFactory.reviewArtist = "";

  dataFactory.artistinfo = "";
  
  return dataFactory;

}


