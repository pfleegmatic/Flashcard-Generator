# Flashcard-Generator
The complete list of questions and answers for this application is inside the questions.json file. 

#Packages used: 
1) Inquirer for Command Line Interaction (CLI) and 
2) fs (to resolve earlier issue that prevented looping though question array), install following in your directory as needed:
npm install inquirer, 
npm install fs

#To run the game execute the following command:
node flashcards.js


#Advanced JavaScript Assignment: Cloze Constructors
Overview

To develop backend function for a basic flashcard game application.
The backend will essentially constitute an API that allows users to create two types of flashcards.
1.	Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").
2.	Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.")

Instructions
•	Create a new GitHub repository, named Flashcard-Generator or something similar. Clone this to your local drive.

•	Create a new file named BasicCard.js:
o	This file should define a Node module that exports a constructor for creating basic flashcards, e.g.: module.exports = BasicCard;
o	The constructor should accept two arguments: front and back.

•	Create a new file named ClozeCard.js:
o	This file should define a Node module that exports a constructor for creating cloze-deletion flashcards, e.g.: module.exports = ClozeCard;
o	The constructor should accept two arguments: text and cloze.


