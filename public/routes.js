angular.module('LiveAPP', ['ui.router',
                          'LiveAPP.main',
                          'LiveAPP.artist',
                          'LiveAPP.factory',
                          'liveAPP.review',
                          'LiveAPP.home',
                          'LiveAPP.LocalConcerts',
                          'LiveAPP.ArtistInfo',
                          'uiGmapgoogle-maps'
                          ])

.config(function($urlRouterProvider, $stateProvider, uiGmapGoogleMapApiProvider) {
$stateProvider.state('home', {
                url:'/',
                templateUrl: '/home.html',
                controller: 'homeCtrl',
                resolve: {
                  artists: function(dataFactory) {
                      return dataFactory.getRecentArtists();
                  }
                }      
              })
              .state('signup',{
                url: '/signup',
                templateUrl : '/signup.html',
                controller  : 'signUpCtrl'
              })
              .state('review',{
                url: '/review',
                controller: 'reviewCtrl',
                templateUrl: '/review.html'
              })
              .state('artist',{
                url: '/artist/:artistname',
                controller:'artistCtrl',
                templateUrl:'/artistpage.html',
                resolve: {
                  getArtist: function($stateParams, dataFactory, ArtistInfoFactory) {
                    return dataFactory.getArtist($stateParams.artistname).then(function(dbData) {
                      if(dbData.data != 'No data'){
                        return dbData;
                      } else {
                        return ArtistInfoFactory.getArtistInfo($stateParams)
                    }
                  })
                  },
                  getArtistUpcomingShows: function($stateParams,  LocalConcertsFactory) {
                    ArtistInfoFactory.upcomingConcerts = [];
                    return ArtistInfoFactory.getArtistId($stateParams).then(function(songKickResponse) {
                      return ArtistInfoFactory.getArtistConcerts(songKickResponse.data.resultsPage.results.artist[0].id).then(function(songKickConcerts){
                        return ArtistInfoFactory.parseConcerts(songKickConcerts)
                      })
                    })
                    
                  }
                }
              })
              .state('notfound',{
                url: '/notfound',
                templateUrl: 'NotFound.html'
              }) 

              $urlRouterProvider.otherwise('/')
});





