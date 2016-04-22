'use strict';
angular.module('app')
  .controller('OnboardingFacebookCtrl', function($rootScope, $scope, $ionicHistory, $state, $account, $stateParams, $window, $facebookLogin){
    $scope.account = $account;
    $scope.state = 'facebook';

    $scope.login = function() {
        $facebookLogin();
    }

  });
