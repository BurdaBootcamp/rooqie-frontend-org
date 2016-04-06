'use strict';
angular.module('app')
  .controller('UsereventsCtrl', function($rootScope, $scope, $stateParams, $window, EventsService){
    $scope.events = [];

    EventsService.getUserEvents($window.localStorage['user_id'])
      .success(function(result){
        result.forEach(function(event){
          event.date = EventsService.resolveDateString(event.date);
          event.category = $rootScope.categories[event.category];
        });
        $scope.events = result;
      })
      .error(function(result){
        console.log(result);
      });
  });
