'use strict';
angular.module('app')
  .controller('LoginCtrl', function($rootScope, $scope, $state, $window){
    var fn = {}, data = {};
    $scope.fn = fn;
    $scope.data = data;
    this.window = $window;

    data.credentials = {
      login: '',
      password: ''
    };

    fn.login = function(credentials){
      var data = JSON.stringify({
        "email": credentials.login,
        "password": credentials.password
      });

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          var responseObj = JSON.parse(this.responseText);
          $window.localStorage['access_token'] = responseObj.id;
          $window.localStorage['user_id'] = responseObj.userId;
        }
      });

      xhr.open("POST", $rootScope.API_URL + "/accounts/login");
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("postman-token", "2752d888-6b45-3291-2d95-2d0b108e96f6");

      xhr.send(data);

      setTimeout(function () {
        $state.go('app.recommendations');
      }, 2000);
    };
  });
