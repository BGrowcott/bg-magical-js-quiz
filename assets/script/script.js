const timer = document.querySelector("#timer");
const startBtn = document.querySelector("#startBtn");
const question = document.querySelector('#question');
const answers = document.querySelector('#answers')
const submit = document.querySelector('#submit')
const rightOrWrong = document.querySelector('#RorW')

const q1 = 'Which of these functions has INCORRECT syntax?'
const q1Answers = function() {
    let options = document.createElement('form')
    let op1 = document.createElement('input')
    let op1Label = document.createElement('label')
    let op2 = document.createElement('input')
    let op2Label = document.createElement('label')
    let op3 = document.createElement('input')
    let op3Label = document.createElement('label')
    let op4 = document.createElement('input')
    let op4Label = document.createElement('label')
    op1.setAttribute('id', 'op1')
    op1.setAttribute('type', 'radio')
    op1.setAttribute('name', 'quiz1')
    op1.setAttribute('value', 'incorrect')
    op1Label.setAttribute('for', 'op1')
    op2.setAttribute('id', 'op2')
    op2.setAttribute('type', 'radio')
    op2.setAttribute('name', 'quiz1')
    op2.setAttribute('value', 'incorrect')
    op2Label.setAttribute('for', 'op2')
    op3.setAttribute('id', 'op3')
    op3.setAttribute('type', 'radio')
    op3.setAttribute('name', 'quiz1')
    op3.setAttribute('value', 'incorrect')
    op3Label.setAttribute('for', 'op3')
    op4.setAttribute('id', 'op4')
    op4.setAttribute('type', 'radio')
    op4.setAttribute('name', 'quiz1')
    op4.setAttribute('value', 'correct')
    op4Label.setAttribute('for', 'op4')
    op1Label.innerHTML = 'let sum = function (x, y) {return x + y}'
    op2Label.innerHTML = 'function square (x) {return x * x}'
    op3Label.innerHTML = 'let square = x => {return x * x}'
    op4Label.innerHTML = 'let sum = x, y => {return x + y}'
    let answerArray = [op1, op1Label, op2, op2Label, op3, op3Label, op4, op4Label, submit]
    for (let el of answerArray) {
        options.appendChild(el)
    }
    return options
}


// Timer function
let timeLeft = 60;
const countDown = function () {
  let interval = setInterval(function () {
    timeLeft--;
    timer.innerHTML = `${timeLeft} seconds remaining.`;

    if (timeLeft === 0) {
      clearInterval(interval);
    }
  }, 1000);
};
// Begin timer with start button & start button disappears
startBtn.addEventListener("click", countDown);
startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  submit.style.display = "block";
  question.innerHTML = q1
  answers.appendChild(q1Answers())
});
submit.addEventListener('click', (e) => {
    e.preventDefault()
    if (document.querySelector('input[name="quiz1"]:checked').value === 'correct') {
        rightOrWrong.innerHTML = 'CORRECT!'
    }
    else {rightOrWrong.innerHTML = 'INCORRECT!'}
})



