'use strict';
angular.module('app')
  .controller('EventjoinCtrl', function($scope, $state, $stateParams, $window){
    var data = {}, fn = {};
    var weekday = new Array(7);
    weekday[0]=  "Sonntag";
    weekday[1] = "Montag";
    weekday[2] = "Dienstag";
    weekday[3] = "Mittwoch";
    weekday[4] = "Donnerstag";
    weekday[5] = "Freitag";
    weekday[6] = "Samstag";

    if($stateParams.join) {
      var reqData1 = JSON.stringify({
        "accountId": $window.localStorage['user_id'],
        "eventId": $stateParams.id
      });

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          //prüfen ob erfolgreich
        }
      });

      xhr.open("POST", "http://localhost:3000/api/events/join?access_token=" + $window.localStorage['access_token']);
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("postman-token", "1ed596da-8fbb-a34e-51e2-8c11d4ae7869");

      xhr.send(reqData1);
    }

    $scope.data = data;
    $scope.fn = fn;

    var reqData = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data.event = JSON.parse(this.responseText);
        var date = new Date(data.event.date);
        data.event['daystring'] = weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
      }
    });

    xhr.open("GET", "http://localhost:3000/api/events/" + $stateParams.id + "?access_token=" + $window.localStorage['access_token']);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "7e6e29fe-c29c-2779-cd9f-996579bf5a3f");

    xhr.send(reqData);

    var reqData2 = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        data.user = [];
        data.users = JSON.parse(this.responseText);
        data.remainingSpaces = data.event.maxParticipants - data.users.length;
      }
    });

    xhr.open("GET", "http://localhost:3000/api/events/" + $stateParams.id + "/accounts?access_token=" + $window.localStorage['access_token']);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "12b81b8f-93c1-7752-d2ac-823e5743d6a0");

    xhr.send(reqData2);


    fn.leaveEvent = function() {
      console.log("delete");
      var data = null;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open("DELETE", "http://localhost:3000/api/events/" + $stateParams.id + "/accounts/rel/" + $window.localStorage['user_id'] + "?access_token=" + $window.localStorage['access_token']);
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.setRequestHeader("postman-token", "97c9189b-1007-6c0b-6b33-132c50d4b6ed");

      xhr.send(data);
      $state.go('app.userevents');
    }
  });
