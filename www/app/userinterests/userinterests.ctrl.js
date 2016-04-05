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

	console.log("hey");
 //    //your code to run since DOM is loaded and ready


	var trigger = angular.element( document.querySelector( ".trigger" ));	
  	
 //  	$scope.trigger = "no";
 //  	$scope.changeClass = function(){
 //    	if ($scope.trigger === "no")
 //    		$scope.trigger = "yes";
 //      		$scope.firstclass = "invisible";
 //    	else
 //    		$scope.trigger === "no";
 //      		$scope.firstclass = "visible";
	// };

	// // .getElementsByTagName('li');
	// var target = document.getElementsByClassName("dropdownlist");

	// console.log(trigger);
	// trigger.addEventListener('click', function(e) {
	//   	e.preventDefault();
	//   	target.classList.toggle('nondisplay');
	//   	console.log("hi");
	// });
});

