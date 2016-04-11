'use strict';
angular.module('app')
  .controller('ErrorCtrl', function($rootScope, $scope, $state, $stateParams){
    $scope.error = $stateParams.error;
  });
