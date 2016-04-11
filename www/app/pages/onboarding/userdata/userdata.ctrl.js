'use strict';
angular.module('app')
  .controller('OnboardingUserdataCtrl', function($scope, $rootScope, $state, $stateParams, $window, UsersService){
    $scope.user = {};
    $scope.user = $stateParams.user;
    $scope.createAccount = function(user){
      console.log(user);
      UsersService.signUp(user)
        .success(function(result){
          UsersService.login(user)
            .success(function(result){
              $window.localStorage['access_token'] = result.id;
              $window.localStorage['user_id'] = result.userId;
              $state.go('app.recommendations');
            })
            .error(function(result){
              console.log(result);
            });
        })
        .error(function(result){
          console.log(result);
        });
    }
  });
