'use strict';

angular.module('myApp')

.controller('propertiesCtrl', function($scope, Property) {
  console.log('propertiesCtrl!');

  $scope.addProperty = (newProperty) => {
    Property.add(newProperty)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
});
