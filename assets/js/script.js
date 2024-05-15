//build an array of objects
//each object includes: 
// -Question
// -Four answers
// -record of correct answer

//build timer
//time starts when button is pressed
//time counts down

// display object
// display question
// create a button for each answer

// when user selects answer:
// check if answer equals correct answer
// if correct, display "correct" & increment "correct" counter
// if incorrect, display "incorrect" & increment "incorrect" counter
// display next object 

//when timer runs out
//end game.
//display end game message
//display correct answers out of total
//prompt user to enter name
//save score to cashe
//display "Start game" button

var quizCard = document.querySelector(".quiz-card");
var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");

var selectedQ = "";
var correctAns = "";
var answerButton = "";

//examples
var chosenWord = "";
var numBlanks = 0;

var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;

// Arrays used to create blanks and letters on screen
var lettersInChosenWord = [];
var blanksLetters = [];

// Array of words the user will guess
var words = ["variable","array", "modulus", "object", "function", "string", "boolean"];

//Array of question objects

var questions = [
  {
    "question":"What coding language primarily handles website interactivity?",
    "answers": ["Python","Java Script", "CSS", "HTML"],
    "correct":"1"
  },
  {
    "question": "Which of the following HTML tags is used to create a hyperlink?",
    "answers": ["<link>", "<a>", "<href>", "<hyperlink>"],
    "correct": "2"
  },
  {
    "question": "In the CSS box model, which property defines the space between the content and the border of an element?",
    "answers": ["padding","margin","border","outline"],
    "correct": "0"
  },
  {
    "question": "Which of the following is NOT a JavaScript data type?",
    "answers": ["boolean","string","decimal","object"],
    "correct": "2"
  },
  {
    "question": "What CSS feature allows web pages to adapt to different screen sizes and devices?",
    "answers": ["Flexbox","Grid","Media Queries","Floats"],
    "correct": "0"
  },
  {
    "question": "What does a 404 HTTP status code typically indicate?",
    "answers": ["Server error","Page not found","Redirect","Successful"],
    "correct": "1"
  },
  // {
  //   "question": "test2",
  //   "answers": ["","","",""],
  //   "correct": "2"
  // },
]

// The init function is called when the page loads 
function init() {
  getWins();
  getlosses();
}

// The startGame function is called when the start button is clicked
function startGame() {
  isWin = false;
  timerCount = 100;
  // Prevents start button from being clicked when round is in progress
  startButton.disabled = true;
  renderQuestion()
  startTimer()
}

// The winGame function is called when the win condition is met
function winGame() {
  quizCard.textContent = "YOU WON!!!🏆 ";
  winCounter++
  startButton.disabled = false;
  setWins()
}

// The loseGame function is called when timer reaches 0
function loseGame() {
  quizCard.textContent = "GAME OVER";
  loseCounter++
  startButton.disabled = false;
  setLosses()
}

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
}

//create question on screen
function renderQuestion(){
  chosenQuestion = questions[Math.floor(Math.random() * questions.length)];
  
  quizCard.textContent = chosenQuestion.question;
  quizCard.className = "quiz-card"
  renderAnswers();
  testRender();
}

function testRender(){
console.log("test successful!");
}

//render answers
function renderAnswers(){ 
  correctAns = chosenQuestion.correct;
  var answerChoice = ""
  var ansNumber = "";
  for (var i =0; i <chosenQuestion.answers.length;i++){
    ansNumber= i;
    answerChoice = document.createElement("li");
    answerChoice.textContent = chosenQuestion.answers[i];
    quizCard.append(answerChoice);
    answerButton = document.createElement("button");
    answerButton.className = "answer-button"
    answerButton.textContent = "Submit";
    answerButton.addEventListener()
    if (correctAns == ansNumber){
      answerButton.setAttribute("truthy", true);
    } else{
      answerButton.setAttribute("truthy", false);
    };
    answerChoice.append("      ");
    answerChoice.append(answerButton);
    quizCard.append(answerChoice);
  }
  console.log(quizCard);
}

// Creates blanks on screen
// function renderBlanks() {
//   // Randomly picks word from words array
//   chosenWord = words[Math.floor(Math.random() * words.length)];
//   lettersInChosenWord = chosenWord.split("");
//   numBlanks = lettersInChosenWord.length;
//   blanksLetters = []
//   // Uses loop to push blanks to blankLetters array
//   for (var i = 0; i < numBlanks; i++) {
//     blanksLetters.push("_");
//   }
//   // Converts blankLetters array into a string and renders it on the screen
//   quizCard.textContent = blanksLetters.join(" ")
// }

// Updates win count on screen and sets win count to client storage
function setWins() {
  win.textContent = winCounter;
  localStorage.setItem("winCount", winCounter);
}

// Updates lose count on screen and sets lose count to client storage
function setLosses() {
  lose.textContent = loseCounter;
  localStorage.setItem("loseCount", loseCounter);
}

// These functions are used by init
function getWins() {
  // Get stored value from client storage, if it exists
  var storedWins = localStorage.getItem("winCount");
  // If stored value doesn't exist, set counter to 0
  if (storedWins === null) {
    winCounter = 0;
  } else {
    // If a value is retrieved from client storage set the winCounter to that value
    winCounter = storedWins;
  }
  //Render win count to page
  win.textContent = winCounter;
}

function getlosses() {
  var storedLosses = localStorage.getItem("loseCount");
  if (storedLosses === null) {
    loseCounter = 0;
  } else {
    loseCounter = storedLosses;
  }
  lose.textContent = loseCounter;
}

function checkWin() {
  // If the word equals the blankLetters array when converted to string, set isWin to true
  if (chosenWord === blanksLetters.join("")) {
    // This value is used in the timer function to test if win condition is met
    isWin = true;
  }
}

// // Tests if guessed letter is in word and renders it to the screen.
// function checkLetters(letter) {
//   for (var i = 0; i < numBlanks; i++) {
//     if (chosenWord[i] === letter) {
//       blanksLetters[i] = letter;
//     }

//     quizCard.textContent = blanksLetters.join(" ");
//   }
// }

//attach an event listner to the buttons.

function checkAnswer(){
  var checkAnswer = document.querySelectorAll(".answer-button");
  for(i=0; i<checkAnswer.length; i++){
    checkAnswer[i].addEventListener("click", function(e) {
      console.log("Submit button clicked.");
    this.style.color = "#a41b4c";
     
     }) 
  }
}

// Attach event listener to document to listen for key event
document.addEventListener("keydown", function(event) {
  // If the count is zero, exit function
  if (timerCount === 0) {
    return;
  }
  // Convert all keys to lower case
  var key = event.key.toLowerCase();
  var alphabetNumericCharacters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");
  // Test if key pushed is letter
  if (alphabetNumericCharacters.includes(key)) {
    var letterGuessed = event.key;
    checkLetters(letterGuessed)
    checkWin();
  }
});

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", startGame);

// Calls init() so that it fires when page opened
init();

// Bonus: Add reset button
var resetButton = document.querySelector(".reset-button");

function resetGame() {
  // Resets win and loss counts
  winCounter = 0;
  loseCounter = 0;
  // Renders win and loss counts and sets them into client storage
  setWins()
  setLosses()
}
// Attaches event listener to button
resetButton.addEventListener("click", resetGame);
