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
            "Hypertext Markup Language",
            "Hypertext Markdown Language",
            "Hyperloop Machine Language",
            "Helicopter Terminals Motorboats Lamborginis"
        ],
        correct: 0
    },
    {
        question: "What year was JavaScript launched?",
        answers: ["1996", "1995", "1994", "none of the above"],
        correct: 1
    },
    {
        question: "What is the capital of Spain?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of Italy?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 3
    },
    {
        question: "What is the capital of Germany?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 0
    },
    {
        question: "What is the capital of Portugal?",
        answers: ["Berlin", "Madrid", "Lisbon", "Rome"],
        correct: 2
    },
    {
        question: "What is the capital of the Netherlands?",
        answers: ["Amsterdam", "Madrid", "Paris", "Rome"],
        correct: 0
    },
    {
        question: "What is the capital of Vietnam?",
        answers: ["Berlin", "Hanoi", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of Thailand?",
        answers: ["Berlin", "Bangkok", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of the United States?",
        answers: ["Washington D.C.", "Madrid", "Paris", "Rome"],
        correct: 0
    },
    {
        question: "What is the capital of Brazil?",
        answers: ["Berlin", "Madrid", "Paris", "Brasilia"],
        correct: 3
    },
    {
        question: "What is the capital of Australia?",
        answers: ["Berlin", "Canberra", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of Canada?",
        answers: ["Berlin", "Madrid", "Ottawa", "Rome"],
        correct: 2
    },
    {
        question: "What is the capital of China?",
        answers: ["Beijing", "Madrid", "Paris", "Rome"],
        correct: 0
    },
    {
        question: "What is the capital of India?",
        answers: ["Berlin", "Madrid", "Paris", "New Delhi"],
        correct: 3
    },
    {
        question: "What is the capital of Japan?",
        answers: ["Berlin", "Tokyo", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of South Korea?",
        answers: ["Berlin", "Seoul", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of Russia?",
        answers: ["Berlin", "Moscow", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of Mexico?",
        answers: ["Berlin", "Madrid", "Mexico City", "Rome"],
        correct: 2
    },
    {
        question: "What is the capital of Argentina?",
        answers: ["Berlin", "Madrid", "Paris", "Buenos Aires"],
        correct: 3
    },
    {
        question: "What is the capital of Egypt?",
        answers: ["Berlin", "Cairo", "Paris", "Rome"],
        correct: 1
    },
    {
        question: "What is the capital of South Africa?",
        answers: ["Berlin", "Madrid", "Paris", "Pretoria"], 
        correct: 3
    },
    {
        question: "What is the capital of Nigeria?",
        answers: ["Berlin", "Madrid", "Paris", "Abuja"],    
        correct: 3
    },
    {
        question: "What is the capital of Kenya?",
        answers: ["Berlin", "Madrid", "Paris", "Nairobi"],  
        correct: 3
    },
    {
        question: "What is the capital of Ghana?",
        answers: ["Berlin", "Madrid", "Paris", "Accra"],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const correctSound = new Audio('/sounds/correct.mp3');  
const wrongSound = new Audio('/sounds/wrong.mp3');     
correctSound.load();
wrongSound.load();

const quizContainer = document.querySelector(".quiz-container");

function loadQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h1>Quiz App</h1>
        <div id="question-container">
            <p id="question">${currentQuestion.question}</p>
            <div id="answer-buttons" class="btn-container">
                ${currentQuestion.answers.map((answer, index) =>
                    `<button class="btn" onclick="checkAnswer(${index})">${answer}</button>`
                ).join('')}
            </div>
            <p id="timer">Time left: ${timeLeft}s</p>
        </div>
        <button id="next-btn" style="display: none;" onclick="nextQuestion()">Next</button>
        <p id="score"></p>
    `;
    startTimer();
}

function resetState() {
    clearInterval(timerInterval);
}

function startTimer() {
    timeLeft = 60;
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

    if (isCorrect) {
        score++;
        correctSound.play();
    } else {
        wrongSound.play(); 
    }

    document.getElementById("next-btn").style.display = "inline-block";
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
    quizContainer.innerHTML = `
        <h1>Quiz Completed!</h1>
        <p>Your score: <strong>${score} / ${questions.length}</strong></p>
        <p>${getMessage()}</p>
        <button onclick="restartQuiz()" class="btn">Restart Quiz</button>
    `;
    nextButton.style.display = "none"; 
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
    loadQuestion();
}

document.addEventListener("DOMContentLoaded", loadQuestion);
