
'use strict';
angular.module('app')
  .controller('LoadingCtrl', function($state, $ionicHistory, $window){
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('onboarding-welcome');
    }
  );
