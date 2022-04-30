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

var results = document.getElementById("final-results");
var submitScoreButton = document.getElementById("submit-score");

var highScoresArray = [];
var highScoresSection = document.querySelector(".highscores");

//Start button events
startButton.addEventListener("click", function () {
    setTime();
    playGame();
}
);

//Gets timer text
var secondsLeft = timer.textContent;

//Array of questions for quiz
var questionsList = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "<scripting>", isCorrect: true },
            { text: "<js>", isCorrect: false },
            { text: "<javascript>", isCorrect: false},
            { text: "<script>", isCorrect: false}
        ]
    },
    {
        question: "What is the correct JavaScript syntax to change the content of this HTML element? <p id='demo'>This is a demonstration.</p>",
		answers: [
            { text: "#demo.innerHTML = 'Hello World!';", isCorrect: false },
            { text: "document.getElementByID('demo').innerHTML = 'Hello World!';", isCorrect: true },
            { text: "document.getElement('p').innerHTML = 'Hello World!';", isCorrect: false},
            { text: "document.getElementByName('p').innerHTML = 'Hello World!';", isCorrect: false}
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
		answers: [
            { text: "Both the <head> section and the <body> section are correct", isCorrect: false },
            { text: "The <body> section", isCorrect: true },
            { text: "The <head> section", isCorrect: false },
            { text: "In a separate document", isCorrect: false }
        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
		answers: [
            { text: "<script name='xxx.js'>", isCorrect: false },
            { text: "<script href='xxx.js'>", isCorrect: true },
            { text: "<script src='xxx.js'>", isCorrect: false },
            { text: "<script class='xxx.js'>", isCorrect: false }
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
		answers: [
            { text: "alert('Hello World');", isCorrect: true },
            { text: "msgBox('Hello World');'>", isCorrect: false },
            { text: "msg('Hello World');", isCorrect: false },
            { text: "alertBox('Hello World');", isCorrect: false }
        ]
    },
    {
        question: "How do you create a function in JavaScript?",
		answers: [
            { text: "function = myFunction()", isCorrect: false },
            { text: "function:myFunction()", isCorrect: false },
            { text: "function myFunction()", isCorrect: true },
            { text: "function.myFunction()", isCorrect: false }
        ]
    },
    {
        question: "How do you call a function named 'myFunction'?",
		answers: [
            { text: "myFunction()", isCorrect: true },
            { text: "call function myFunction()", isCorrect: false },
            { text: "call myFunction()", isCorrect: false },
            { text: "myFunction", isCorrect: false }
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
		answers: [
            { text: "if i == 5 then", isCorrect: false },
            { text: "if i = 5 then", isCorrect: false },
            { text: "if(i == 5)", isCorrect: true },
            { text: "if i = 5", isCorrect: false }
        ]
    },
    {
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
		answers: [
            { text: "if(i <> 5)", isCorrect: false },
            { text: "if i <> 5", isCorrect: false },
            { text: "if (i !=5)", isCorrect: true },
            { text: "if i =! 5 then", isCorrect: false }
        ]
    },
    {
        question: "How does a FOR loop start?",
		answers: [
            { text: "for (i <= 5; i++)", isCorrect: false },
            { text: "for (i = 0; i <= 5; i++)", isCorrect: true },
            { text: "for (i = 0; i <= 5)", isCorrect: false },
            { text: "for i = 1 to 5", isCorrect: false }
        ]
    }
];

//Countdown function
var timerInterval;

function setTime() {
    timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;

        //If the timer is at 0, the game is over
        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            timerBox.setAttribute("hidden", true);
            sendMessage();
            return;
        }
    }, 1000);
};


function playGame() {
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
        clearInterval(timerInterval);
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
        //Adds 10 points to score total
        score += 10;
    } else {
        //Removes 10 seconds from the timer
        secondsLeft -= 10;
    }
    //Populates a new question
    renderQuestion()
});

choice2.addEventListener("click", function() {
    if (choice2.value === "true") {
        score += 10;
    } else {
        secondsLeft -= 10;
    }
    renderQuestion()
});

choice3.addEventListener("click", function() {
    if (choice3.value === "true") {
        score += 10;
    } else {
        secondsLeft -= 10;
    }
    renderQuestion()
});

choice4.addEventListener("click", function() {
    if (choice4.value === "true") {
        score += 10;
    } else {
        secondsLeft -= 10;
    }
    renderQuestion()
});

//Score screen
function sendMessage() {
    //Hides quiz screen and displays results form
    quizSection.setAttribute("hidden", true);
    resultsSection.removeAttribute("hidden");
    //Displays final score
    results.textContent = "Your final score is " + score + "!"
};


    submitScoreButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        var initials = document.getElementById("initials").value;
        
        if (initials === "") {
            alert("Entry is blank - please write your initials!")
        } else {
            init();

            var userEntry = initials + " " + score;
            highScoresArray.push(userEntry);
            localStorage.setItem ("highscore", JSON.stringify(highScoresArray))
            renderHighscore(highScoresArray);

        }
    })

function renderHighscore(array) {
    resultsSection.setAttribute("hidden", true);
    highScoresSection.removeAttribute("hidden");
    

    for (var i=0; i < array.length; i++) {
        var userEntry = array[i];
        var li = document.createElement("li");
        li.textContent = userEntry;
        li.setAttribute("data-index", i);

        highScoresSection.appendChild(li);
    }
}



function init() {
    var storedHighscores = JSON.parse(localStorage.getItem("highscore"));

    if (storedHighscores !== null) {
        highScoresArray = storedHighscores;
    }
}