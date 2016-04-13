'use strict';
angular.module('app')
  .controller('EventdetailLocationCtrl', function($rootScope, $scope, $sce, $ionicHistory, $stateParams, $window, EventsService){
    EventsService.getLocation($stateParams.id)
      .success(function(result){
        console.log(result);
        $scope.location = result;
      })
      .error(function(result){
        console.log(result);
      });

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  });
