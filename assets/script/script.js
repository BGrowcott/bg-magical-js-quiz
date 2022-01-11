const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const question = document.querySelector("#question");
const answers = document.querySelector("#answers");
const submit = document.querySelector("#submit");
const rightOrWrong = document.querySelector("#RorW");
const options = document.querySelector("#options");
const op1 = document.querySelector("#op1");
const op1Label = document.querySelector("#op1Label");
const op2 = document.querySelector("#op2");
const op2Label = document.querySelector("#op2Label");
const op3 = document.querySelector("#op3");
const op3Label = document.querySelector("#op3Label");
const op4 = document.querySelector("#op4");
const op4Label = document.querySelector("#op4Label");
const subHigh = document.querySelector("#subHigh");
const userName = document.querySelector("#name");
const highScores = document.querySelector("#highScores");
const instructions = document.getElementsByClassName("instructions");
let score = 0;
let highScoresArray = JSON.parse(localStorage.getItem("highscores"));

// if local storage is empty give it an empty array to start off with
if (localStorage.getItem("highscores") == null) {
  localStorage.setItem("highscores", "[]");
}

// Questions
const answerForm1 = function () {
  options.setAttribute("class", "fadeIn");
  submit.style.display = "block";
  question.innerHTML = "Which of these functions has INCORRECT syntax?";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "incorrect");
  op4.setAttribute("value", "correct");
  op1Label.innerHTML = "let sum = function (x, y) {return x + y}";
  op2Label.innerHTML = "function square (x) {return x * x}";
  op3Label.innerHTML = "let square = x => {return x * x}";
  op4Label.innerHTML = "let sum = x, y => {return x + y}";
};

const answerForm2 = function () {
  question.innerHTML = "What is the correct way to set up an interval?";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "correct");
  op3.setAttribute("value", "incorrect");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML =
    "setInterval(1000, function () {element.innerHTML += 'Hello'});";
  op2Label.innerHTML =
    "setInterval(function () {element.innerHTML += 'Hello'}, 1000);";
  op3Label.innerHTML =
    "function () setInterval ({element.innerHTML += 'Hello'}, 1000);";
  op4Label.innerHTML =
    "function () setInterval (1000, {element.innerHTML += 'Hello'});";
};

const answerForm3 = function () {
  question.innerHTML = "How does a FOR loop start?";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "correct");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML = "for (i = 0; i <= 5)";
  op2Label.innerHTML = "for (i = to 5, i + 1)";
  op3Label.innerHTML = "for (i = 0; i <= 5; i++)";
  op4Label.innerHTML = "for (i <= 5; i++)";
};

const answerForm4 = function () {
  question.innerHTML = "What is the correct way to write a JavaScript array?";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "incorrect");
  op4.setAttribute("value", "correct");
  op1Label.innerHTML = "let dogs = 'Barry', 'Rocket', 'Francis'";
  op2Label.innerHTML = "let cats = [Tyrone], [Wilson], [Mr Cuddlesworth]";
  op3Label.innerHTML = "let dogs = (Barry, Rocket, Francis)";
  op4Label.innerHTML = "let cats = ['Tyrone', 'Wilson', 'Mr Cuddlesworth']";
};

const answerForm5 = function () {
  question.innerHTML =
    "What is the correct JavaScript syntax to change the content of the HTML element below?";
  document.querySelector("#demo").style.display = "block";
  op1.setAttribute("value", "correct");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "incorrect");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML =
    "#document.getElementById('demo').innerHTML = 'Hello World!'";
  op2Label.innerHTML = "#demo.innerHTML = 'Hello World!'";
  op3Label.innerHTML =
    "document.getElementByName('p').innerHTML = 'Hello World!'";
  op4Label.innerHTML = "document.getElement('p').innerHTML = 'Hello World!'";
};

// Results view
const results = function () {
  renderHighScores();
  document.querySelector("#timesUp").style.display = "none";
  document.querySelector("#seeScore").style.display = "none";
  timer.style.display = "none";
  answers.style.display = "none";
  document.querySelector("#demo").style.display = "none";
  document.querySelector("#results").style.display = "block";
  document.querySelector("#results").setAttribute("class", "fadeIn");
  document.querySelector("#result").innerHTML = score;
};

