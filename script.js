var startBtn = document.getElementById('start-btn')
var questionContainerEl = document.getElementById('question-container')
var questionEl = document.getElementById('question')
var answerBtnsEl = document.getElementById('answer-buttons')
var timeEL = document.getElementById('timer')
var main = document.getElementById('main')

var timeRemaining = 60
var questionIndex

startBtn.addEventListener("click", startQuiz)

function startQuiz() {
    startBtn.classList.add("hide")
    questionIndex = 0
    questionContainerEl.classList.remove("hide")
    startTimer()
    advanceQuestion()
}

function advanceQuestion() {
    resetAnswers()
    showQuestion(questions[questionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerBtnsEl.appendChild(button)
    })
}

function resetAnswers() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild)
    }
}

function selectAnswer(e) {
    var btnSelect = e.target
    var correct = btnSelect.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtnsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (questions.length >= questionIndex + 1) {
            questionIndex++
            advanceQuestion()
    } 
    else {
        endQuiz()
    }
    if (btnSelect != correct) {
        timeRemaining = timeRemaining - 5
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function startTimer() {
    var timerInterval = setInterval(function() {
        timeRemaining--
        timeEL.textContent = "Time: " + timeRemaining

        if (timeRemaining === 0 || questions.length <= questionIndex) {
            clearInterval(timerInterval)
            endQuiz()
        }
    }, 1000)
}

function endQuiz() {
    questionContainerEl.classList.add("hide")
    finishDiv = document.createElement("div")
    finishDiv.textContent = "All Done!"
    main.appendChild(finishDiv)
    scoreDiv = document.createElement("div")
    scoreDiv.textContent = "Your score: " + timeRemaining
    finishDiv.appendChild(scoreDiv)
    clearInterval(timerInterval)
}

var questions = [
    {
      question: 'As of Season 6, which of these weapons cannot be found in care packages?',
      answers: [
        { text: 'Devotion', correct: true },
        { text: 'R-99', correct: false },
        { text: 'Kraber', correct: false },
        { text: 'Peacekeer', correct: false }
      ]
    },
    {
      question: 'The Volt is classified as which weapon type?',
      answers: [
        { text: 'SMG', correct: true },
        { text: 'LMG', correct: false },
        { text: 'AR', correct: false },
        { text: 'Sniper', correct: false }
      ]
    },
    {
      question: 'Which of these legends is not a member of the recon class?',
      answers: [
        { text: 'Pathfinder', correct: false },
        { text: 'Wraith', correct: true },
        { text: 'Crypto', correct: false },
        { text: 'Bloodhound', correct: false }
      ]
    },
    {
      question: 'Which legend has the longest cooldown for their ultimate ability?',
      answers: [
        { text: 'Gibraltar', correct: false },
        { text: 'Lifeline', correct: true },
        { text: 'Bloodhound', correct: false },
        { text: 'Bangalore', correct: false }
      ]
    },
    {
      question: 'How many rounds of sniper ammo can you fit in one backpack slot?',
      answers: [
        { text: '60', correct: false },
        { text: '24', correct: true },
        { text: '12', correct: false },
        { text: '8', correct: false }
      ]
    }
  ]