//Constructor for the basic flashcard
	var basicFlashcard = function(front, back){
		this.front = front;
		this.back = back;
	};
	
	//Empty array that will house our basic flashcard objects
	var array = [];
	
	//Key Value pairs for the basic object
	var questionS = {
		"Who was the first president of the United States?": "George Washington",
		"Who came up with the theory of General and Special Relativity?": "Albert Einstein",
		"Schrödinger's cat is a thought experiment dealing with which type of mechanics?": "Quantum Mechanics",
		"In mathematics, what is the name of the sequence characterized by the fact that every number after the first two is the sum of the two preceding ones?": "Fibonacci Sequence"
	};
	
	//Loop through questionS and construct objects
	for (var key in questionS){
		array.push(new basicFlashcard(key, questionS[key]));
	}
	
	//Export the array of objects and the constructor out to flashcards.js
	module.exports = {array, basicFlashcard};
