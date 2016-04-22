'use strict';
angular.module('app')
  .controller('CreateeventDescriptionCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window, Event, Location) {
    $scope.event = $stateParams.event;
    $scope.event.categoryName = $scope.event.category;
    $scope.event.category = $rootScope.categories[$scope.event.category];

    Location.findById({
      id: $scope.event.locationId
    }).$promise.then(function(location) {
      $scope.event.location = location;
    });

    $scope.nextStep = function() {
      $scope.event.name = $scope.event.category.name;
      $scope.event.category = $scope.event.categoryName;
      $scope.event.date = new Date($scope.event.date);
      Event.create({
          name: $scope.event.name,
          date: $scope.event.date,
          description: $scope.event.description,
          category: $scope.event.category,
          maxParticipants: $scope.event.maxParticipants,
          locationId: $scope.event.locationId,
          duration: $scope.event.duration
      }).$promise.then(function(result) {
        $state.go('eventjoin', {
          id: result.id,
          join: true,
          created: true
        });
      });
    };

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });
