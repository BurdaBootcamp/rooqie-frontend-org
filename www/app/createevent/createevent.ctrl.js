'use strict';
angular.module('app')
  .controller('CreateeventCtrl', function($scope, $ionicHistory, $state, $stateParams, $window){
    var data = {};
    $scope.data = data;

    data.categories = {
     "trip": {
       "name": "Ausflug",
       "image": "img/categories/trip_sea.jpg"
     },
     "party": {
       "name": "Feiern",
       "image": "img/categories/cocktails.jpg"
     },
     "sightseeing": {
       "name": "Sightseeing",
       "image": "img/categories/trip_english_garden.jpg"
     },
     "breakfast": {
       "name": "Frühstück",
       "image": "img/categories/breakfast.png"
     },
     "sport": {
       "name": "Sport",
       "image": "img/categories/sports_foodball.jpg"
     },
     "tatort": {
       "name": "Tatort",
       "image": "img/categories/tatort.jpg"
     },
     "coffee": {
       "name": "Café",
       "image": "img/categories/coffee.png"
     },
     "cooking": {
       "name": "Kochen",
       "image": "img/categories/course_cooking.jpg"
     },
     "cinema": {
       "name": "Kino",
       "image": "img/categories/movienight.jpg"
     },
     "museum": {
       "name": "Museum",
       "image": "img/categories/museum.png"
     }
   }
  });
