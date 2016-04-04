'use strict';
angular.module('app')
  .controller('EventdetailCtrl', function($scope, $stateParams, $window){
    console.log("id: " + $stateParams.id);
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
        data.event = JSON.parse(this.responseText);
        var date = new Date(data.event.date);
        data.event['daystring'] = weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
      }
    });

    xhr.open("GET", "http://localhost:3000/api/events/1?access_token=ThHK6fdUh0DAi1Jzp7JIi2wE68lckzwPFq5aTWU3slw43pA7OCKAcPXj12sCvAjK");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "7e6e29fe-c29c-2779-cd9f-996579bf5a3f");

    xhr.send(reqData);
  });
