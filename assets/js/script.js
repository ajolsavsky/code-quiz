console.log("JS is working");

var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer-count");
var pageTitle = document.querySelector(".page-title");
var openingParagraph = document.querySelector(".opening-paragraph")
var quizHeader = document.querySelector(".quiz-header")
var quizList = document.querySelector(".quiz-list")
var button1 = document.querySelector("#option-1")
var button2 = document.querySelector("#option-2")
var button3 = document.querySelector("#option-3")
var button4 = document.querySelector("#option-4")

var secondsLeft = 60;

startButton.addEventListener("click", function () {
  console.log("Start button clicked");
  setTime();
  quizQuestion();
});

function setTime() {
  //sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timerElement.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      //call sendMessage function
    }
  }, 1000);
}

function quizQuestion() {
//Clear out and hide existing content//
  pageTitle.setAttribute("hidden", true);
  openingParagraph.setAttribute("hidden", true);
  startButton.setAttribute("hidden", true);

//Populate question one//
  quizHeader.textContent = "Placeholder question 1 text to populate from array";
  button1.textContent = "Placeholder button 1 text"
  button2.textContent = "Placeholder button 2 text"
  button3.textContent = "Placeholder button 3 text"
  button4.textContent = "Placeholder button 4 text"
  quizList.removeAttribute("hidden");
  quizHeader.removeAttribute("hidden");
}



//array of sample questions//
var myQuestions = [
	{
		question: "What is my name?",
		answers: {
			a: 'Alex',
			b: 'Greg',
			c: 'Joe',
      d: 'Hamlet'
		},
		correctAnswer: 'a'
	},
	{
		question: "What is 30/3?",
		answers: {
			a: '3',
			b: '5',
			c: '10',
      d: '825'
		},
		correctAnswer: 'c'
	}
];