(function () {
"use strict";

angular.module('common')
.service('InfoService', InfoService);


function InfoService() {
  var service = this;

  service.setInfo = function (info){
    service.info = info;
  }

  service.getInfo = function() {
    return service.info;
  }
};

})();
