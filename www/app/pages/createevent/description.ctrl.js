'use strict';
angular.module('app')
  .controller('CreateeventDescriptionCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window, EventsService, LocationsService){
    $scope.fn = {};
    $scope.event = $stateParams.event;
    $scope.event.description = "";
    $scope.event.categoryName = $scope.event.category;
    $scope.event.category = $rootScope.categories[$scope.event.category];

    LocationsService.getLocation($scope.event.locationId)
      .success(function(result){
        $scope.event.location = result;
      })
      .error(function(result){
        console.log(result);
      })

    $scope.createEvent= function(event){
      event.name = event.category.name + ", " + event.location.name;
      EventsService.createEvent(event)
        .success(function(result) {
          console.log(result);
          $state.go('eventjoin', {id: result.id, join: true});
        })
        .error(function(result) {
          console.log(result);
        })
    }

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });
