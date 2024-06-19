//Variables
let currentQuestion = 0;
let previousQuestion = -1;
let questionsAnswered = 0;
const ids = ["q0","q1","q2","q3"]


function nextQ() {
  currentQuestion++;
  previousQuestion++;
  console.log(currentQuestion)
  questionsAnswered++;
  let nextShow = document.getElementById(ids[currentQuestion]);
  nextShow.style.display = "block";
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none"; 
  }

