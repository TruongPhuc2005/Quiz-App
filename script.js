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
}

function resetState() {
    nextButton.style.display = "none";
    answerButtons.innerHTML = ""; // Clear previous buttons
}

function checkAnswer(index) {
    if (index === questions[currentQuestionIndex].correct) {
        score++;
    }
    nextButton.style.display = "block"; // Show "Next" button
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.innerText = "Quiz Completed!";
        answerButtons.innerHTML = "";
        nextButton.style.display = "none";
        scoreElement.innerText = `Your score: ${score} / ${questions.length}`;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded");
    loadQuestion();
});

