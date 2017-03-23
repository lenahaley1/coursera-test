(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .filter('totalCost', TotalCostFilterFactory);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var list1 = this;
    list1.items = ShoppingListCheckOffService.getToBuyItems();
    //console.log(list1.items);

    list1.addItemToBoughtList = function (name, quantity, pricePerItem, index) {
      ShoppingListCheckOffService.switchLists(name, quantity, pricePerItem, index);
    };
  }


  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService','totalCostFilter'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var list2 = this;
    list2.items = ShoppingListCheckOffService.getBoughtItems();
    //console.log(list2.items);

    list2.calculateTotal = function(input){
      var formattedTotal = totalCostFilter(input);
      return formattedTotal;
    };

  }


  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var toBuyItems = [
      {
        name: "Gala Apple",
        quantity: "5",
        pricePerItem: "0.50",
      },
      {
        name: "Yellow Bell Pepper",
        quantity: "20",
        pricePerItem: "2.00",
      },
      {
        name: "Silken Tofu",
        quantity: "2",
        pricePerItem: "3.50",
      },
      {
        name: "Sweet Potato",
        quantity: "3",
        pricePerItem: "1.20",
      },
      {
        name: "Olive Oil",
        quantity: "1",
        pricePerItem: "17.50",
      },
      {
        name: "Dark Chocolate",
        quantity: "100",
        pricePerItem: "4.00",
      }
    ];

    // List of purchased items
    var boughtItems = [];

    service.switchLists = function (itemName, quantity, pricePerItem, itemIndex) {
      var item = {
        name: itemName,
        quantity: quantity,
        pricePerItem: pricePerItem,
      };
      console.log(item);
      boughtItems.push(item);
      toBuyItems.splice(itemIndex, 1);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

  function TotalCostFilterFactory() {
    return function(input){
      input = input || "";
      var formattedCost = ("$$$" + Number(input).toFixed(2));
      return formattedCost;
    };
  }

})();
