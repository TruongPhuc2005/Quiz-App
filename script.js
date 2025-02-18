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
    }
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

    startTimer(); // Start timer when loading a question
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = ""; // Clear previous buttons
}

function startTimer() {
    clearInterval(timerInterval); // Clear any existing timer
    timeLeft = 10; // Reset timer
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to next question.");
            showNextQuestion(); // Auto-move to next question
        }
    }, 1000);
}

function checkAnswer(index) {
    clearInterval(timer); // Stop the timer

    let correctIndex = questions[currentQuestionIndex].correct;
    let isCorrect = index === correctIndex;

    showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
    if (isCorrect) {
        document.body.style.backgroundColor = "lightgreen";
        score++;
    } else {
        document.body.style.backgroundColor = "lightcoral";
    }

    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        nextQuestion();
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
    startTimer();
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");
    loadQuestion();
});

nextButton.addEventListener("click", nextQuestion);
startTimer();