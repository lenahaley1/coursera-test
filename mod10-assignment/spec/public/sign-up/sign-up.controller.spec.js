describe('SignUpController', function() {
  'use strict';

  var $httpBackend;
  var MenuService;
  var InfoService;
  var ApiPath;
  var SignUpController;

  var menuItem  = {

        "id": 853,
        "short_name": "L4",
        "name": "Kung Pao Chicken",
        "description": "beef sauteed with carrots and celery, in a spicy Szechuan sauce",
        "price_small": null,
        "price_large": 9.75,
        "small_portion_name": null,
        "large_portion_name": null,
        "image_present": true
      }

  /**
   * Gets called before each unit test it()
   */
  beforeEach(function() {
    // Load module
    module('public');

    // Load any dependencies
    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');

      var $controller = $injector.get('$controller');
      var MenuService = $injector.get('MenuService');
      var InfoService = $injector.get('InfoService');

      //Instantiate controller
      SignUpController = $controller('SignUpController', {
        MenuService: MenuService,
        InfoService: InfoService
      });

      $httpBackend.whenGET('src/public/public.html').respond('');
      $httpBackend.whenGET('src/public/home/home.html').respond('');
    });

  });

  // test for bonus task 4
   it('should test whether the favorite menu item exists and display an error if it does not.', function() {
     expect(SignUpController.clearMenuSelection).not.toBeDefined();
     var shortName = "L1";
     SignUpController.info = {
       'menuSelection': shortName
     }
     //create a new request expectation for GET requests
     $httpBackend.expectGET(ApiPath + "/menu_items/" + shortName + ".json").respond(menuItem);

     SignUpController.checkMenuSelection(shortName);

     //flush pending requests
     $httpBackend.flush();

     expect(SignUpController.clearMenuSelection).toBe(false);
   });


});
