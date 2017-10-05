//Constructor for the cloze flashcard
	var clozeFlashcard = function(cloze, question){
		this.cloze = cloze;
		this.question = question;
	
		this.displayQuestion = function(){
			var display = question.replace(cloze, "...");//replaces cloze answer w/ "..." initally; partial text
			return display;
		};
	
	};
	
	//Empty array that will house our cloze flashcard objects
	var array = [];
	
	//Key Value pairs for the cloze object
	var questionS = {
		"Frank Sinatra": "Frank Sinatra gave Marilyn Monroe a white poodle named Mafia.",
		"The liver": "The liver is the only internal organ capable of regenerating lost tissue.",
		"Cassini": "Cassini is the name of the satellite that recently crashed on Saturn’s surface.",
		"Bernoulli's Principle": "Bernoulli's Principle describes the relationship between the pressure and the velocity of a moving fluid (i.e., air or water ).",
		
	};
	
	//Loop through questionS and construct objects
	for (var key in questionS){
		array.push(new clozeFlashcard(key, questionS[key]));
	}
	
	//Export the array of objects and the constructor out to flashcards.js
	module.exports = {array, clozeFlashcard};
