'use strict';
angular.module('app')
  .controller('UsereventsCtrl', function($rootScope, $scope, $stateParams, $window){
    var data = {}, fn = {};
    var weekday = new Array(7);
    weekday[0]=  "Sonntag";
    weekday[1] = "Montag";
    weekday[2] = "Dienstag";
    weekday[3] = "Mittwoch";
    weekday[4] = "Donnerstag";
    weekday[5] = "Freitag";
    weekday[6] = "Samstag";

    $scope.data = data;
    $scope.fn = fn;

    var reqData = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data.userevents = JSON.parse(this.responseText);
        data.userevents.forEach(function(e){
          var date = new Date(e.date);
          e['daystring'] = weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
          e.categories = $rootScope.categories[e.category];
        })
      }
    });

    xhr.open("GET", "http://localhost:3000/api/accounts/" + $window.localStorage['user_id'] + "/events?access_token=" + $window.localStorage['access_token']);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "4b3a7d87-8c2d-1916-5ef0-683664ad5218");

    xhr.send(reqData);
  });
