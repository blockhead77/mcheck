//Variables
let currentQuestion = 0;
let previousQuestion = -1;
const ids = ["q0","q1","q2","q3","q4","q5","q6","q7","q8","q9","q10","q11","q12","q13","q14","q15","q16","q17","q18","q19","q20"]

//Function to start quiz and show next question in the survery
function nextQ() {
  currentQuestion++;
  previousQuestion++;
  let nextShow = document.getElementById(ids[currentQuestion]);
  nextShow.style.display = "block";
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none"; 
  }
function showReport() {
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none"; 
  let reportshow = document.getElementById("bike-report");
  preHide.style.display = "block"; 
}
// Function to capture radio input and add it to final report
function addToReport() {
  document.getElementById("report").innerHTML =" ";
  var ele = document.getElementsByTagName('input');
  for (i = 0; i < ele.length; i++) {
      if (ele[i].type = "radio") {

          if (ele[i].checked)
              document.getElementById("report").innerHTML
                  += ele[i].name + ele[i].value + "<br>";
      }
  }
}

function nextQuestion (){
    addToReport();
    nextQ();
    }

function startQuiz (){
        nextQ();
  }