(function(angular) {
  'use strict';
function SupKitchenServersController($http, $interval) {
    var ctrl = this;

    ctrl.processindex = 0;
    ctrl.curprocess = {};
    ctrl.checked = true;

    ctrl.update = function(index) {
        ctrl.onUpdate({ index: index});
    }

    ctrl.buttonclass = function(status) {
        var basebutton='btn btn-sm'

        if ( status == 0)
            return basebutton + ' btn-danger';
        else if ( status == 10 )
            return basebutton + ' btn-info';
        else if ( status == 20 )
            return basebutton + ' btn-success';
        else if ( status == 30 )
            return basebutton + ' btn-warning';
        else if ( status == 40 )
            return basebutton + ' btn-danger';
        else if ( status == 100 )
            return basebutton + ' btn-warning';
        else if ( status == 200 )
            return basebutton + ' btn-danger';
        else
            return basebutton;

    };

    ctrl.taillog = function(index) {
        ctrl.processindex = index;
        ctrl.curprocess = ctrl.servers.processlist[ctrl.processindex];
        $http.get('api/tailprocess/' + ctrl.servers.list[ctrl.servers.selectedindex] + '/'
            + ctrl.curprocess.name, {})
         .then(function(response){
          ctrl.tail = response.data[0];
        });
    }

    ctrl.tail = 'Waiting for selection....';

    var updatetail = function() {
        if (ctrl.checked)
            ctrl.taillog(ctrl.processindex);
    };

    var stoptime = $interval(updatetail, 10000);

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
