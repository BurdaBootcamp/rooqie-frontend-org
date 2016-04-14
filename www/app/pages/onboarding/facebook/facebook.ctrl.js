'use strict';
angular.module('app')
  .controller('OnboardingFacebookCtrl', function($rootScope, $scope, $ionicHistory, $state, $account, $stateParams, $window, $facebookLogin){
    $scope.account = $account;
    $scope.facebookLogin = $facebookLogin;
  });
