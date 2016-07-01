'use strict';

const app = angular.module('myApp', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider){

  const menu = {
    templateUrl: '/html/menu.html',
    controller: 'menuCtrl'
  };

  $stateProvider
    .state('home', {
      url: '/',
      views: {
        right: {
          templateUrl: '/html/home.html',
          controller: 'homeCtrl'
        },
        menu: menu
      }
    })
    .state('properties', {
      url: '/properties',
      views: {
        right: {
          templateUrl: '/html/properties.html',
          controller: 'propertiesCtrl'
        },
        menu: menu
      }
    })
    .state('properties.list', {
      url: '/list',
      templateUrl: '/html/propertyList.html',
    })
    .state('properties.add', {
      url: '/add',
      templateUrl: '/html/addProperty.html',
    })
    .state('properties.info', {
      url: '/info/:propertyId',
      templateUrl: '/html/propertyInfo.html',
    })
    .state('tenants', {
      url: '/tenants',
      views: {
        right: {
          templateUrl: '/html/tenants.html',
          controller: 'tenantsCtrl'
        },
        menu: menu
      }
    })
    .state('tenants.list', {
      url: '/list',
      templateUrl: '/html/tenantList.html',
    })
    .state('tenants.add', {
      url: '/add',
      templateUrl: '/html/addTenants.html',
    })

    $urlRouterProvider.otherwise('/');

});
