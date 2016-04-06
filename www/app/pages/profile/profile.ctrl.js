'use strict';
angular.module('app')
  .controller('ProfileCtrl', function($scope, $rootScope, $stateParams, $window){
    var data = {}, fn = {};
    $scope.data = data;
    $scope.fn = fn;

    var reqData = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data.user = JSON.parse(this.responseText);
      }
    });

    xhr.open("GET", $rootScope.API_URL + "/accounts/" + $window.localStorage['user_id'] + "?access_token=" + $window.localStorage['access_token']);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "4b3a7d87-8c2d-1916-5ef0-683664ad5218");

    xhr.send(reqData);
  });
