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
        if(account.onboarding){
            $state.go('app.recommendations');
        } else {
            $state.go('onboarding-welcome');
        }
    }, function(error) {
        $state.go('onboarding-welcome');
    });
  });
