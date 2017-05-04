(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['MenuService', 'info'];
function InfoController(MenuService, info) {
  var $infoCtrl = this;

  if (info) {
    $infoCtrl.info = info;
    MenuService.getMenuItem(info.menuSelection)
      .then(function(response) {
        $infoCtrl.menuItem = response;
      })
      .catch(function(response) {
      });
  }
};

})();
