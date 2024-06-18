
// List of questions from section 1 to 5 of the m-check
const questions = [
{
question: ["Rear Tyre Pressure", "Squeeze your tyre to check the air. How would you say it feels? Can you sit on the saddle without the tyre squashing too much?"],
answer: ["Nice and firm", "A bit soft", "Totally flat"],
rating: ["Good", "Warning", "Danger"]
},
{
question: ["Tyre Condition", " Check for any cracks or splits. Look to see if the tyre tread is warn down or damaged. How would you rate it?"],
answer: ["Great, plenty of tread", "Some cracks, bit worn", "Lots of cracks and splits, very little tread left."],
rating: ["Good", "Warning", "Danger"]
  },
// More questions to be added here...
];
let currentQuestion = 0;
let questionsAnswered = 0;

function showQuestion() {
let questionTitle = document.getElementById("question-title");
questionTitle.textContent = questions[currentQuestion].question[0];

let questionText = document.getElementById("question-text");
questionText.textContent = questions[currentQuestion].question[1];

let answers = document.querySelector('input[value=value]').value
  choices.forEach((choice, index) => {
    choice.textContent = questions[currentQuestion].choices[index];
  });
}


function nextQuestion() {
  currentQuestion++;
  console.log(currentQuestion)
  questionsAnswered++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    const quizContainer = document.querySelector(".mcheck-container");
    quizContainer.innerHTML = `<p>You answered ${questionsAnswers}.</p>`;
  }
}
showQuestion();