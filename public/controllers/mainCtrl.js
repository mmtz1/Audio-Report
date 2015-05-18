angular.module('LiveAPP.main',[])
.controller('mainCtrl', ['$scope','$http', '$location',mainCtrl]);

function mainCtrl($scope,$http,$location){
  // $scope.path = $location.path('/signup')
  $scope.postreq = $http({
                          method: "post",
                          url: "/",
                          data: {
                              name: "shit"
                          }
                          });
}

