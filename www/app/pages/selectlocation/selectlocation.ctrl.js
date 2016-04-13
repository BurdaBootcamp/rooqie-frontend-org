'use strict';
angular.module('app')
  .controller('SelectlocationCtrl', function($rootScope, $scope, $ionicHistory, $state, $stateParams, $window, LocationsService, $cordovaGeolocation){
	    $scope.fn = {};

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
				    } 
				};

	  			$scope.locations = locationscontainer;
	  			drawMap(locationscontainer);
	  	})
	  	.error(function(result){
	    console.log(result);
	    $scope.locations = ["rescue"];
	  	});

	  	function drawMap (locationscontainer) {

		  	var options = {timeout: 10000, enableHighAccuracy: true};	 
			  	$cordovaGeolocation.getCurrentPosition(options).then(function(position){
			 		//code to position map centered for user location
				    // var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				    
				    //Center of munich
				    var latLng = new google.maps.LatLng(48.135153, 11.582741);
					
				    var mapOptions = {
				        center: latLng,
				        zoom: 11,
				        mapTypeId: google.maps.MapTypeId.ROADMAP,
				        icon: {
					      path: google.maps.SymbolPath.CIRCLE,
					      scale: 10
					    },
				    };

			    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
			 	var rooqie_marker = 'img/icons/location.svg';
			    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
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
			  	}, function(error){
			    	console.log("Could not get location");
			});
		};

	$scope.fn.myGoBack = function() {
      $ionicHistory.clearCache()
        .then(function(){
          $ionicHistory.goBack()
        });
    };
    $scope.$on( "$ionicView.enter", function($window) {
        google.maps.event.trigger( map, 'resize' );
        console.log(map);
    });
});
