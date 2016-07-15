'use strict';
angular.module('app')
  .controller('RecommendationsCtrl', function($rootScope, $scope, $stateParams, $window, Event, Account, $account) {
    $scope.events = [];
    $scope.showHelp = false;

    Event.find().$promise.then(function(events) {
        if(events.length > 0){
            events.forEach(function(event) {
              event.category = $rootScope.categories[event.category];
              var date = new Date(event.date);
              event.date = $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
              Event.accounts.count({id: event.id}).$promise.then(function(count) {
                  event.participantCount = count.count;
              });
            });
            $scope.events = events;
        }
    });

    $scope.onStart = function(event) {
        console.log('STARTING');
        return '1';
      };

      $scope.onStop = function(event) {
        console.log('ENDING');
        return '0';
      };

      $scope.toggleHelp = function() {
        $scope.showHelp = !$scope.showHelp;
        /*var picture = $('.jumbotron img');
        if (picture.is(':visible')) {
          return ($('body').data('chardinJs')).toggle();
        } else {
          return picture.animate({
            height: 250
          }, 600, function() {
            return ($('body').data('chardinJs')).toggle();
          });
        }*/
      };
  });
