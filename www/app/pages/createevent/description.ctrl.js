'use strict';
angular.module('app')
  .controller('CreateeventDescriptionCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window, Event, Location) {
    $scope.event = {};
    $scope.event = $stateParams.event;
    console.log($scope.event);
    $scope.event.categoryName = $scope.event.category;
    $scope.event.category = $rootScope.categories[$scope.event.category];

    Location.findOne({
      id: $scope.event.locationId
    }).$promise.then(function(location) {
      $scope.event.location = location;
    });

    $scope.nextStep = function() {
      console.log($scope.event);
      $scope.event.name = $scope.event.category.name;
      $scope.event.category = $scope.event.categoryName;
      Event.create($scope.event).$promise.then(function(result) {
        $state.go('eventjoin', {id: result.id, join: false, created: true});
      });
    };

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });
