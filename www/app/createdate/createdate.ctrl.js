'use strict';
angular.module('app')
  .controller('CreatedateCtrl', function($scope){
    console.log("hey");
    $scope.onezoneDatepicker = {
      showTodayButton: false,
      hideSetButton: false,
      showDatepicker: true,
      hideCancelButton: true,

    };
  
  });
