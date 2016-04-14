'use strict';
angular.module('app')
  .controller('RecommendationsCtrl', function($rootScope, $scope, $stateParams, $window, Event, Account, $account) {
    $scope.events = [];
    Event.find().$promise.then(function(events) {
        events.forEach(function(event) {
          event.category = $rootScope.categories[event.category];
          var date = new Date(event.date);
          event.date = $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
          Event.accounts.count({id: event.id}).$promise.then(function(count) {
              event.participantCount = count.count;
          });
        });
        $scope.events = events;
    });
  });
