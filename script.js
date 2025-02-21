const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "Which language runs in a web browser?",
        answers: ["Java", "C", "Python", "JavaScript"],
        correct: 3
    },
    {
        question: "What does CSS stand for?",
        answers: [
            "Central Style Sheets",
            "Cascading Style Sheets",
            "Coded Style Sheets",
            "Computer Style Sheets"
        ],
        correct: 1
    },
    {
        question: "What does HTML stand for?",
        answers: [
            "HyperText Markup Language",
            "Hyper Transfer Markup Language",
            "HighText Machine Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        answers: ["<link>", "<a>", "<href>", "<hlink>"],
        correct: 1
    },
    {
        question: "Which CSS property is used to change text color?",
        answers: ["font-color", "text-color", "color", "text-style"],
        correct: 2
    },
    {
        question: "Which programming language is known as the 'language of the web'?",
        answers: ["Python", "JavaScript", "C++", "Ruby"],
        correct: 1
    },
    {
        question: "What is the default HTTP method for a form submission?",
        answers: ["GET", "POST", "PUT", "DELETE"],
        correct: 0
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        answers: [
            "getElementById()",
            "querySelector()",
            "getElement()",
            "selectById()"
        ],
        correct: 0
    },
    {
        question: "What is the purpose of the `<head>` section in HTML?",
        answers: [
            "To define the body structure",
            "To contain metadata and links to external resources",
            "To create the main content of the page",
            "To store JavaScript functions"
        ],
        correct: 1
    },
    {
        question: "Which of these is NOT a valid JavaScript data type?",
        answers: ["Boolean", "Integer", "String", "Object"],
        correct: 1
    },
    {
        question: "Which CSS property makes a webpage responsive?",
        answers: ["width", "max-width", "height", "display"],
        correct: 1
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        answers: ["//", "/* */", "<!-- -->", "^^"],
        correct: 0
    },
    
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;
let timerInterval;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    console.log("Loading question..."); // Debugging check
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => checkAnswer(index));
        answerButtons.appendChild(button);
    });

    startTimer(); 
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = ""; 
}

function startTimer() {
    clearInterval(timerInterval); 
    timeLeft = 30; 
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to next question.");
            showNextQuestion(); 
        }
    }, 1000);
}

function checkAnswer(index) {
    clearInterval(timerInterval); 

    let correctIndex = questions[currentQuestionIndex].correct;
    let isCorrect = index === correctIndex;

    showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
    clearInterval(timerInterval); // Stop the timer

    if (isCorrect) {
        document.body.style.backgroundColor = "lightgreen";
        score++;
    } else {
        document.body.style.backgroundColor = "lightcoral";
    }

    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        nextQuestion(); // Move to next question automatically
    }, 1000);
}



function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.innerText = "Quiz Completed!";
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";
        scoreElement.innerText = `Your score: ${score} / ${questions.length}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");
    loadQuestion();
});

nextButton.addEventListener("click", nextQuestion);
