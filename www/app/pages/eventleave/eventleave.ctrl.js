'use strict';
angular.module('app')
  .controller('EventleaveCtrl', function($scope, $rootScope, $ionicHistory, $state, $stateParams, $window, EventsService){
    EventsService.getEvent($stateParams.id)
      .success(function(result){
        result.date = EventsService.resolveDateString(result.date);
        result.category = $rootScope.categories[result.category];
        $scope.event = result;
      })
      .error(function(result){
        console.log(result);
      });

    $scope.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function(){
          $state.go('app.userevents');
        });
    };
  });
