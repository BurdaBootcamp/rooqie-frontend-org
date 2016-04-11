'use strict';
angular.module('app')
.factory('EventsService', function ($rootScope, $window, $http, $q) {
  return {
    getEvents: function() {
      return $http.get($rootScope.API_URL + '/events?access_token=' + $window.localStorage['access_token']);
    },
    getEvent: function(eventId) {
      return $http.get($rootScope.API_URL + '/events/' + eventId + '?access_token=' + $window.localStorage['access_token']);
    },
    getUserEvents: function(accountId) {
      return $http.get($rootScope.API_URL + '/accounts/' + accountId + '/events?access_token=' + $window.localStorage['access_token']);
    },
    resolveDateString: function(dateString) {
      var date = new Date(dateString);
      return $rootScope.weekday[date.getDay()] + ", " + ("0" + date.getHours()).slice(-2) + "." + ("0" + date.getMinutes()).slice(-2);
    },
    getParticipantCount: function(eventId) {
      return $http.get($rootScope.API_URL + '/events/' + eventId + '/accounts/count?access_token=' + $window.localStorage['access_token']);
    },
    getParticipants: function(eventId) {
      return $http.get($rootScope.API_URL + '/events/' + eventId + '/accounts?access_token=' + $window.localStorage['access_token']);
    },
    participates: function(eventId){
      return $http.get($rootScope.API_URL + '/participants/participates?accountId=' + $window.localStorage['user_id'] + '&eventId=' + eventId + '&access_token=' + $window.localStorage['access_token']);
    },
    join: function(eventId){
      return $http.post($rootScope.API_URL + "/events/join?access_token=" + $window.localStorage['access_token'], {"accountId": $window.localStorage['user_id'],"eventId": eventId});
    },
    leave: function(eventId){
      return $http.delete($rootScope.API_URL + "/events/" + eventId + "/accounts/rel/" + $window.localStorage['user_id'] + "?access_token=" + $window.localStorage['access_token']);
    },
    getLocationId: function(eventId){
      return $http.get($rootScope.API_URL + '/events/' + eventId + '/location?access_token=' + $window.localStorage['access_token']);
    },
    createEvent: function(event) {
      var postData = {
        "name": event.name,
        "date": event.date,
        "description": event.description,
        "location": event.locationId,
        "category": event.categoryName,
        "maxParticipants": event.maxParticipants
      };
      return $http.post($rootScope.API_URL + "/events?access_token=" + $window.localStorage['access_token'], postData);
    }
  };
});
