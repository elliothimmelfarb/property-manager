'use strict';

angular.module('myApp')

.controller('mainCtrl', function($scope, Property) {
  console.log('mainCtrl')
  $scope.properties;

  Property.getAll()
    .then(res => {
      console.log(res);
      $scope.properties = res.data;
    })
});
