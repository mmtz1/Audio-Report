angular.module('LiveAPP.main',[])
.controller('mainCtrl', ['$scope', mainCtrl]);

function mainCtrl($scope){
  $scope.Artists = [
                    {name:"Blink 182",age:14},
                    {name:"Led Zeppelin",age:12},
                    {name:"Lil Wayne",age:11}
                    ];
  $scope.number = 100;
}