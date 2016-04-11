'use strict';
angular.module('app')
  .controller('ProfileCtrl', function($scope, $rootScope, $stateParams, $window, UsersService){
    $scope.user = {};
    UsersService.getUser($window.localStorage['user_id'])
      .success(function(result){
        $scope.user = result;
      })
      .error(function(result){
        console.log(result);
      })
  });
