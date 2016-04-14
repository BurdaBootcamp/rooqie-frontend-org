'use strict';
angular.module('app')
  .controller('UsereventsCtrl', function($rootScope, $scope, $stateParams, Account, Event) {
    $scope.events = [];

    //TODO: Aufräumen des CSS's Codes und Lösung bauen, die überall läuft

    Account.events({
      id: 'me'
    }).$promise.then(function(events) {
      events.forEach(function(event) {
        event.category = $rootScope.categories[event.category];
        var date = new Date(event.date);
        event.date = $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
      });
      $scope.events = events;
    });

  });
