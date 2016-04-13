'use strict';
angular.module('app')
  .controller('EventjoinCtrl', function($scope, $rootScope, $ionicHistory, $state, $stateParams, $window, EventsService){
    $scope.fn = {};

    if($stateParams.join) {
      EventsService.join($stateParams.id)
        .success(function(result){
          //smth happens!
        })
        .error(function(result){
          console.log(result);
        });
    }

    EventsService.getEvent($stateParams.id)
      .success(function(result){
        result.date = EventsService.resolveDateString(result.date);
        result.category = $rootScope.categories[result.category];
        $scope.event = result;
      })
      .error(function(result){
        console.log(result);
      });

    $scope.leaveEvent = function() {
      EventsService.leave($stateParams.id)
        .success(function(result){
          $state.go('eventleave', {id: $stateParams.id});
        })
        .error(function(result){
          console.log(result);
        });
    }

    $scope.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function(){
          $ionicHistory.goBack()
        });
    };
  });
