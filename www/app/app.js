'use strict';
angular.module('app', ['ionic', 'onezone-datepicker'])
  .config(function($stateProvider, $urlRouterProvider, $provide){
    $stateProvider
    .state('loading', {
      url: '/loading',
      template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
      controller: 'LoadingCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/pages/authentication/login.html',
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/pages/layout/layout.html',
      controller: 'LayoutCtrl'
    })
    .state('app.recommendations', {
      url: '/recommendations',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/recommendations/recommendations.html',
          controller: 'RecommendationsCtrl'
        }
      }
    })
    .state('app.userevents', {
      url: '/userevents',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/userevents/userevents.html',
          controller: 'UsereventsCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    })
    .state('app.interests', {
      url: '/onboarding/interests',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/onboarding/interests/interests.html',
          controller: 'InterestsCtrl'
        }
      }
    })

    .state('eventdetail', {
      url: '/eventdetail/:id',
      templateUrl: 'app/pages/eventdetail/eventdetail.html',
      controller: 'EventdetailCtrl'
    })
    .state('eventjoin', {
      url: '/eventjoin/:id/:join',
      templateUrl: 'app/pages/eventjoin/eventjoin.html',
      controller: 'EventjoinCtrl'
    })

    .state('selectlocation', {
      url: '/selectlocation/selectlocation/:category',
      templateUrl: 'app/pages/selectlocation/selectlocation.html',
      controller: 'SelectlocationCtrl'
    })

    .state('eventleave', {
      url: '/eventleave/:id/:join',
      templateUrl: 'app/pages/eventleave/eventleave.html',
      controller: 'EventleaveCtrl'
    })
    .state('app.createevent-categories', {
      url: '/createevent/categories',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/createevent/categories.html',
          controller: 'CreateeventCategoriesCtrl'
        }
      }
    })
    .state('app.createevent-datepicker', {
      url: '/createevent/datepicker/:category',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/createevent/datepicker.html',
          controller: 'CreateeventDatepickerCtrl'
        }
      }
    })
    .state('app.createevent-description', {
      url: '/createevent/description',
      params: {event: null},
      views: {
        'menuContent': {
          templateUrl: 'app/pages/createevent/description.html',
          controller: 'CreateeventDescriptionCtrl'
        }
      }
    })
    .state('app.imprint', {
      url: '/imprint',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/legal/imprint.html'
        }
      }
    })
    .state('app.dataprotection', {
      url: '/dataprotection',
      views: {
        'menuContent': {
          templateUrl: 'app/pages/legal/dataprotection.html'
        }
      }
    })
    .state('onboarding-welcome', {
      url: '/onboarding/welcome',
      templateUrl: 'app/pages/onboarding/welcome/welcome.html'
    })
    .state('onboarding-intro', {
      url: '/onboarding/intro',
      templateUrl: 'app/pages/onboarding/intro/intro.html'
    })
    .state('onboarding-moved', {
      url: '/onboarding/moved',
      templateUrl: 'app/pages/onboarding/moved/moved.html'
    })
    .state('onboarding-city', {
      url: '/onboarding/city',
      templateUrl: 'app/pages/onboarding/city/city.html'
    })
    .state('onboarding-facebook', {
      url: '/onboarding/facebook',
      templateUrl: 'app/pages/onboarding/facebook/facebook.html'
    });
    $urlRouterProvider.otherwise('/loading');
  })
  .run(function($rootScope){
    $rootScope.categories = {
      "trip": {
        "name": "Ausflug",
        "image": "img/categories/trip_sea.jpg"
      },
      "party": {
        "name": "Feiern",
        "image": "img/categories/cocktails.jpg"
      },
      "sightseeing": {
        "name": "Sightseeing",
        "image": "img/categories/trip_english_garden.jpg"
      },
      "breakfast": {
        "name": "Frühstück",
        "image": "img/categories/breakfast.png"
      },
      "sport": {
        "name": "Sport",
        "image": "img/categories/sports_foodball.jpg"
      },
      "tatort": {
        "name": "Tatort",
        "image": "img/categories/tatort.jpg"
      },
      "coffee": {
        "name": "Café",
        "image": "img/categories/coffee.jpg"
      },
      "cooking": {
        "name": "Kochen",
        "image": "img/categories/course_cooking.jpg"
      },
      "cinema": {
        "name": "Kino",
        "image": "img/categories/movienight.jpg"
      },
      "museum": {
        "name": "Museum",
        "image": "img/categories/museum.jpg"
      }
    };
    $rootScope.weekday = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    //$rootScope.URL = "http://localhost";
    $rootScope.URL = "http://ec2-52-58-3-95.eu-central-1.compute.amazonaws.com";
    $rootScope.PORT = "3000";
    $rootScope.PREFIX = "/api";
    $rootScope.API_URL = $rootScope.URL + ":" + $rootScope.PORT + $rootScope.PREFIX;
    $rootScope.safeApply = function(fn){
      var phase = this.$root ? this.$root.$$phase : this.$$phase;
      if(phase === '$apply' || phase === '$digest'){
        if(fn && (typeof(fn) === 'function')){
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  });