//Form an array of question pages + results
let questionArray = [
  answerForm2,
  answerForm3,
  answerForm4,
  answerForm5,
  results,
];

// Timer function
let timeLeft = 60;
const countDown = function () {
  let interval = setInterval(function () {
    timeLeft--;
    timer.innerHTML = `${timeLeft}`;
    // Out of time
    if (timeLeft <= 0) {
      clearInterval(interval);
      timer.innerHTML = `Whoops! You ran out of time!`;
      document.querySelector("#timesUp").style.display = "block";
      answers.style.display = "none";
      document.querySelector("#seeScore").style.display = "block";
    }
    // stop counter if quiz is complete - !UPDATE! if more questions are added.
    if (questionArrayIndex === 4) {
      clearInterval(interval);
    }
  }, 1000);
};
// Begin timer & start button disappears
startBtn.addEventListener("click", countDown);
startBtn.addEventListener("click", () => {
  answerForm1();
  for (let paragraphs of instructions) {
    paragraphs.style.display = "none";
  }
  startBtn.style.display = "none";
  timer.style.display = "block";
  options.style.display = "flex";
});

//Function for loading next question
function nextQuestion() {
  questionArray[questionArrayIndex]();
  document.querySelector('input[name="quizOptions"]:checked').checked = false;
  options.setAttribute("class", "fadeIn");
  rightOrWrong.innerHTML = "";
  submit.style.display = "block";
}

// check answer and display next question on submit
let questionArrayIndex = -1;
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // make sure at least one answer is chosen
  if (document.querySelector('input[name="quizOptions"]:checked') == null) {
    return;
  }

  //fade out
  options.setAttribute("class", "fadeOut");

  //move on to next question after 1s
  setTimeout(nextQuestion, 1000);
  questionArrayIndex++;

  // remove button so user can't spam submit
  submit.style.display = "none";

  // display if answer is right or wrong
  if (
    document.querySelector('input[name="quizOptions"]:checked').value ===
    "correct"
  ) {
    rightOrWrong.style.color = "green";
    rightOrWrong.innerHTML = "CORRECT!";
    // increase score
    score++;
  } else {
    rightOrWrong.style.color = "red";
    rightOrWrong.innerHTML = "INCORRECT!";
    //deduct time
    timeLeft = timeLeft - 10;
    timer.innerHTML = `${timeLeft}`;
    // out of time
    if (timeLeft <= 0) {
      timer.innerHTML = `Time is Up!`;
    }
  }
});

// Adding name to high scores

subHigh.addEventListener("click", function (e) {
  e.preventDefault();
  // validate input
  let userInput = userName.value;
  if (userInput === "" || userInput.length > 6) {
    document.querySelector("#inputError").innerHTML =
      "Please enter no more than six characters.";
    return;
  }
  // remove error message
  document.querySelector("#inputError").innerHTML = "";
  // make user name and score into a string
  userHighScore = `${userInput}: ${score}`;
  // push that string into local storage array
  highScoresArray.push(userHighScore);
  localStorage.setItem("highscores", JSON.stringify(highScoresArray));
  // add latest score to page
  renderNewScore();
  //stop user adding themselves lots of times
  subHigh.style.display = "none";
  userName.style.display = "none";
  document.querySelector("#namelabel").style.display = "none";
});

//render previous high scores from local storage array
function renderHighScores() {
  for (i = 0; i < highScoresArray.length; i++) {
    let userScore = document.createElement("li");
    userScore.innerText = `${
      JSON.parse(localStorage.getItem("highscores"))[i]
    }`;
    if (JSON.parse(localStorage.getItem("highscores"))[i] === undefined) {
      return;
    }
    highScores.appendChild(userScore);
  }
}

//render new score
function renderNewScore() {
  let userScore = document.createElement("li");
  userScore.innerText = `${userHighScore}`;
  highScores.appendChild(userScore);
}

// See score on time out
document.querySelector("#seeScore").addEventListener("click", results);

//restart buttons

const restartBtns = document.querySelectorAll(".reset");
for (let button of restartBtns) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    location.reload();
  });
}
