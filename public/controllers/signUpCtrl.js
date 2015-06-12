angular.module('liveAPP.signup',['LiveAPP.factory'])
.controller('signUpCtrl', ['$scope','$http',signUpCtrl]);


function signUpCtrl($scope,$http){
  $scope.user = {
    email:'',
    password:''
  }
  
  $scope.postreq = function(user){
    $http({
          method: "post",
          url: "/signup",
          data:{
            user_username: user.email,
            user_password: user.password
          }      
      }).success(function(data){
        console.log("User posted to the database")
      });
};
}


