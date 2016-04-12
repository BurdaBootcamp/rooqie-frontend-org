'use strict';
angular.module('app')
  .controller('SelectlocationCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window, LocationsService){
    var category = $stateParams.category;
    LocationsService.getLocations()
    .success(function(result){
    		var locationscontainer = [];
			Array.prototype.contains = function(element){
    			return this.indexOf(element) > -1;
    		};
			var resultLength = result.length;
			for (var i = 0; i < resultLength; i++) {
			    if ((result[i]).categories.contains(category)) {
			    	locationscontainer.push(result[i]);
			    } else {
			    	locationscontainer = ["Sorry, noch keine Locationvorschläge"];
			    }
			};
  			$scope.locations = locationscontainer;
  	})
  	.error(function(result){
    console.log(result);
    $scope.locations = ["rescue"];
  	});





  });
