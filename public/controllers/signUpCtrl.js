angular.module('LiveAPP.signUp',[])
.controller('signUpCtrl', ['$scope','$http',signUpCtrl]);

function signUpCtrl($scope,$http){
  $scope.number = 100;
};


