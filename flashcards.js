//Create package.json
//Steps to do this:
//cd into correct directory
//npm init
//give it a name and whatever
//is this ok? say y
//ls and see that package.json has been created
//npm install --save inquirer //this will appends stuff to package.json
//ls and node_modules inidicates 3rd party stuff is attached
//cat package.json to see what is in there
//run userprompt.js
//cat user prompt.js - to see what is in there already

//Installed packages:
//npm install inquirer
//npm install fs


		
	//Pull exports
	var clozeExports = require("./clozeCard.js");
	var basicExports = require("./basicCard.js");
	
	//Inquirer will help us create the Command Line Interface
	var inquirer = require("inquirer");
	//FS allows use to write to file; you can't have array of questions without this
	var fs = require("fs");
	
	//Variables for tracking answers
	var count = 0;
	var rightCount = 0;
	var wrongCount = 0;
	
	//CLI, all options to play cloze cards, basic cards, add cloze, add basic , end program are listed ar start
	function start(){
		console.log("");
		console.log("==================================");
		console.log("Welcome to Flashcard Generator");
		console.log("==================================");


//var inquirer = require('inquirer');
//inquirer.prompt([/* Pass your questions in here */]).then(function (answers) {
    // Use user feedback for... whatever!!
//});

	
		inquirer.prompt([
	
			{
				type: "list",
				message: "Select one of following:",
				choices: ["Play cloze flashcards", 
					"Play basic flashcards",
					"Add a cloze flashcard", 
					"Add a basic flashcard", 
					"End Program"],
				name: "choices"
			}
	
		]).then(function(data){
	
			if(data.choices === "Play cloze flashcards"){
				clozeQuiz();
			}else if(data.choices === "Play basic flashcards"){
				basicQuiz();
			}else if(data.choices === "Add a cloze flashcard"){
				newCloze();
			}else if(data.choices === "Add a basic flashcard"){
				newBasic();
			}else {
				process.exit();
			}
	
		});
	}
	

	
	//Using recursion to call clozeQuiz() from inside of itself a number of times that
	//is equal to the number of indices in clozeExports.array
	function clozeQuiz(){
		if(count < clozeExports.array.length){
	
			inquirer.prompt([
	
				{
					type: "input",
					message: `${clozeExports.array[count].displayQuestion()}`,
					name: "question",
					default: ""
				}
	
			]).then(function(data){
				//If right, increase correct answers, else increase wrong answers
				if(data.question === clozeExports.array[count].cloze) {
					console.log("correct");
					rightCount++;
				}else {
					console.log(clozeExports.array[count].question);
					wrongCount++;
				}
	
				count++;
				clozeQuiz();
	
			});
	
		}else {
			//When count is equal to the number of indices in clozeExports.array, we can break our loop
			gameOverCloze();
		}
	
	}
	
	//Using 'recursion' to call basicQuiz() from inside of itself a number of times that
	//is equal to the number of indices in basicExports.array
	function basicQuiz(){
		if(count < basicExports.array.length){
	
			inquirer.prompt([
	
				{
					type: "input",
					message: `${basicExports.array[count].front}`,
					name: "question",
					default: ""
				}
	
			]).then(function(data){
				//If right, increase correct answers, else increase wrong answers
				if(data.question === basicExports.array[count].back) {
					console.log("correct");
					rightCount++;
				}else {
					console.log(basicExports.array[count].back);
					wrongCount++;
				}
	
				count++;
				basicQuiz();
	
			});
	
		}else {
			//When count is equal to the number of indices in basicExports.array, we can break our loop
			gameOverBasic();
		}
	
	}



	
	function newCloze(){
		//Use inquirer to gather the two necessary inputs for the cloze constructor
		inquirer.prompt([
	
			{
				type: "input",
				message: "Enter the text that will be your answer",
				name: "cloze",
				default: ""
			},
	
			{
				type: "input",
				message: "Enter the entire question including your answer",
				name: "question",
				default: ""
			}
	
		]).then(function(data){
			//Validates question includes the cloze phrase
			if(data.question.indexOf(data.cloze) !== -1){
				//If validated, construct and push to the array from exports
				clozeExports.array.push(new clozeExports.clozeFlashcard(data.cloze, data.question));
				//Give the user option to export new cloze card to log.txt
				inquirer.prompt([
	
					{
						type: "confirm",
						name: "confirm",
						message: "Do you want to save your card to log.txt?"
					}
	
				]).then(function(data){
					if(data.confirm){
						saveCloze(clozeExports.array[clozeExports.array.length - 1]);
						start();
					}else {
						start();
					}
				});
	
			}else {
				console.log("Your answer is not included in the question");
				newCloze();
			}
	
		});
	}


	
	function newBasic(){
		//Use inquirer to gather the two necessary inputs for the basic constructor
		inquirer.prompt([
	
			{
				type: "input",
				message: "Enter the text that will be the front of the card",
				name: "front",
				default: ""
			},
	
			{
				type: "input",
				message: "Enter the text that will be the back of the card",
				name: "back",
				default: ""
			}
	
		]).then(function(data){
			//Construct and push to the array from exports
			basicExports.array.push(new basicExports.basicFlashcard(data.front, data.back));
			//Give the user option to export new card to log.txt
			inquirer.prompt([
	
				{
					type: "confirm",
					name: "confirm",
					message: "Do you want to save your card to log.txt?"
				}
	
			]).then(function(data){
				if(data.confirm){
					saveBasic(basicExports.array[basicExports.array.length - 1]);
					start();
				}else {
					start();
				}
			});
	
		});
	}
	
	//Use FS to save the basic card
	function saveBasic(flashcard){
		fs.appendFile("log.txt", `Front: ${flashcard.front} Back: ${flashcard.back} \n`, "UTF-8", function(error){
			if (error) throw error;
		});
	}
	
	//Use FS to save the cloze card
	function saveCloze(flashcard){
		fs.appendFile("log.txt", `Cloze: ${flashcard.cloze} Question: ${flashcard.question} \n`, "UTF-8", function(error){
			if (error) throw error;
		});
	}



	
	//Posts results of cloze game
	//allows the user to take it again or return to the main menu
	function gameOverCloze(){
		console.log(`You had ${rightCount} right answers and ${wrongCount} wrong answers`);
		console.log("");
	
		inquirer.prompt([
	
			{
				type: "confirm",
				name: "confirm",
				message: "Play again?"
			}
	
		]).then(function(data){
	
			count = 0;
			rightCount = 0;
			wrongCount = 0;
	
			if(data.confirm){
				clozeQuiz();
			}else {
				start();
			}
	
		});
	
	}
	
	//Post results from the basic game
	//allows the user to take it again or return to the main menu
	function gameOverBasic(){
		console.log(`You had ${rightCount} right answers and ${wrongCount} wrong answers`);
		console.log("");
	
		inquirer.prompt([
	
			{
				type: "confirm",
				name: "confirm",
				message: "Play again?"
			}
	
		]).then(function(data){
	
			count = 0;
			rightCount = 0;
			wrongCount = 0;
	
			if(data.confirm){
				basicQuiz();
			}else {
				start();
			}
	
		});
	
	}
	
	//Starts the Command Line Interface when file is run
	start();


