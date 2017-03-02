$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl =
  "https://davids-restaurant.herokuapp.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl =
  "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";
  var aboutSectionHtml = "snippets/about.html";
  var aboutTitleHtml = "snippets/about-title.html"

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}'
// with propValue in given 'string'
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
  .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// Remove the class 'active' from home and switch to Menu button
var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Remove 'active' from about button
  var classes = document.querySelector("#navAboutButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navAboutButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") === -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

// Remove the class 'active' from home and switch to About button
var switchAboutToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Remove 'active' from menu button
  var classes = document.querySelector("#navMenuButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navMenuButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navAboutButton").className;
  if (classes.indexOf("active") === -1) {
    classes += " active";
    document.querySelector("#navAboutButton").className = classes;
  }
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  allCategoriesUrl,
  buildAndShowHomeHTML, 
  true); 
});

function buildAndShowHomeHTML (categories) {

  // Load home snippet page
  $ajaxUtils.sendGetRequest(
    homeHtmlUrl,
    function (homeHtml) {

      var chosenCategoryShortName = (chooseRandomCategory (categories)).short_name;

      var formattedRandomCategory = ("'" + chosenCategoryShortName + "'");

      //console.log(formattedRandomCategory);

      var homeHtmlToInsertIntoMainPage = insertProperty (homeHtml, "randomCategoryShortName", formattedRandomCategory);

      insertHtml("#main-content", homeHtmlToInsertIntoMainPage);

    },
    false); 
}


// Given array of category objects, returns a random category object.
function chooseRandomCategory (categories) {
  // Choose a random index into the array (from 0 inclusively until array length (exclusively))
  var randomArrayIndex = Math.floor(Math.random() * categories.length);

  // return category object with that randomArrayIndex
  return categories[randomArrayIndex];
}

// find a random number between 1 and 5
function randomIntFromInterval(min,max) {
  var randomInteger = Math.floor(Math.random()*(max-min+1)+min);
  return randomInteger;
}

// asign filled or non-filled stars based on randomly generated score above
function starFillClassGenerator(randomInt){
  var assignClassArray = [];
  for (i=0; i < randomInt; i++){
    assignClassArray[i] = "fa fa-star";
  }
  for (i=randomInt; i < 5; i++){
    assignClassArray[i] = "fa fa-star-o";
  }
  return assignClassArray;
}



// Load the menu categories view
dc.loadMenuCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);
};

// Load the about section view
dc.loadAboutSection = function () {
  showLoading("#main-content");
  switchAboutToActive();
  $ajaxUtils.sendGetRequest(
   aboutSectionHtml,
   buildAndShowAboutHTML, false);
};

// Load the menu items view
// 'categoryShort' is a short_name for a category
dc.loadMenuItems = function (categoryShort) {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    menuItemsUrl + categoryShort,
    buildAndShowMenuItemsHTML);
};


// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var categoriesViewHtml =
          buildCategoriesViewHtml(categories,
            categoriesTitleHtml,
            categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}


// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
 categoriesTitleHtml,
 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
    insertProperty(html, "name", name);
    html =
    insertProperty(html,
     "short_name",
     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

// Builds HTML for the about page using random function to generate rating
function buildAndShowAboutHTML () {

  // Load about snippet page
  $ajaxUtils.sendGetRequest(
    aboutSectionHtml,
    function (aboutHtml) {

      // Generate random number and create an array of star html classes
      var randomInt = randomIntFromInterval(1,5);
      var starText = randomInt.toString() + "-star rating";
      var starRatingClassArray = starFillClassGenerator(randomInt);
      
      //console.log(starRatingClassArray);
      
      var starOne = starRatingClassArray[0];
      var starTwo = starRatingClassArray[1];
      var starThree = starRatingClassArray[2];
      var starFour = starRatingClassArray[3];
      var starFive = starRatingClassArray[4];

      //insert properties for the about.html
      var aboutHtmlToInsert = insertProperty (aboutHtml, "starOne", starOne);
      var aboutHtmlToInsert = insertProperty (aboutHtmlToInsert, "starTwo", starTwo);
      var aboutHtmlToInsert = insertProperty (aboutHtmlToInsert, "starThree", starThree);
      var aboutHtmlToInsert = insertProperty (aboutHtmlToInsert, "starFour", starFour);
      var aboutHtmlToInsert = insertProperty (aboutHtmlToInsert, "starFive", starFive);
      var aboutHtmlToInsert = insertProperty (aboutHtmlToInsert, "starText", starText);

      insertHtml("#main-content", aboutHtmlToInsert);

    },
    false);
}


// Builds HTML for the single category page based on the data
// from the server
function buildAndShowMenuItemsHTML (categoryMenuItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuItemHtml,
        function (menuItemHtml) {
          // Switch CSS class active to menu button
          switchMenuToActive();

          var menuItemsViewHtml =
          buildMenuItemsViewHtml(categoryMenuItems,
           menuItemsTitleHtml,
           menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
        false);
    },
    false);
}


// Using category and menu items data and snippets html
// build menu items view HTML to be inserted into page
function buildMenuItemsViewHtml(categoryMenuItems,
  menuItemsTitleHtml,
  menuItemHtml) {

  menuItemsTitleHtml =
  insertProperty(menuItemsTitleHtml,
   "name",
   categoryMenuItems.category.name);
  menuItemsTitleHtml =
  insertProperty(menuItemsTitleHtml,
   "special_instructions",
   categoryMenuItems.category.special_instructions);

  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over menu items
  var menuItems = categoryMenuItems.menu_items;
  var catShortName = categoryMenuItems.category.short_name;
  for (var i = 0; i < menuItems.length; i++) {
    // Insert menu item values
    var html = menuItemHtml;
    html =
    insertProperty(html, "short_name", menuItems[i].short_name);
    html =
    insertProperty(html,
     "catShortName",
     catShortName);
    html =
    insertItemPrice(html,
      "price_small",
      menuItems[i].price_small);
    html =
    insertItemPortionName(html,
      "small_portion_name",
      menuItems[i].small_portion_name);
    html =
    insertItemPrice(html,
      "price_large",
      menuItems[i].price_large);
    html =
    insertItemPortionName(html,
      "large_portion_name",
      menuItems[i].large_portion_name);
    html =
    insertProperty(html,
     "name",
     menuItems[i].name);
    html =
    insertProperty(html,
     "description",
     menuItems[i].description);

    // Add clearfix after every second menu item
    if (i % 2 !== 0) {
      html +=
      "<div class='clearfix visible-lg-block visible-md-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}


// Appends price with '$' if price exists
function insertItemPrice(html,
 pricePropName,
 priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) {
    return insertProperty(html, pricePropName, "");
  }

  priceValue = "$" + priceValue.toFixed(2);
  html = insertProperty(html, pricePropName, priceValue);
  return html;
}


// Appends portion name in parens if it exists
function insertItemPortionName(html,
 portionPropName,
 portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProperty(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProperty(html, portionPropName, portionValue);
  return html;
}


global.$dc = dc;

})(window);

