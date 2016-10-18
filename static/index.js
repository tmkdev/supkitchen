(function(angular) {
  'use strict';
angular.module('supkitchenApp', []).controller('MainCtrl', function MainCtrl($http) {
  var ctrl = this;

  ctrl.servers = {
    list: [],
    selectedindex: null,
    status: {},
    processlist: []
  };

  ctrl.updateServer = function( index ) {
    ctrl.servers.selectedindex = index;
    ctrl.updateServerStatus();
  }

  $http.get('api/servers', {}).then(function(response){
      ctrl.servers.list = response.data;
      ctrl.servers.selectedindex = 0;

      ctrl.updateServerStatus();

  });

  ctrl.updateServerStatus = function() {
    $http.get('api/serverstatus/' + ctrl.servers.list[ctrl.servers.selectedindex], {})
     .then(function(response){
      ctrl.servers.status = response.data;

      ctrl.updateProcessList();
    });
  };

  ctrl.updateProcessList = function() {
    $http.get('api/serverprocesses/' + ctrl.servers.list[ctrl.servers.selectedindex], {})
     .then(function(response){
      ctrl.servers.processlist = response.data;
    });
  };

});
})(window.angular);
