//wrap in IIFE
(function (window) {
	var speakWord = "Good Bye";
	var byeSpeaker = {};

	byeSpeaker.speak = function (name) {
		console.log(speakWord + " " + name);
	}
	byeSpeaker.speakSimple = function (name) {
		return (speakWord + " " + name);
	}

	window.byeSpeaker = byeSpeaker;

})(window);
