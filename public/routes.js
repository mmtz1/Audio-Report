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
                templateUrl:'/artistpage.html'
              })

              // $urlRouterProvider.otherwise('/')
});





// resolve: {
//   artists: function (artistsService) {
//     console.log('Resolve');
//     // return artistsService.get(); //'/artistsearch',//artistsService.get();
//   }
// }


// $routeProvider
//   .when('/', {
//     templateUrl : '/home.html',
//     controller  : 'mainCtrl'
//   })
//   .when('/signup',{
//     templateUrl : '/signup.html',
//     controller  : 'signUpCtrl'
//   })
//   .when('/artist/:artistname',{
//     templateUrl : '/artistpage.html',
//     controller  : 'artistCtrl'
//   })
//   .when('/review',{
//     templateUrl : '/review.html',
//     controller  : 'reviewCtrl'
//   })

// })

