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
let timerInterval;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function loadQuestion() {
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
    timerElement.innerText = `Time left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time left: ${timeLeft}s`;

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
    if (isCorrect) {
        document.body.style.backgroundColor = "lightgreen";
        score++;
    } else {
        document.body.style.backgroundColor = "lightcoral";
    }

    setTimeout(() => {
        document.body.style.backgroundColor = "white";
        nextButton.style.display = "inline-block";
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    document.querySelector(".quiz-container").innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: <strong>${score} / ${questions.length}</strong></p>
        <p>${getMessage()}</p>
        <button onclick="restartQuiz()" class="btn">Restart Quiz</button>
    `;
}

function getMessage() {
    let percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🎉 Perfect score! Excellent job!";
    if (percentage >= 70) return "😊 Great job! Keep it up!";
    if (percentage >= 40) return "😌 Not bad! You can do better!";
    return "😢 Keep practicing! Try again!";
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector(".quiz-container").innerHTML = `
        <h1>Quiz App</h1>
        <div id="question-container">
            <p id="question">Loading...</p>
            <div id="answer-buttons" class="btn-container"></div>
            <p id="timer">Time left: 10s</p>
        </div>
        <button id="next-btn" style="display: none;">Next</button>
        <p id="score"></p>
    `;
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});

nextButton.addEventListener("click", nextQuestion);
