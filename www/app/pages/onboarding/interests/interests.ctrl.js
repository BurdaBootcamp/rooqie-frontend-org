'use strict';
angular.module('app')
  .controller('InterestsCtrl', function($scope, $stateParams, $window){
    // console.log("hi");
  
    $scope.interests = {
      "Sport" : ["Fußball", "Running", "Reiten"], 
      "Musik" : ["Rock", "House/Elektro", "Klassik"], 
      "Aktivitäten" : ["Sightseeing", "Party", "Kultur"]
    };









    // {
    //   "Sport": [{
    //     "name": "Fußball",
    //     "name": "Running",
    //     "name": "Reiten"
    //   }],
    //   "Musik": [{
    //     "name": "Rock",
    //     "name": "House/Elektro",
    //     "name": "Klassik"
    //   }],
    //   "Aktivitäten": [{
    //     "name": "Sightseeing",
    //     "name": "Party",
    //     "name": "Kultur"
    //   }]
    // };



  var trigger = angular.element( document.querySelector( ".trigger" )); 
    
 //   $scope.trigger = "no";
 //   $scope.changeClass = function(){
 //     if ($scope.trigger === "no")
 //       $scope.trigger = "yes";
 //         $scope.firstclass = "invisible";
 //     else
 //       $scope.trigger === "no";
 //         $scope.firstclass = "visible";
  // };

  // // .getElementsByTagName('li');
  // var target = document.getElementsByClassName("dropdownlist");

  // console.log(trigger);
  // trigger.addEventListener('click', function(e) {
  //    e.preventDefault();
  //    target.classList.toggle('nondisplay');
  //    console.log("hi");
  // });
});
