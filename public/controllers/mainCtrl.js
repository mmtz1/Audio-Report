angular.module('LiveAPP.main',['LiveAPP.factory'])
.controller('mainCtrl', ['$scope','$http', '$location','dataFactory',mainCtrl]);

function mainCtrl($scope,$http,$location,dataFactory){
  $scope.getArtist = function(artist){
    
    dataFactory.checkDb(artist).success(function(data){
      if (data != "No data"){
        console.log("Data was already in database",data[0])
        dataFactory.artistinfo = data[0]
        $location.path("/artist/" + artist)
      
      }
      else{
      dataFactory.artistfromSpotify(artist).success(function(data){
        console.log("spotify data",data)
        dataFactory.artistInformation = data;

        dataFactory.artistBio(data.artists.items[0].name).success(function(data){
          console.log("echo data",data)
          dataFactory.artistInformation.artistBio = data.response.biographies[0].text;
          
          dataFactory.postTodb(dataFactory.artistInformation).success(function(dbData){
            dataFactory.checkDb(dbData).success(function(data){
              console.log("DATA from database after insertion",data[0])
              dataFactory.artistinfo = data[0]
              console.log("datafactorydata", dataFactory.artistinfo)
            }).then(function(){$location.path("/artist/" + artist)})
          })
        })  
      })
    }
    })

  }
};

