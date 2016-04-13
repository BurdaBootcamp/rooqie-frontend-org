'use strict';
angular.module('app')
  .controller('ProfileCtrl', function($scope, $rootScope, $state, $stateParams, $window, UsersService){
    UsersService.getUser($window.localStorage['user_id'])
      .success(function(result){
        $scope.user = result;
      })
      .error(function(result){
        console.log(result);
      });
    $scope.logout = function() {
      console.log("Resr");
      UsersService.logout()
        .success(function(result) {
          $window.localStorage['access_token'] = "";
          $window.localStorage['user_id'] = "";
          $state.go('onboarding-welcome');
        })
        .error(function(result) {
          console.log(result);
        });
    }
  });
