(function(angular) {
  'use strict';
function SupKitchenServersController($http) {
    var ctrl = this;

    ctrl.processindex = 0;
    ctrl.curprocess = {};

    ctrl.update = function(index) {
        ctrl.onUpdate({ index: index});
    }

    ctrl.taillog = function(index) {
        ctrl.processindex = index;
        ctrl.curprocess = ctrl.servers.processlist[ctrl.processindex];
        $http.get('api/tailprocess/' + ctrl.servers.list[ctrl.servers.selectedindex] + '/'
            + ctrl.curprocess.name, {})
         .then(function(response){
          ctrl.tail = response.data[0];
        });
    }

    ctrl.tail = 'Waiting for selection....'

}

angular.module('supkitchenApp').component('supkitchenServers', {
  templateUrl: 'static/servers.html',
  controller: SupKitchenServersController,
  bindings: {
    servers: '<',
    onUpdate: '&'
  }
});
})(window.angular);
