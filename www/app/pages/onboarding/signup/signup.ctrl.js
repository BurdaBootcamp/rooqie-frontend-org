'use strict';
angular.module('app')
  .controller('OnboardingSignupCtrl', function($scope, $rootScope, $ionicHistory, $state, $stateParams, $window){
    $scope.user = $stateParams.user;
  });
