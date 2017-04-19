(function () {
  'use strict'

  angular.module('Data').service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var menuDataService = this;

    // Return a promise using http service
    menuDataService.getAllCategories = function() {
      return $http.get('https://davids-restaurant.herokuapp.com/categories.json')
      .then(function (result) {
        return result.data;
      });
    }
    
    // Return a promise using http service and append category short name to url
    menuDataService.getItemsForCategory = function(categoryShortName) {
      return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName)
      .then(function (result) {
        return result.data.menu_items;
      });
    }
  };
})();
