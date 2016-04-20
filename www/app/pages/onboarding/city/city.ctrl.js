'use strict';
angular.module('app')
  .controller('OnboardingCityCtrl', function($scope, $rootScope, $ionicHistory, $state, $stateParams, $window){
    $scope.user = {};
    var movedDate = new Date();
    movedDate.setDate(movedDate.getDate() - (30 * $stateParams.moved));
    $scope.user.moved = movedDate;
    $scope.user.movedMonth = $stateParams.moved;

    $scope.nextStep = function(user) {
        if(user.city == "München") {
            $state.go('onboarding-userdata', {user: user});
        } else {
            $state.go('onboarding-sorry', {city: user.city})
        }
    };
  });
