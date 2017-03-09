(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope){
    $scope.foodList = "";
    $scope.isTooMuchFood = "";
    $scope.feedbackMessage = "";
    $scope.isTooMuchFood = "";
    $scope.textColor = "black";
    $scope.borderColor = "white";

    //Display feedback message on whether there is too much food listed
    $scope.displayIfTooMuchFood = function () {
      //var feedbackMessage = "hello"
      if($scope.isTooMuchFood == "no"){
        $scope.feedbackMessage = "Enjoy!";
        //console.log("feedback message is: " + $scope.feedbackMessage);
      }
      else if($scope.isTooMuchFood == "yes"){
        $scope.feedbackMessage = "Too much food";
        //console.log("feedback message is: " + $scope.feedbackMessage);
      }
      else if($scope.isTooMuchFood == "undetermined"){
        $scope.feedbackMessage = "Please enter data first";
        //console.log("feedback message is: " + $scope.feedbackMessage);
      }
      else {
        $scope.feedbackMessage = "";
        //console.log("feedback message is: " + $scope.feedbackMessage);
      }
      return $scope.feedbackMessage;
    };

    //Logic behind determining whether the listed number of foods is too much
    $scope.determineIfTooMuchFood = function() {
      var numberOfFoods = checkNumberOfFoods($scope.foodList);
      console.log("number of foods: " + numberOfFoods);
      if(numberOfFoods <= 3 && numberOfFoods > 0){
        $scope.isTooMuchFood = "no";
        $scope.textColor = "color:green";
        $scope.borderColor = "border:5px solid green";
      }
      else if(numberOfFoods > 3){
        $scope.isTooMuchFood = "yes";
        $scope.textColor = "color:green";
        $scope.borderColor = "border:5px solid green";
      }
      else {
        $scope.isTooMuchFood = "undetermined"
        $scope.textColor = "color:red";
        $scope.borderColor = "border:5px solid red";
      }
    };
    
    //Determine the number of foods in the list
    function checkNumberOfFoods(string) {
      if (string.length == 0) {
        return 0;
      }

      var foodItems = getFoodItems(string);
      var numberOfFoods = foodItems.length;
      return numberOfFoods;

    };

    //Get food items from the list and remove any empty values
    function getFoodItems(string){
      var listItems = string.split(',');
      var emptyValue1 = " ";
      var emptyValue2 = "";
      var strippedArray = [];
      for(var i =0; i<listItems.length; i++){
        if(!(listItems[i] == emptyValue1) && !(listItems[i] == emptyValue2)){
          strippedArray.push(listItems[i]);
        }
      }
      return strippedArray;
    }

  }

})();
