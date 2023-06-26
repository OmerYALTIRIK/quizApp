const header = document.querySelector("header");
const main = document.querySelector("main");
const startButton = document.getElementById("startButton");
const questionArea = document.querySelector(".questionsArea");
const progress = document.querySelector("progress");
const currentQuestion = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answerButton");
const nextButton = document.querySelector(".nextButton");
const scoreArea = document.querySelector(".scoreArea");
const scoreButton = document.querySelector(".scoreButton");


const questions = [
  {
    question: "Dünyanın en iyi yazılım dili hangisidir?",
    options: ["JavaScript", "Java", "C#", "GO"],
    answer: "JavaScript",
  },
  {
    question: "En güzel CSS framework hangisidir?",
    options: ["Tailwind", "Bootstrap", "PicoCSS", "Bulma"],
    answer: "Tailwind",
  },
  {
    question: "Hangi frontend framework'ü en iyisidir?",
    options: ["React", "Vue", "Angular", "Svelte"],
    answer: "React",
  },
  {
    question: "Hangi backend framework'ü en iyisidir?",
    options: ["Express", "Django", "Laravel", "Spring"],
    answer: "Express",
  },
  {
    question: "Hangi veritabanı en iyisidir?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
    answer: "MongoDB",
  },
];

window.onload = () => {
  main.style.display = "none";
  scoreArea.style.display = "none";
};

startButton.addEventListener("click", startQuiz);

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  header.style.display = "none";
  main.style.display = "block";
  showQuestion();
}

function showQuestion() {
  const currentQuestionData = questions[currentQuestionIndex];
  currentQuestion.textContent = currentQuestionData.question;
  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestionData.options[index];
    button.classList.remove("correct", "wrong");
    button.disabled = false;
  });
  nextButton.style.display = "none";
  progress.value = ((currentQuestionIndex + 1) / questions.length) * 100;
}

answerButtons.forEach((button) => {
  button.addEventListener("click", checkAnswer);
});

function checkAnswer(e) {
  const currentQuestionData = questions[currentQuestionIndex];
  const selectedButton = e.target;
  const selectedAnswer = selectedButton.textContent;

  if (selectedAnswer === currentQuestionData.answer) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");
    const correctButton = Array.from(answerButtons).find((button) => button.textContent === currentQuestionData.answer);
    correctButton.classList.add("correct");
  }

  answerButtons.forEach((button) => {
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", nextQuestion);

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

scoreButton.addEventListener("click", showScore);

function showScore() {
  main.style.display = "none";
  scoreArea.style.display = "block";
  const scoreText = document.getElementById("scoreText");
  scoreText.textContent = `Doğru: ${score} - Yanlış: ${questions.length - score}`;

  const scoreList = document.getElementById("scoreList");
  scoreList.innerHTML = "";

  questions.forEach((question, index) => {
    const listItem = document.createElement("li");
    const givenAnswer = answerButtons[index].textContent;

    listItem.textContent = `${index + 1}. Soru: ${question.question} - Cevap: ${question.answer} - Verilen Cevap: ${givenAnswer}`;

    if (givenAnswer === question.answer) {
      listItem.classList.add("correct");
    } else {
      listItem.classList.add("wrong");
    }

    scoreList.appendChild(listItem);
  });
}
