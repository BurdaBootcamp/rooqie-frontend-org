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

    
  //   getCategoryLocations: function(category) {
		// var locationscontainer = [];
		// $http.get($rootScope.API_URL + '/locations?access_token=' + $window.localStorage['access_token'])
		// .success(function(result){
		// 	Array.prototype.contains = function(element){
  //   			return this.indexOf(element) > -1;
  //   		};
		// 	var resultLength = result.length;
		// 	for (var i = 0; i < resultLength; i++) {
		// 	    if ((result[i]).categories.contains(category)) {
		// 	    	locationscontainer.push(result[i]);
		// 	    }
		// 	};
  //     	})
  //     	.error(function(result){
  //       console.log(result);
  //     	});	
	 //  return locationscontainer;
    
  //   }
  };
});
