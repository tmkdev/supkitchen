angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ButtonsCtrl', function ($scope, $http) {
  $scope.servers = [];
  $scope.processes = [];

  $http.get('api/servers', {}).then(function(response){
      $scope.servers = response.data;
      $scope.clickserver = $scope.servers[0];
      $scope.getProcesses();
      });


  $scope.getProcesses = function() {
    $http.get('api/serverprocesses/clock', {}).then(function(response){
      $scope.processes = response.data;
      });
  };


});