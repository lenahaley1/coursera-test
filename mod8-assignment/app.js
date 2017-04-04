(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems',FoundItems);

  function FoundItems() {
    var ddo = {
      templateUrl: 'items.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.found = [];

    list.getSearchedMenuItems = function () {
      list.found = []
      if (list.searchTerm) {
        var promise = MenuSearchService.getSearchedMenuItems(list.searchTerm);
        promise.then(function (response) {
          list.found = response;
        })
        .catch(function (error) {
          console.log("Error producing narrowed down list.");
        });
      }
    };

    list.removeItem = function (index) {
      list.found.splice(index, 1);
        if (list.found.length == 0) {
          list.error = "Nothing found";
        }
    }
  };


  MenuSearchService.$inject = ['$http', 'ApiBasePath']
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getSearchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      }).then(function (result) {

        var resultItems = result.data.menu_items;
        var foundItems = [];
        for (var index = 0; index < resultItems.length; index++) {
          if (resultItems[index].description.indexOf(searchTerm) != -1) {
            foundItems.push(resultItems[index]);
          }
        }
        return foundItems;
      });
    };

  };

})();
