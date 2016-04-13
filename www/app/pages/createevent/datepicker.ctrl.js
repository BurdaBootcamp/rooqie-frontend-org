'use strict';
angular.module('app')
  .controller('CreateeventDatepickerCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window){
    $scope.fn = {};

    $scope.event = {
      time: '12:00',
      date: new Date(),
      duration: 2,
      maxParticipants: 5
    }

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
      //TODO: have to getted selected
      event.locationId = "570bf5425a8ebc0717cb9d33";
      $state.go('app.createevent-description', {event: event});
    };

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });
