angular.module('LiveAPP.main',[])
.controller('mainCtrl', ['$scope','$http', mainCtrl]);

function mainCtrl($scope,$http){
  $scope.Artists = [
                    {name:"Blink 182",age:14},
                    {name:"Led Zeppelin",age:12},
                    {name:"Lil Wayne",age:11}
                    ];
  $scope.number = 100;
  $scope.postreq = $http({
                          method: "post",
                          url: "/",
                          data: {
                              name: "shit"
                          }
                          });
}

