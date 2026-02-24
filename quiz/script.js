const questions = [
    {
        question: 'Which of the following is used to declare a variable that can be reassigned?',
        answers: [{ text: 'const', correct: false }, { text: 'let', correct: true }, { text: 'static', correct: false }, { text: 'fixed', correct: false }]
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [{ text: 'var colors = "red", "green"', correct: false }, { text: 'var colors = ["red", "green"]', correct: true }]
    },
    {
        question: 'Which operator compares both value and type?',
        answers: [{ text: '==', correct: false }, { text: '===', correct: true }, { text: '!=', correct: false }]
    },
    {
        question: 'What does "DOM" stand for?',
        answers: [{ text: 'Data Object Model', correct: false }, { text: 'Document Object Model', correct: true }]
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [{ text: 'function:myFn()', correct: false }, { text: 'function myFn()', correct: true }]
    },
    {
        question: 'What is the output of: console.log(typeof NaN)?',
        answers: [{ text: '"number"', correct: true }, { text: '"NaN"', correct: false }]
    },
    {
        question: 'Which method adds a new element to the end of an array?',
        answers: [{ text: 'pop()', correct: false }, { text: 'push()', correct: true }]
    }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const progressText = document.getElementById('progress');
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result-container');

function startQuiz() {
    // Shuffle questions using sort
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = shuffledQuestions[currentQuestionIndex];
    progressText.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(button, answer.correct));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selectedButton, isCorrect) {
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
    } else {
        selectedButton.classList.add('wrong');
    }

    // Show correct answer if user was wrong
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true; // Stop multiple clicks
    });

    nextButton.classList.remove('hide');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    document.getElementById('quiz-header').classList.add('hide');
    document.getElementById('score-text').innerText = `${score} / ${shuffledQuestions.length}`;
    
    const feedback = score > 4 ? "Excellent Job! 🎉" : "Keep Learning! 📚";
    document.getElementById('feedback-text').innerText = feedback;
}

startQuiz();s