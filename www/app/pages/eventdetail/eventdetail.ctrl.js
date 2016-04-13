'use strict';
angular.module('app')
  .controller('EventdetailCtrl', function($rootScope, $scope, $sce, $ionicHistory, $stateParams, $window, EventsService){
    $scope.fn = {};

    EventsService.getEvent($stateParams.id)
      .success(function(result){
        result.date = EventsService.resolveDateString(result.date);
        result.category = $rootScope.categories[result.category];;
        $scope.event = result;
        EventsService.getLocation($scope.event.id)
          .success(function(result) {
            $scope.event.location = result;
            $scope.event.location = {src: result.mapurl};
            EventsService.getParticipants($stateParams.id)
              .success(function(result){
                $scope.users = result;
                $scope.event.remainingSpaces = ($scope.event.maxParticipants - result.length);
                EventsService.participates($stateParams.id)
                  .success(function(result){
                    $scope.participates = result.participates;
                  })
                  .error(function(result){
                    console.log(result);
                  });
              })
              .error(function(result){
                console.log(result);
              });
          })
          .error(function(result){
            console.log(result);
          });
      })
      .error(function(result){
        console.log(result);
      });


    $scope.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function(){
          $ionicHistory.goBack()
        });
    };

    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
  });
