'use strict';
angular.module('app')
  .controller('OnboardingUserdataCtrl', function($scope, $rootScope, $state, $stateParams, $window, $account, UserIdentity, Account){
    $scope.user = {};
    $scope.user = $stateParams.user;
    $account.load();
    $scope.user.id = $account.data.id;

    UserIdentity.findById({
        id: 'me'
    }, function(identity) {
        console.log(identity);
        $scope.user.gender = identity.profile.gender;
        $scope.user.firstname = identity.profile.name.givenName;
        $scope.user.lastname = identity.profile.name.familyName;
        $scope.user.image = identity.profile.photos[0].value;
    });

    $scope.createAccount = function(user){
        /*$scope.account = Account.findOne({ id: user.id });
        $scope.account.firstname = user.firstname;
        $scope.account.$save();*/

        Account.prototype$updateAttributes({id: user.id},{
            firstname: user.firstname,
            lastname: user.lastname,
            gender: user.gender,
            image: user.image,
            city: user.city,
            moved: user.moved
        }).$promise.then(function(newUser) {
            $state.go('app.userevents');
        });
    }
  });
