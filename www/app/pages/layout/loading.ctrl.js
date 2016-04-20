'use strict';
angular.module('app')
  .controller('LoadingCtrl', function($state, $ionicHistory, $window, $account, Account) {
    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    Account.findById({
      id: 'me'
    }).$promise.then(function(account) {
      $state.go('app.userevents');
    }, function(error) {
        $state.go('onboarding-welcome');
    });
  });
