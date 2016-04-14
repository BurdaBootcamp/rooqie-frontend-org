
'use strict';
angular.module('app')
  .controller('LoadingCtrl', function($state, $ionicHistory, $window, UsersService){
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('onboarding-facebook');
      /*if(!$window.localStorage['access_token'] && !$window.localStorage['user_id']){
        $state.go('onboarding-welcome');
      } else {
        UsersService.getUser($window.localStorage['user_id'])
          .success(function() {
            $state.go('app.recommendations');
          })
          .error(function() {
            $window.localStorage['access_token'] = "";
            $window.localStorage['user_id'] = "";
            $state.go('login');
          });
      }*/
    }
  );
