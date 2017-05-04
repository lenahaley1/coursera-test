(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'InfoService'];
function SignUpController(MenuService, InfoService) {
  var $signUpCtrl = this;
  $signUpCtrl.info = {};

  $signUpCtrl.submit = function() {
      MenuService.getMenuItem($signUpCtrl.info.menuSelection)
        .then(function(response) {
          $signUpCtrl.clearMenuSelection = false;
          $signUpCtrl.submitted = true;
          InfoService.setInfo($signUpCtrl.info);

          $signUpCtrl.success = true;
          $signUpCtrl.error = false;
        })
        .catch(function() {
          $signUpCtrl.clearMenuSelection = true;
          $signUpCtrl.success = false;
          $signUpCtrl.error = true;
        });


    }

    $signUpCtrl.checkMenuSelection = function() {
      MenuService.getMenuItem($signUpCtrl.info.menuSelection)
        .then(function () {
          $signUpCtrl.clearMenuSelection = false;

        })
        .catch(function() {
          $signUpCtrl.clearMenuSelection = true;
          $signUpCtrl.error = true;
        });
    }

  };


})();
