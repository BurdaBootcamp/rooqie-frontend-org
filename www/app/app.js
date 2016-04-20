'use strict';
angular.module('app', ['ionic', 'onezone-datepicker', 'lbServices', 'ngCordova'])
  .factory('$account', function(Account) {
    var accountService = {};

    accountService.load = function() {
      Account.findById({
        id: 'me'
      }, function(v) {
        accountService.data = v;
      });
    };

    accountService.destroy = function() {
      accountService.data = null;
    };

    accountService.load();

    return accountService;
  })
  .factory('$facebookLogin', function($account) {
    return function() {
      //var url = 'http://localhost:3000/auth/facebook';
      var url = 'https://backend.rooqie.de/auth/facebook';

      var ref = window.open(url, '_blank', 'location=no');

      // For Cordova
      if (window.cordova) {
        ref.addEventListener('loadstop', function(ev) {
          if (ev.url.indexOf('/index.html') !== -1) {
            ref.close();
            $account.load();
          }
        });
      } else {
        // For `ionic serve --lab`. Wait for the user to close the window
        // and, when they do, check the server to see if they're now logged in.
        var interval = setInterval(function() {
          if (ref.closed) {
            $account.load();
            clearInterval(interval);
          }
        }, 100);
      }
    };
  })
  .config(function($stateProvider, $urlRouterProvider, $provide, $httpProvider) {
    $httpProvider.interceptors.push(function() {
      return {
        request: function(req) {
          // Transform **all** $http calls so that requests that go to `/`
          // instead go to a different origin, in this case localhost:3000
          if (req.url.charAt(0) === '/') {
            req.url = 'https://backend.rooqie.de' + req.url;
            //req.url = 'http://localhost:3000' + req.url;
            // and make sure to send cookies too
            req.withCredentials = true;
          }

          return req;
        }
      };
    });
    $stateProvider
      .state('loading', {
        url: '/loading',
        template: '<ion-spinner style="text-align: center; margin-top: 50%"></ion-spinner>',
        controller: 'LoadingCtrl'
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
      .state('eventdetail', {
        url: '/eventdetail/:id',
        templateUrl: 'app/pages/eventdetail/eventdetail.html',
        controller: 'EventdetailCtrl'
      })
      .state('eventdetail-description', {
        url: '/eventdetail/description/:id',
        templateUrl: 'app/pages/eventdetail/eventdetail-description.html',
        controller: 'EventdetailDescriptionCtrl'
      })
      .state('eventdetail-location', {
        url: '/eventdetail/location/:id',
        templateUrl: 'app/pages/eventdetail/eventdetail-location.html',
        controller: 'EventdetailLocationCtrl'
      })
      .state('eventjoin', {
        url: '/eventjoin/:id/:join/:created',
        templateUrl: 'app/pages/eventdetail/eventjoin.html',
        controller: 'EventjoinCtrl'
      })
      .state('eventleave', {
        url: '/eventleave/:id/:join',
        templateUrl: 'app/pages/eventdetail/eventleave.html',
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
      .state('createevent-datepicker', {
        url: '/createevent/datepicker/:category',
        templateUrl: 'app/pages/createevent/datepicker.html',
        controller: 'CreateeventDatepickerCtrl'
      })
      .state('createevent-location', {
        url: '/createevent/location',
        params: {
          event: null
        },
        templateUrl: 'app/pages/createevent/location.html',
        controller: 'CreateeventLocationCtrl'
      })
      .state('createevent-description', {
        url: '/createevent/description',
        params: {
          event: null
        },
        templateUrl: 'app/pages/createevent/description.html',
        controller: 'CreateeventDescriptionCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/pages/authentication/login.html',
        controller: 'LoginCtrl'
      })
      .state('error', {
        url: '/error',
        templateUrl: 'app/pages/layout/error.html',
        controller: 'ErrorCtrl',
        params: {
          error: null
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
        templateUrl: 'app/pages/onboarding/moved/moved.html',
        controller: 'OnboardingMovedCtrl'
      })
      .state('onboarding-city', {
        url: '/onboarding/city/:moved',
        templateUrl: 'app/pages/onboarding/city/city.html',
        controller: 'OnboardingCityCtrl'
      })
      .state('onboarding-facebook', {
        url: '/onboarding/facebook',
        params: {
          user: null
        },
        templateUrl: 'app/pages/onboarding/facebook/facebook.html',
        controller: 'OnboardingFacebookCtrl'
      })
      .state('onboarding-signup', {
        url: '/onboarding/signup',
        params: {
          user: null
        },
        templateUrl: 'app/pages/onboarding/signup/signup.html',
        controller: 'OnboardingSignupCtrl'
      })
      .state('onboarding-userdata', {
        url: '/onboarding/userdata',
        params: {
          user: null
        },
        templateUrl: 'app/pages/onboarding/userdata/userdata.html',
        controller: 'OnboardingUserdataCtrl'
      });
    $urlRouterProvider.otherwise('/loading');
  })
  .run(function($rootScope) {
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
    $rootScope.safeApply = function(fn) {
      var phase = this.$root ? this.$root.$$phase : this.$$phase;
      if (phase === '$apply' || phase === '$digest') {
        if (fn && (typeof(fn) === 'function')) {
          fn();
        }
      } else {
        this.$apply(fn);
      }
    };
  });
