'use strict';
angular.module('app')
  .controller('FeedbackCtrl', function($scope, $rootScope, $state, $stateParams, $window, $account, Account, $ionicHistory){
     $scope.feedback = {};
     $scope.sent = false;

     $scope.feedbackSend = function(feedback) {
         console.log(feedback.message);
         Account.feedbacks.create({id: 'me'}, {
             message: feedback.message
         }).$promise.then(function(result){
             $scope.sent = true;
         });
     }
  });
