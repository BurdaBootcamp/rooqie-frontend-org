'use strict';
angular.module('app')
  .controller('EventdetailDescriptionCtrl', function($rootScope, $scope, $sce, $ionicHistory, $stateParams, $window, EventsService){
    EventsService.getEvent($stateParams.id)
      .success(function(result){
        result.date = EventsService.resolveDateString(result.date);
        result.category = $rootScope.categories[result.category];;
        $scope.event = result;
      })
      .error(function(result){
        console.log(result);
      });

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });
