'use strict';
angular.module('app')
  .controller('OnboardingMovedCtrl', function($scope, $rootScope, $ionicHistory, $state, $stateParams, $window){
    $scope.user = {};
    $scope.user.moved = "";
  });
