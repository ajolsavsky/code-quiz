var startButton = document.getElementById("start-button");
var timer = document.getElementById("timer-count");
var timerBox = document.getElementById("timer")
var quizSection = document.querySelector(".quiz");
var introSection = document.querySelector(".intro");
var resultsSection = document.querySelector(".results");

var liveQuestion = document.getElementById("live-question");
var liveAnswers = document.getElementsByClassName("answer");

var choice1 = document.getElementById("choice1");
var choice2 = document.getElementById("choice2");
var choice3 = document.getElementById("choice3");
var choice4 = document.getElementById("choice4");

var questionsArray = [];
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

        //If the timer is at 0, the game is over
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            timerBox.setAttribute("hidden", true);
            sendMessage();
            return;
        }
    }, 100);
};

function playGame() {
    console.log("The game has started.");
    //Changes displays to remove intro section and display game
    introSection.setAttribute("hidden", true);
    quizSection.removeAttribute("hidden");
    //Creates a copy of the questions list
    questionsArray = [...questionsList];
    renderQuestion();
};

function renderQuestion() {
    //If the questions array is empty, the game is over
    if(questionsArray.length === 0){
        console.log("There are no more questions.")
        timerBox.setAttribute("hidden", true);
        sendMessage();
        return;
    };

    //Creates a selector number from the available questions
    var questionIndex = Math.floor(Math.random() * questionsArray.length);
    
    //Populates currentQuestion with the randomly selected question index of the existing array
    currentQuestion = questionsArray[questionIndex];
    
    //Applies currentQuestion text to the h1 w/ live question id on the page
    liveQuestion.innerText = currentQuestion.question;
    
    //Applies currentQuestion text answers from array position to choice 1-4 ids on the page
    choice1.innerText = currentQuestion.answers[0].text;
    choice2.innerText = currentQuestion.answers[1].text;
    choice3.innerText = currentQuestion.answers[2].text;
    choice4.innerText = currentQuestion.answers[3].text;

    //Remove active question from the array
    questionsArray.splice(questionIndex, 1);

    //Assigns true or false values to answer buttons
    choice1.value = currentQuestion.answers[0].isCorrect;
    choice2.value = currentQuestion.answers[1].isCorrect;
    choice3.value = currentQuestion.answers[2].isCorrect;
    choice4.value = currentQuestion.answers[3].isCorrect;

};

//Assigns conditions to each button
choice1.addEventListener("click", function() {
    if (choice1.value === "true") {
        console.log("This answer was correct.");
        //Adds 10 points to score total
        score += 10;
        console.log("The current score is " + score)
    } else {
        console.log("This answer was incorrect.");
        //Removes 10 seconds from the timer
        secondsLeft -= 10;
    }
    //Populates a new question
    renderQuestion()
});

choice2.addEventListener("click", function() {
    if (choice2.value === "true") {
        console.log("This answer was correct.")
        score += 10;
        console.log("The current score is " + score)
    } else {
        console.log("This answer was incorrect.")
        secondsLeft -= 10;
    }
    renderQuestion()
});

choice3.addEventListener("click", function() {
    if (choice3.value === "true") {
        console.log("This answer was correct.")
        score += 10;
        console.log("The current score is " + score)
    } else {
        console.log("This answer was incorrect.")
        secondsLeft -= 10;
    }
    renderQuestion()
});

choice4.addEventListener("click", function() {
    if (choice4.value === "true") {
        console.log("This answer was correct.")
        score += 10;
        console.log("The current score is " + score)
    } else {
        console.log("This answer was incorrect.")
        secondsLeft -= 10;
    }
    renderQuestion()
});

//Score screen
function sendMessage() {
    quizSection.setAttribute("hidden", true);
    resultsSection.removeAttribute("hidden");
    console.log("The game is over.")
};