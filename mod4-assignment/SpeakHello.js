
(function (window) {
	var speakWord = "Hello";
	var helloSpeaker = {};

	helloSpeaker.speak = function (name) {
		console.log(speakWord + " " + name);
	}
	helloSpeaker.speakSimple = function (name) {
		return (speakWord + " " + name);
	}
	window.helloSpeaker = helloSpeaker;

})(window);
