'use strict';
angular.module('app')
  .controller('LayoutCtrl', function($state, $scope, $account, $ionicHistory, Account){
      $scope.logout = function() {
          Account.logout().$promise.then(function(result) {
              $ionicHistory.clearCache()
                .then(function() {
                    $account.destroy();
                    $state.go('onboarding-welcome');
                });
          });
      }
  });
