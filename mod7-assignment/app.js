(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;
  list1.items = ShoppingListCheckOffService.getToBuyItems();
  console.log(list1.items);
  var isEmpty = false;
  if(!list1.length >= 0){
    isEmpty = true;
    console.log(list1.length);

  }

  list1.addItemToBoughtList = function (name, quantity, index) {
    ShoppingListCheckOffService.switchLists(name, quantity, index);

  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;
  var isEmpty = true;
  list2.items = ShoppingListCheckOffService.getBoughtItems();
  console.log(list2.items);
  if(list2.length >= 0){
    console.log(list2.length);
    isEmpty = true;
  }

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyItems = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    }
  ];

  // List of purchased items
  var boughtItems = [];

  service.addItemToBoughtList = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
  };

  service.removeItemFromToBuyList = function (itemIndex) {
    toBuyItems.splice(itemIndex, 1);
  };

  service.switchLists = function (itemName, quantity, itemIndex) {
    var item = {
      name: itemName,
      quantity: quantity
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


})();
