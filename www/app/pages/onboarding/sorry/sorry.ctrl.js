'use strict';
angular.module('app')
  .controller('OnboardingFacebookCtrl', function($rootScope, $scope, $ionicHistory, $state, $account, $stateParams, Account){
    Account.prototype$updateAttributes({id: $account.data.id},{
        city: $stateParams.city
    });
    }
  });
