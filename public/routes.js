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
                templateUrl: '/home.html',
                controller: 'homeCtrl',
                resolve: {
                    artists: function(dataFactory) {
                      return dataFactory.getRecentArtists();
                    }
                  }      
              })
              .state("signup",{
                url: "/signup",
                templateUrl : '/signup.html',
                controller  : 'signUpCtrl'
              })
              .state("review",{
                url: "/review",
                controller: "reviewCtrl",
                templateUrl: '/review.html'
              })
              .state("artist",{
                url: '/artist/:artistname',
                controller:"artistCtrl",
                templateUrl:'/artistpage.html',
                resolve: {
                  getArtists: function($stateParams, dataFactory,$http) {
                      return dataFactory.checkDb($stateParams.artistname).then(function(dbData){
                        if(dbData.data != "No data"){
                          return dbData;
                        } else {
                          return dataFactory.artistInfoAPIs($stateParams).then(function(data){
                                  var genre = data.data.artists.items[0].genres[0] || "";
                                  dataFactory.artistInfo.artist_genre = dataFactory.capitalLetter(genre);
                                  dataFactory.artistInfo.artist_imageurl = data.data.artists.items[0].images[0].url || "";
                                  dataFactory.artistInfo.artist_name = data.data.artists.items[0].name || "";
                                  
                                  return $http.get("https://developer.echonest.com/api/v4/artist/biographies?api_key=T0OOMWQVXVAFNUL14&name=" + dataFactory.artistInfo.artist_name).then(function(data){
                                    dataFactory.artistInfo.artist_bio = dataFactory.findWiki(data);
                                    dataFactory.postTodb(dataFactory.artistInfo).success(function(){
                                    })
                                    return dataFactory.artistInfo;
                                  });
                              })
                            }
                          })
                        }
                      }
                })

              $urlRouterProvider.otherwise('/')
});