//npm inquirer documentation
// type: (String) Type of the prompt. Defaults: input - Possible values: input, confirm, list, rawlist, expand, checkbox, password, editor
// name: (String) The name to use when storing the answer in the answers hash. If the name contains periods, it will define a path in the answers hash.
// message: (String|Function) The question to print. If defined as a function, the first parameter will be the current inquirer session answers.
// default: (String|Number|Array|Function) Default value(s) to use if nothing is entered, or a function that returns the default value(s). If defined as a function, the first parameter will be the current inquirer session answers.
// choices: (Array|Function) Choices array or a function returning a choices array. If defined as a function, the first parameter will be the current inquirer session answers. Array values can be simple strings, or objects containing a name (to display in list), a value (to save in the answers hash) and a short (to display after selection) properties. The choices array can also contain a Separator.
// validate: (Function) Receive the user input and answers hash. Should return true if the value is valid, and an error message (String) otherwise. If false is returned, a default error message is provided.
// filter: (Function) Receive the user input and return the filtered value to be used inside the program. The value returned will be added to the Answers hash.
// when: (Function, Boolean) Receive the current user answers hash and should return true or false depending on whether or not this question should be asked. The value can also be a simple boolean.
// pageSize: (Number) Change the number of lines that will be rendered when using list, rawList, expand or checkbox.
// prefix: (String) Change the default prefix message.
// suffix: (String) Change the default suffix message.