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

let score = 0;

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
    rightOrWrong.innerHTML=''
    submit.style.display = 'block'
  question.innerHTML = "Question2";
  op1.setAttribute("value", "incorrect");
  op2.setAttribute("value", "incorrect");
  op3.setAttribute("value", "correct");
  op4.setAttribute("value", "incorrect");
  op1Label.innerHTML = "answer1";
  op2Label.innerHTML = "answer2";
  op3Label.innerHTML = "answer3";
  op4Label.innerHTML = "answer4";
};

const answerForm3 = function () {
    rightOrWrong.innerHTML=''
    submit.style.display = 'block'
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
    rightOrWrong.innerHTML=''
    submit.style.display = 'block'
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
    rightOrWrong.innerHTML=''
    submit.style.display = 'block'
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

const results = function () {
    
}

let questionArray = [answerForm2, answerForm3, answerForm4, answerForm5]

// Timer function
let timeLeft = 60;
const countDown = function () {
  let interval = setInterval(function () {
    timeLeft--;
    timer.innerHTML = `${timeLeft} seconds remaining.`;

    if (timeLeft <= 0) {
      clearInterval(interval);
      timer.innerHTML = `Times Up!`;
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

// check answer
let i = 0
submit.addEventListener("click", (e) => {
  e.preventDefault();
  submit.style.display = 'none'
  setTimeout(questionArray[i], 1000)
  i++
    if (
    document.querySelector('input[name="quizOptions"]:checked').value ===
    "correct"
  ) {
      rightOrWrong.style.color = 'green'
    rightOrWrong.innerHTML = "CORRECT!";
    score = score + 10;
  } else {
      rightOrWrong.style.color = 'red'
    rightOrWrong.innerHTML = "INCORRECT!";
    timeLeft = timeLeft - 10;
    timer.innerHTML = `${timeLeft} seconds remaining.`;
    if (timeLeft <= 0) {
      timer.innerHTML = `Times Up!`;
    }
  }
});
