//Variables
let currentQuestion = 0;
let previousQuestion = -1;
let questionsAnswered = 0;
const ids = ["q0","q1","q2","q3"]

//Function to start quiz and show next question in the survery
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

// Function to capture radio input and add it to final report
function addtoreport() {
  document.getElementById("report").innerHTML = "";
  var ele = document.getElementsByTagName('input');
  for (i = 0; i < ele.length; i++) {
      if (ele[i].type = "radio") {

          if (ele[i].checked)
              document.getElementById("report").innerHTML
                  += ele[i].name + ele[i].value + "<br>";
      }
  }
}

  //function myFunction(num) {
  //  document.getElementById('mcheck').src = num + "bicycle_m.png";
  //}
  //  myFunction(1);

