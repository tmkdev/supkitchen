(function(angular) {
  'use strict';
function SupKitchenServersController($http, $interval) {
    var ctrl = this;

    ctrl.processindex = 0;
    ctrl.curprocess = {};
    ctrl.checked = true;
    ctrl.tail = 'Waiting for selection....';

    ctrl.servers = {
        list: [],
        selectedindex: null,
        status: {},
        processlist: []
    };

    $http.get('api/servers', {}).then(function(response){
        ctrl.servers.list = response.data;
        ctrl.servers.selectedindex = 0;

        ctrl.updateServerStatus();
    });

    ctrl.updateServer = function( index ) {
        ctrl.servers.selectedindex = index;
        ctrl.updateServerStatus();
    }

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

    ctrl.processclass = function(style, status) {
        if ( status == 0)
            return style + 'danger';
        else if ( status == 1 )
            return style + 'success';
        else if ( status == 10 )
            return style + 'info';
        else if ( status == 20 )
            return style + 'success';
        else if ( status == 30 )
            return style + 'warning';
        else if ( status == 40 )
            return style + 'danger';
        else if ( status == 100 )
            return style + 'warning';
        else if ( status == 200 )
            return style + 'danger';
        else
            return style;
    };

    ctrl.serverclass = function(index) {
        if (index == ctrl.servers.selectedindex)
            return 'btn btn-success btn-sm navbar-btn';
        else
            return 'btn btn-primary btn-sm navbar-btn';
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

    var updatetail = function() {
        if (ctrl.checked) {
            ctrl.taillog(ctrl.processindex);
            ctrl.updateServerStatus();
        }
    };

    var stoptime = $interval(updatetail, 10000);

}

angular.module('supkitchenApp').component('supkitchenServers', {
  templateUrl: 'static/servers.html',
  controller: SupKitchenServersController,
  bindings: {
  }
});
})(window.angular);
