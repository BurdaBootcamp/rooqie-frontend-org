'use strict';
angular.module('app')
  .controller('ProfileCtrl', function($scope, $rootScope, $state, $stateParams, $window, Account){
      $scope.account = {};
      Account.findById({
        id: 'me'
      }).$promise.then(function(account) {
          var date = new Date(account.moved);
          var today = new Date();
          var yearDiv = today.getFullYear() - date.getFullYear();
          var month = yearDiv*12 + ((today.getMonth()+1)-(date.getMonth()+1));
          account.moved = month;
          $scope.account = account;
      }, function(error) {

      });
  });
