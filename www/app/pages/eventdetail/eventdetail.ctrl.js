'use strict';
angular.module('app')
  .controller('EventdetailCtrl', function($rootScope, $scope, $sce, $ionicHistory, $stateParams, $window, EventsService, LocationsService){
    $scope.fn = {};
    $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  var location_url = "https://www.google.de/maps/place/";
  var api_key = "&key=AIzaSyBszdFU1q5-KF6HEyf1fSsvLZnLHwZNo7s";
  var address = "Georgenhof/@48.1548658,11.5769643,17z/&output=embed";

    EventsService.getEvent($stateParams.id)
      .success(function(result){
        result.date = EventsService.resolveDateString(result.date);
        result.category = $rootScope.categories[result.category];;
        $scope.event = result;
        
        var eventsId = ($stateParams.id).toString();
        console.log(eventsId);

        EventsService.getLocationId(eventsId)
          .success(function(result) {
            result.url; 
            console.log(result.url);
            $scope.event.location = {src: result.url};
          });


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

    $scope.fn.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function(){
          $ionicHistory.goBack()
        });
    };
  });
