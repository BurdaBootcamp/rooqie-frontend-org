
'use strict';
angular.module('app')
  .controller('LoadingCtrl', function($state, $ionicHistory){
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('app.legal', {views: {'menuContent': {templateUrl: 'app/legal/einstellungen.html', controller: 'LegalCtrl'}}});
    }
  );
