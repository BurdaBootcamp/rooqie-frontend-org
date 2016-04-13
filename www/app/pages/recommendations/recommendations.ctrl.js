'use strict';
angular.module('app')
  .controller('RecommendationsCtrl', function($rootScope, $scope, $stateParams, $window, EventsService){
    $scope.events = [];
    $scope.fn = {};

    EventsService.getMatchingEvents($window.localStorage['user_id'])
      .success(function(result){
        result = result.events;
        result.forEach(function(event){
          event.date = EventsService.resolveDateString(event.date);
          event.category = $rootScope.categories[event.category];
          EventsService.getParticipantCount(event.id)
            .success(function(result) {
              event.participantCount = result.count;
            })
            .error(function(result){
              console.log(result);
            });
        });
        $scope.events = result;
      })
      .error(function(result){
        console.log(result);
      });
  });
