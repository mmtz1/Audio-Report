angular.module('LiveAPP.signUp',[])
.controller('signUpCtrl', ['$scope','$http',signUpCtrl]);

function signUpCtrl($scope,$http){
  $scope.number = 100;

  $scope.user = {
    email:'',
    password:''
  }


  $scope.funcCheck = function(){
    console.log($scope.user)
  }
  $scope.postreq = function(){
    
    $http({
          method: "post",
          url: "/signup",
          data:{
            user_username:$scope.user.email,
            user_password:$scope.user.password
          }
          
      }).success(function(){
        console.log("User posted to the database")
      });
};
}


