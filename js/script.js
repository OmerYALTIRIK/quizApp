const header = document.querySelector('header');
const main = document.querySelector('main');
const startButton = document.getElementById('startButton');
const questionArea = document.querySelector('.questionsArea');
const progress = document.querySelector('progress');
const currentQuestion = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answerButton');
const nextButton = document.querySelector('.nextButton');
const scoreArea = document.querySelector('.scoreArea');
const scoreButton = document.querySelector('.scoreButton');
const app = document.querySelector('.app');

const questions = [
  {
    question: 'Dünyanın en iyi yazılım dili hangisidir?',
    options: ['JavaScript', 'Java', 'C#', 'GO'],
    answer: 'JavaScript',
  },
  {
    question: 'En güzel CSS framework hangisidir?',
    options: ['Tailwind', 'Bootstrap', 'PicoCSS', 'Bulma'],
    answer: 'Tailwind',
  },
  {
    question: "Hangi frontend framework'ü en iyisidir?",
    options: ['React', 'Vue', 'Angular', 'Svelte'],
    answer: 'React',
  },
  {
    question: "Hangi backend framework'ü en iyisidir?",
    options: ['Express', 'Django', 'Laravel', 'Spring'],
    answer: 'Express',
    //givenAnswer
  },
  {
    question: 'Hangi veritabanı en iyisidir?',
    options: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
    answer: 'MongoDB',
    //givenAnswer
  },
];
//
//cevap verilince setLocalStorage(index,questions[])
//getLocalStorage(index,questions[])

let currentQuestionIndex = 2;
let score = 0;

window.onload = () => {
  main.style.display = 'none';
  scoreArea.style.display = 'none';
};
const startQuiz = () => {
  header.style.display = 'none';
  main.style.display = 'block';
  showQuestion();
};
startButton.addEventListener('click', startQuiz);
scoreButton.addEventListener('click', showScore);
nextButton.addEventListener('click', nextQuestion);

function showQuestion() {
  const currentQuestionData = questions[currentQuestionIndex];
  currentQuestion.textContent = currentQuestionData.question;
  answerButtons.forEach((button, index) => {
    //document.createelement
    //appendChild
    button.textContent = currentQuestionData.options[index];
    button.classList.remove('correct', 'wrong');
    button.disabled = false;
    button.addEventListener('click', checkAnswer);
  });
  nextButton.style.display = 'none';
  progress.value = ((currentQuestionIndex + 1) / questions.length) * 100;
}

function checkAnswer(e) {
  const currentQuestionData = questions[currentQuestionIndex];
  const selectedButton = e.target;
  const selectedAnswer = selectedButton.textContent;

  if (selectedAnswer === currentQuestionData.answer) {
    selectedButton.classList.add('correct');
    selectedButton.style.backgroundColor = 'green';
    score++;
  } else {
    selectedButton.classList.add('wrong');
    selectedButton.style.backgroundColor = 'red';

    const correctButton = Array.from(answerButtons).find((button) => button.textContent === currentQuestionData.answer);
    correctButton.classList.add('correct');
    correctButton.style.backgroundColor = 'green';
  }

  answerButtons.forEach((button) => (button.disabled = true));

  nextButton.style.display = 'block';
}

function nextQuestion() {
  currentQuestionIndex++;
  answerButtons.forEach((button) => (button.style.backgroundColor = '#ff7f50'));
  if (currentQuestionIndex < questions.length) return showQuestion();
  showScoreButton();
}

function showScoreButton() {
  nextButton.style.display = 'none';
  scoreArea.style.display = 'block';
}

function showScore() {
  app.style.display = 'none';
  scoreArea.style.display = 'block';
  const scoreText = document.getElementById('scoreText');
  scoreText.textContent = `Doğru: ${score} - Yanlış: ${questions.length - score}`;

  const scoreList = document.getElementById('scoreList');
  scoreList.innerHTML = '';

  questions.forEach((question, index) => {
    const listItem = document.createElement('li');
    const givenAnswer = answerButtons[index].textContent;

    listItem.textContent = `${index + 1}. Soru: ${question.question} - Cevap: ${
      question.answer
    } - Verilen Cevap: ${givenAnswer}`;

    if (givenAnswer === question.answer) {
      listItem.classList.add('correct');
    } else {
      listItem.classList.add('wrong');
    }

    scoreList.appendChild(listItem);
  });
}
