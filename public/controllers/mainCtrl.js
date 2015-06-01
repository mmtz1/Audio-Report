angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$scope','$http', '$location','dataFactory',mainCtrl]);

function mainCtrl($scope,$http,$location,dataFactory){
  $scope.getArtist = function(artist){
    $location.path('/artist/' + artist)
    dataFactory.checkDb(artist).success(function(data){
      console.log(data)
      if (data != "No data"){

        dataFactory.artistinfo = data
        
      }
      
      else{
      dataFactory.artistfromSpotify(artist).success(function(data){
        console.log("spotify data",data)
        dataFactory.artistInformation = data;

        dataFactory.artistBio(data.artists.items[0].name).success(function(data){
          console.log("echo data",data)
          dataFactory.artistInformation.artistBio = data.response.biographies[0].text;
          
          dataFactory.postTodb(dataFactory.artistInformation).success(function(dbData){
            console.log("This is the data returned by database",dbData)
            dataFactory.artistinfo = dbData[0]
            
            
        })
      })  
    })
  }
  })

  }
};

