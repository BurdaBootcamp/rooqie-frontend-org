'use strict';
angular.module('app', ['ionic'])
  .config(function($stateProvider, $urlRouterProvider, $provide){
    $stateProvider
    .state('loading', {
      url: '/loading',
      template: '<ion-spinner style="text-align: center; margin-top: 50%;"></ion-spinner>',
      controller: 'LoadingCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/authentication/login.html',
      controller: 'LoginCtrl'
    })
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/layout/layout.html',
      controller: 'LayoutCtrl'
    })
    .state('app.userevents', {
      url: '/userevents',
      views: {
        'menuContent': {
          templateUrl: 'app/userevents/userevents.html',
          controller: 'UsereventsCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    }).state('eventdetail', {
      url: '/eventdetail/:id',
      templateUrl: 'app/eventdetail/eventdetail.html',
      controller: 'EventdetailCtrl'
    }).state('eventjoin', {
      url: '/eventjoin/:id/:join',
      templateUrl: 'app/eventjoin/eventjoin.html',
      controller: 'EventjoinCtrl'
    });
    $urlRouterProvider.otherwise('/loading');
  })
  .run(function($rootScope){
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
