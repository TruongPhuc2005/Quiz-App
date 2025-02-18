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
    {
        question: "What is C++ primarily used for?",
        answers: [
            "Web development",
            "Game development, system programming, and software applications",
            "Mobile app development",
            "Data analysis and visualization"
        ],
        correct: 1
    },
    {
        question: "Which of the following is a valid C++ data type?",
        answers: ["float", "decimal", "real", "number"],
        correct: 0
    },
    {
        question: "What is the correct syntax to print 'Hello, World!' in C++?",
        answers: [
            "System.out.println('Hello, World!');",
            "print('Hello, World!');",
            "cout << 'Hello, World!';",
            "Console.WriteLine('Hello, World!');"
        ],
        correct: 2
    },
    {
        question: "Which header file is needed for input and output operations in C++?",
        answers: ["<input.h>", "<iostream>", "<stdio.h>", "<stream.h>"],
        correct: 1
    },
    {
        question: "What is the default access specifier for class members in C++?",
        answers: ["public", "private", "protected", "none"],
        correct: 1
    },
    {
        question: "Which operator is used to allocate memory dynamically in C++?",
        answers: ["malloc", "new", "alloc", "create"],
        correct: 1
    },
    {
        question: "Which C++ feature allows multiple functions with the same name but different parameters?",
        answers: ["Encapsulation", "Function Overloading", "Inheritance", "Polymorphism"],
        correct: 1
    },
    {
        question: "Which of the following correctly declares a pointer in C++?",
        answers: ["int ptr;", "int *ptr;", "pointer<int> ptr;", "ptr int;"],
        correct: 1
    },
    {
        question: "What happens when the `delete` operator is used on a pointer?",
        answers: [
            "It frees the allocated memory",
            "It deletes the pointer variable",
            "It removes the value stored in the pointer",
            "It resets the pointer to null"
        ],
        correct: 0
    },
    {
        question: "Which C++ concept allows a derived class to use base class methods?",
        answers: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
        correct: 2
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