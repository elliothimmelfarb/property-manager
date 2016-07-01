'use strict'

angular.module('myApp')

.service('Property', function($http) {

  this.add = (property) => {
    return $http.post('/api/properties', property);
  };

  this.getAll = () => {
    return $http.get('/api/properties')
  }
});
