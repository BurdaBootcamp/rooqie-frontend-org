'use strict';
angular.module('app')
  .controller('CreateeventDatepickerCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window){
    $scope.event = {
      time: '12:00',
      date: new Date(),
      duration: 2,
      maxParticipants: 5
    }
    console.log($scope.event);

    $scope.onezoneDatepicker = {
      date: new Date(),
      showTodayButton: false,
      hideSetButton: false,
      showDatepicker: true,
      hideCancelButton: true,
      hideSetButton: true
    };

    $scope.nextStep = function(preEvent) {
      var event = {};
      event.date = new Date(preEvent.date.toLocaleDateString() + " " + preEvent.time);
      event.duration = preEvent.duration;
      event.category = $stateParams.category;
      event.maxParticipants = preEvent.maxParticipants;
      $state.go('createevent-location', {event: event});
    };

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });
