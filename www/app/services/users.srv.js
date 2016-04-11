'use strict';
angular.module('app')
.factory('UsersService', function ($rootScope, $window, $http, $q) {
  return {
    getUser: function(userId) {
      return $http.get($rootScope.API_URL + "/accounts/" + userId + "?access_token=" + $window.localStorage['access_token']);
    },
    signUp: function(user) {
      var data = {
        "firstname": user.firstname,
        "lastname": "none",
        "birthday": "2016-04-08",
        "city": user.city,
        "moved": "2016-04-08",
        "profession": user.profession,
        "sex": "male",
        "interests": [
          "string"
        ],
        "image": "url",
        "email": user.email,
        "password": user.password
      };
      return $http.post($rootScope.API_URL + "/accounts", data);
    },
    login: function(user) {
      return $http.post($rootScope.API_URL + "/accounts/login", {"email": user.email, "password": user.password});
    },
  };
});
