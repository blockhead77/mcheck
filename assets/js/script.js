//Variables
let currentQuestion = 0;
let previousQuestion = -1;
const ids = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20"]

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
  let nextShow = document.getElementById("mcheck-report");
  nextShow.style.display = "block";
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none";
}
// Function to capture radio input and add it to final report
function addToReport() {
  document.getElementById("report").innerHTML = " ";
  var ele = document.getElementsByTagName('input');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].type = "radio") {

      if (ele[i].checked)
        document.getElementById("report").innerHTML
          += ele[i].name + ele[i].value + "<br>";
    }
  }
}

//Function to show the report
function showReport() {
  currentQuestion++;
  previousQuestion++;
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none";
  let reportshow = document.getElementById("mcheck-report");
  reportshow.style.display = "block";
}
//Function to update the m-check image with progress
function updateCheckImage() {
  if (currentQuestion == 0) {
    document.getElementById('mcheck').src = "/assets/img/bicycle_m.png";
  } else if (currentQuestion >= 1 && currentQuestion <= 3) {
    document.getElementById('mcheck').src = "/assets/img/check1.png";
  } else if (currentQuestion >= 4 && currentQuestion <= 5) {
    document.getElementById('mcheck').src = "/assets/img/check2.png";
  } else if (currentQuestion >= 6 && currentQuestion <= 7) {
    document.getElementById('mcheck').src = "/assets/img/check3.png";
  } else if (currentQuestion >= 8 && currentQuestion <= 9) {
    document.getElementById('mcheck').src = "/assets/img/check4.png";
  } else if (currentQuestion >= 10 && currentQuestion <= 12) {
    document.getElementById('mcheck').src = "/assets/img/check5.png";
  }
}
//Function to show next question
function nextQuestion() {
  addToReport();
  nextQ();
  updateCheckImage();
}

function startQuiz() {
  nextQ();
  updateCheckImage();
}
window.onload = updateCheckImage;