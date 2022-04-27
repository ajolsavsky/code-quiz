var startButton = document.getElementById("start-button");
var timer = document.getElementById("timer-count");
var quizSection = document.querySelector(".quiz");
var introSection = document.querySelector(".intro");
var resultsSection = document.querySelector(".results");
var question = document.getElementById("question");

// var questionsArray = [];
var score = 0;
var currentQuestion = {};


startButton.addEventListener("click", function () {
    console.log("The button was clicked.");
    setTime();
    playGame();
}
);

var secondsLeft = timer.textContent;


var questionsList = [
    {
        id: 0,
        question: "What is my name?",
        answers: [
            { text: "Alex", isCorrect: true },
            { text: "Greg", isCorrect: false },
            { text: "Joe", isCorrect: false},
            { text: "Tina", isCorrect: false}
        ]
    },
    {
		id: 1,
        question: "What is 30/3?",
		answers: [
            { text: "3", isCorrect: false },
            { text: "10", isCorrect: true },
            { text: "88", isCorrect: false},
            { text: "164", isCorrect: false}
        ]
    },
    {
		id: 2,
        question: "Sample question three",
		answers: [
            { text: "Sample 1", isCorrect: false },
            { text: "Sample 2", isCorrect: false },
            { text: "Sample TRUE", isCorrect: true },
            { text: "Sample 4", isCorrect: false}
        ]
    },
    {
		id: 3,
        question: "Sample question four",
		answers: [
            { text: "Sample 1", isCorrect: false },
            { text: "Sample 2", isCorrect: false },
            { text: "Sample 3", isCorrect: false },
            { text: "Sample TRUE", isCorrect: true }
        ]
    },
];

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 100);
};

function playGame() {
    console.log("The game has started.");
    introSection.setAttribute("hidden", true);
    quizSection.removeAttribute("hidden");
    getNewQuestion();
};

function getNewQuestion() {
    var activeQuestion = document.getElementsByClassName("question");
    question.innerText = questionsList[id].question;

    var choice1 = document.getElementById("choice1");
    var choice2 = document.getElementById("choice2");
    var choice3 = document.getElementById("choice3");
    var choice4 = document.getElementById("choice4");

    choice1.innerText = questionsList[id].answers[0].isCorrect;
    choice2.innerText = questionsList[id].answers[1].isCorrect;
    choice3.innerText = questionsList[id].answers[2].isCorrect;
    choice4.innerText = questionsList[id].answers[3].isCorrect;
};

function sendMessage() {
    quizSection.setAttribute("hidden", true);
    resultsSection.removeAttribute("hidden");
    console.log("The timer is over.")
};