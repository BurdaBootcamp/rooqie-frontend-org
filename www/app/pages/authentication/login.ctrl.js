'use strict';
angular.module('app')
  .controller('LoginCtrl', function($rootScope, $scope, $state, $window, UsersService){
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.login = function(user){
      UsersService.login(user)
        .success(function(result) {
          $window.localStorage['access_token'] = result.id;
          $window.localStorage['user_id'] = result.userId;
          $state.go('app.recommendations');
        })
        .error(function(result) {
          $state.go('error', {error: result});
        })
    };
  });
