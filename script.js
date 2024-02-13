const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'HTML stands for?',
    answers: [
      { text: 'Hyper Text Markup Language.', correct: true },
      { text: 'Hyper Text Makeup Language.', correct: false },
      { text: 'Hypre Text Markup Language.', correct: false },
      { text: 'Hyper Tent Markup Language.', correct: false }
    ]
  },
  {
    question: 'What does CSS mean?',
    answers: [
      { text: 'Connecting Style Sheets', correct: false},
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Cascading Styling Sheets', correct: false },
      { text: 'Cascade Styling Sheets', correct: false }
    ]
  },
  {
    question: 'What is JavaScript?',
    answers: [
      { text: 'JavaScript is used along with HTML, CSS', correct: false },
      { text: 'It is an extension of Java', correct: false },
      { text: 'JavaScript is a dynamic programming language that is used for web development, in web applications, for game development, and lots more.', correct: true },
      { text: 'JavaScript is used for coding', correct: false }
    ]
  },
  {
    question: 'What is web development?',
    answers: [
      { text: 'Website development is not known', correct: false },
      { text: 'It is Developing the web of something', correct: false },
      { text: 'Web dev is what spiders do when left alone for too long', correct: false },
      { text: 'the tasks associated with creating, building, and maintaining websites and web applications that run online on a browser. ', correct: true }
    ]
  }
]