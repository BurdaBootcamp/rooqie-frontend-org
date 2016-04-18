'use strict';
angular.module('app')
  .controller('EventdetailCtrl', function($rootScope, $scope, $ionicHistory, $stateParams, $window, Event, Location, Account, Participant, $cordovaGeolocation, $account) {
    $scope.event = {};
    Event.findById({
      id: $stateParams.id
    }).$promise.then(function(event) {
      event.category = $rootScope.categories[event.category];
      var date = new Date(event.date);
      event.date = $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
      Location.findById({
        id: event.locationId
      }).$promise.then(function(location) {
        event.location = location;
        drawMap(location);
        Event.accounts.count({
          id: event.id
        }).$promise.then(function(count) {
          event.remainingSpaces = event.maxParticipants - count.count;
        });
        $scope.event = event;
      });
    });
    Event.accounts({
      id: $stateParams.id
    }).$promise.then(function(accounts) {
      $scope.accounts = accounts;
    });

    Participant.participates({
      accountId: $account.id,
      eventId: $stateParams.id
    }).$promise.then(function(bool) {
      $scope.participates = bool.participates;
    });

    $scope.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function() {
          $ionicHistory.goBack()
        });
    };

    $scope.goBackEvents = function() {
      $ionicHistory.clearCache()
        .then(function() {
          $state.go('app.userevents');
        });
    };

    function drawMap(location) {
      var options = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
        var latLng = new google.maps.LatLng(location.lat, location.lng);
        var mapOptions = {
          center: latLng,
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
          var marker = new google.maps.Marker({
            map: $scope.map,
            icon: rooqie_marker,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(location.lat, location.lng)
          });
        })
      }, function(error) {
        console.log("Could not get location");
      });
    };
  })
  .controller('EventdetailLocationCtrl', function($rootScope, $scope, $sce, $ionicHistory, $stateParams, $window, Location, $cordovaGeolocation) {
    $scope.location = {};
    Location.findById({
      id: $stateParams.id
    }).$promise.then(function(location) {
      $scope.location = location;
      drawMap(location);
    });

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };

    function drawMap(location) {
      var options = {
        timeout: 10000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function(position) {
        var latLng = new google.maps.LatLng(location.lat, location.lng);
        var mapOptions = {
          center: latLng,
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
          var marker = new google.maps.Marker({
            map: $scope.map,
            icon: rooqie_marker,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(location.lat, location.lng)
          });
        })
      }, function(error) {
        console.log("Could not get location");
      });
    };

  })
  .controller('EventdetailDescriptionCtrl', function($rootScope, $scope, $sce, $ionicHistory, $stateParams, $window, Event) {
    $scope.event = {};
    Event.findById({
      id: $stateParams.id
    }).$promise.then(function(event) {
      event.category = $rootScope.categories[event.category];
      var date = new Date(event.date);
      event.date = $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
      $scope.event = event;
    });

    $scope.myGoBack = function() {
      $ionicHistory.goBack();
    };
  })
  .controller('EventjoinCtrl', function($scope, $rootScope, $ionicHistory, $state, $stateParams, $window, Event, Participant, $account) {
  $scope.created = $stateParams.created;
    var join = ($stateParams.join === 'true');
    if (join) {
      Event.join({
        accountId: $account.data.id,
        eventId: $stateParams.id
      }).$promise.then(function(result) {
        if (!result.accepted) {
          $state.go('eventdetail', {
            id: $stateParams.id
          });
        }
      });
    }

    Event.findById({
      id: $stateParams.id
    }).$promise.then(function(event) {
      event.category = $rootScope.categories[event.category];
      var date = new Date(event.date);
      event.date = $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
      $scope.event = event;
    });

    $scope.leaveEvent = function() {
      Participant.findOne({
        where: {
          eventId: $stateParams.id,
          participantId: $account.id
        }
      }).$promise.then(function(result) {
        Participant.deleteById({
          id: result.id
        }).$promise.then(function(result) {
          if (result.count == 1) {
            $state.go('eventleave', {
              id: $stateParams.id
            });
          }
        })
      });
    }

    $scope.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function() {
          $ionicHistory.goBack()
        });
    };
  })
  .controller('EventleaveCtrl', function($scope, $rootScope, $ionicHistory, $state, $stateParams, $window, EventsService, Event) {
    Event.findById({
      id: $stateParams.id
    }).$promise.then(function(event) {
      event.category = $rootScope.categories[event.category];
      var date = new Date(event.date);
      event.date = $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
      $scope.event = event;
    });

    $scope.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function() {
          $state.go('app.userevents');
        });
    };
  });
