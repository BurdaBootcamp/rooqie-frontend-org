'use strict';
angular.module('app')
.factory('LocationsService', function ($rootScope, $window, $http, $q) {
  return {
    getLocations: function() {
      return $http.get($rootScope.API_URL + '/locations?access_token=' + $window.localStorage['access_token']);
    },
    getLocation: function(locationId) {
      return $http.get($rootScope.API_URL + '/locations/' + locationId + '?access_token=' + $window.localStorage['access_token']);
    }
  };
});
