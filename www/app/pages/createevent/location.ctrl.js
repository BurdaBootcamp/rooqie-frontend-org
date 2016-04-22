'use strict';
angular.module('app')
  .controller('CreateeventLocationCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window, Location, $cordovaGeolocation) {
    $scope.event = $stateParams.event;
    Location.find().$promise.then(function(allLocations) {
      $scope.locations = [];
      allLocations.forEach(function(location) {
        if (location.categories.indexOf($scope.event.category) !== -1) {
          $scope.locations.push(location);
        }
      })
      drawMap($scope.locations);
    });

    function drawMap(locationscontainer) {
      var options = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
        var latLng = new google.maps.LatLng(48.135153, 11.582741);

        var mapOptions = {
          center: latLng,
          liteMode: true,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10
          },
        };

        $scope.map = new google.maps.Map(document.getElementById("mapbox"), mapOptions);
        var rooqie_marker = 'img/icons/location_blue.svg';
        google.maps.event.addListenerOnce($scope.map, 'idle', function() {
          var locationLength = locationscontainer.length;
          for (var i = 0; i < locationLength; i++) {
            var marker = new google.maps.Marker({
              map: $scope.map,
              icon: rooqie_marker,
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng((locationscontainer[i]).lat, (locationscontainer[i]).lng)
            });
          }
        })
      }, function(error) {
        console.log("Could not get location");
      });
    };

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

    $scope.nextStep = function(locationId) {
      $scope.event.locationId = locationId;
      $state.go('createevent-description', {
        event: $scope.event
      });
    };
  });
