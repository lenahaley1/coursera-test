(function () {
  'use strict'
  angular.module('MenuApp').config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up 3 view UI states ***
    $stateProvider

    // Home View
    .state('home', {
      url: '/',
      templateUrl: 'js/templates/home.template.html'
    })

    // Categories View
    .state('categories', {
      url: '/categories',
      templateUrl: 'js/templates/categories.template.html',
      controller: 'CategoriesController as categoriesController',
      resolve: {
        categories: ['MenuDataService', function (MenuDataService) {
          return MenuDataService.getAllCategories();
        }]
      }
    })

    // Items View
    .state('items', {
      url: "/categories/items/{categoryName}",
      templateUrl: 'js/templates/items.template.html',
      controller: 'ItemsController as itemsController',
      resolve: {
        items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.categoryName);
        }]
      }
    });

  }
})();
