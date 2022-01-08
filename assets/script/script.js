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
let score = 0;
let highScoresArray = JSON.parse(localStorage.getItem("highscores"));

// Questions
const answerForm1 = function () {
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
  document.querySelector('input[name="quizOptions"]:checked').checked = false
  rightOrWrong.innerHTML = "";
  submit.style.display = "block";
  question.innerHTML = "Is Jichao Chinese?";
  op1.setAttribute("value", "correct");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "incorrect");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML = "Yes";
  op2Label.innerHTML = "No";
  op3Label.innerHTML = "Maybe";
  op4Label.innerHTML = "Don't know";
};

const answerForm3 = function () {
  document.querySelector('input[name="quizOptions"]:checked').checked = false
  rightOrWrong.innerHTML = "";
  submit.style.display = "block";
  question.innerHTML = "Question3";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "correct");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML = "answer1";
  op2Label.innerHTML = "answer2";
  op3Label.innerHTML = "answer3";
  op4Label.innerHTML = "answer4";
};

const answerForm4 = function () {
  document.querySelector('input[name="quizOptions"]:checked').checked = false
  rightOrWrong.innerHTML = "";
  submit.style.display = "block";
  question.innerHTML = "Question4";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "correct");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML = "answer1";
  op2Label.innerHTML = "answer2";
  op3Label.innerHTML = "answer3";
  op4Label.innerHTML = "answer4";
};

const answerForm5 = function () {
  document.querySelector('input[name="quizOptions"]:checked').checked = false
  rightOrWrong.innerHTML = "";
  submit.style.display = "block";
  question.innerHTML = "Question5";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "correct");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML = "answer1";
  op2Label.innerHTML = "answer2";
  op3Label.innerHTML = "answer3";
  op4Label.innerHTML = "answer4";
};

// Results view
const results = function () {

  // if local storage is empty give it an empty array to start off with
  if (localStorage.getItem("highscores") == null) {
    console.log(null)
    localStorage.setItem("highscores", "[]");
  }

  renderHighScores();
  document.getElementsByClassName("instructions")[0].style.display = "none";
  document.getElementsByClassName("instructions")[1].style.display = "none";
  timer.style.display = "none";
  answers.style.display = "none";
  document.querySelector("#results").style.display = "block";
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
    timer.innerHTML = `${timeLeft} seconds remaining.`;
    // Out of time
    if (timeLeft <= 0) {
      clearInterval(interval);
      timer.innerHTML = `Whoops! You ran out of time!`;
      document.querySelector("#timesUp").style.display = "block";
      answers.style.display = "none";
    }
  }, 1000);
};
// Begin timer & start button disappears
startBtn.addEventListener("click", countDown);
startBtn.addEventListener("click", () => {
  answerForm1();
  startBtn.style.display = "none";
  options.style.display = "flex";
});

// check answer and display next question
let questionArrayIndex = 0;
submit.addEventListener("click", (e) => {
  e.preventDefault();
  // make sure at least one answer is chosen
  if (document.querySelector('input[name="quizOptions"]:checked') == null){return}

  submit.style.display = "none";

  //move on to next question after 1s
  setTimeout(questionArray[questionArrayIndex], 1000);
  questionArrayIndex++;

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
    timer.innerHTML = `${timeLeft} seconds remaining.`;
    // out of time
    if (timeLeft <= 0) {
      timer.innerHTML = `Times Up!`;
    }
  }
});

// Adding name to high scores

subHigh.addEventListener("click", function (e) {
  e.preventDefault();
  let userInput = userName.value;
  if (userInput === "") {
    // add something to explain to user
    return;
  }
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
    if (JSON.parse(localStorage.getItem("highscores"))[i] === undefined) {return}
    highScores.appendChild(userScore);
  }
}

//render new score
function renderNewScore() {
  let userScore = document.createElement("li");
  userScore.innerText = `${userHighScore}`;
  highScores.appendChild(userScore);
}

//restart buttons

const restartBtns = document.querySelectorAll(".reset");
for (let button of restartBtns) {
button.addEventListener("click", (e) => {
  
  e.preventDefault();
  location.reload();
});}
