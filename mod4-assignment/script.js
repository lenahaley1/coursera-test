//wrap in IIFE
(function () {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  
  // function to be used in map implementation
  function mapFunction(name) {
    var firstLetter = name.charAt(0).toLowerCase();
    if (firstLetter == "j") {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }

  // create arrays for optional and bonus portion of the assignment
  var mapArray = names.map(mapFunction);

  var reduceDictionary = names.reduce(function(a, b) {
    var firstLetter = b.charAt(0).toLowerCase();
    if (firstLetter == "j") {
      a.bye.push(byeSpeaker.speakSimple(b));
      return a;
    } else {
      a.hello.push(helloSpeaker.speakSimple(b));
      return a;
    }
  }, {hello: [], bye: []});

  var reduceArrayHello = reduceDictionary.hello;
  var reduceArrayBye = reduceDictionary.bye;

for (var i = 0; i < names.length; i++) {

  // find first letter of the current name
  var currentName = names[i];
  var firstLetter = currentName.charAt(0).toLowerCase();

  // loop through names and apply the appropriate greeting using speak
  if (firstLetter == "j") {
    byeSpeaker.speak(currentName);
  } else {
    helloSpeaker.speak(currentName);
  }
}

// print the newly created map array to the console
for (var i = 0; i < mapArray.length; i++){
  console.log(mapArray[i]);
}

// print the 2 resulting reduce arrays to the console
for (var i = 0; i < reduceArrayHello.length; i++){
  console.log(reduceArrayHello[i]);
}

for (var i = 0; i < reduceArrayBye.length; i++){
  console.log(reduceArrayBye[i]);
}

})();