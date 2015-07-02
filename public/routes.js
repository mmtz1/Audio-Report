angular.module('LiveAPP', ['ui.router',
                          'LiveAPP.main',
                          'LiveAPP.artist',
                          'liveAPP.signup',
                          'LiveAPP.factory',
                          'liveAPP.review',
                          'LiveAPP.home'
                          ])

.config(function($urlRouterProvider, $stateProvider) {
$stateProvider.state("home", {
                url:"/",
                templateUrl : '/home.html',
                controller  : 'homeCtrl',
                resolve: {
                    artists: function (dataFactory) {
                      return dataFactory.getRecentArtists();
                    }
                  }      
              })

              .state("signup",{
                url:"/signup",
                templateUrl : '/signup.html',
                controller  : 'signUpCtrl'
              })
              .state("review",{
                url:"/review",
                controller:"reviewCtrl",
                templateUrl:'/review.html'
              })
              .state("artist",{
                url:'/artist/:artistname',
                controller:"artistCtrl",
                templateUrl:'/artistpage.html',
                resolve:{
                  getArtists: function($stateParams,dataFactory){
                          
                          return dataFactory.checkDb($stateParams.artistname).then(function(dbData){
                            console.log(dbData)
                            if(dbData.data != "No data"){
                              return dbData
                            } else{
                              return dataFactory.artistInfoAPIs(newValue);
                            }
                          })
                  }
                }
              })

              $urlRouterProvider.otherwise('/')
});





