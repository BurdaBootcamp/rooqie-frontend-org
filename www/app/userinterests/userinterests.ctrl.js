'use strict';
angular.module('app')
  .controller('UserinterestsCtrl', function($scope, $stateParams, $window){
  	// console.log("hi");
	
	var selection = {}, fn = {};
	var interest = {};
	var sport = new Array(3);
	sport[0]="Kicken";
	sport[1]="Relaxen";
	sport[2]="Schachsport";
	var wirtschaft = new Array (3);
	wirtschaft[0]="Pickety";
	wirtschaft[1]="WG-Kommunismus";
	wirtschaft[2]="Z";
	interest['Sport'] = sport;
	interest['Wirtschaft'] = wirtschaft;


	$scope.selection = interest;
	$scope.fn = fn;



	console.log(selection);
});

