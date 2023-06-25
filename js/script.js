const header = document.querySelector("header");
const main = document.querySelector("main");
const startButton = document.getElementById("startButton");
const questionArea = document.querySelector(".questionsArea");
const progress = document.getElementsByTagName("progress")[0];
const currentQuestions = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answerButton");
const nextButton = document.querySelector(".nextButton");
const scoreArea = document.querySelector(".scoreArea");
const scoreButton = document.querySelector(".scoreButton");

const questions = [
  {
    question: "Dünyanın en iyi yazılım dili hangisidir?",
    option1: "JavaScript",
    option2: "Java",
    option3: "C#",
    option4: "GO",
    answer: "JavaScript",
  },
  {
    question: "En güzel CSS framework hangisidir?",
    option1: "Tailwind",
    option2: "Bootstrap",
    option3: "PicoCSS",
    option4: "Bulma",
    answer: "Tailwind",
  },
  { question: "Hangi frontend framework'ü en iyisidir?", option1: "React", option2: "Vue", option3: "Angular", option4: "Svelte", answer: "React" },
  {
    question: "Hangi backend framework'ü en iyisidir?",
    option1: "Express",
    option2: "Django",
    option3: "Laravel",
    option4: "Spring",
    answer: "Express",
  },
  { question: "Hangi veritabanı en iyisidir?", option1: "MongoDB", option2: "MySQL", option3: "PostgreSQL", option4: "Redis", answer: "MongoDB" },
];

// şimdi yukarıdaki veriler ile 5 sorulu ve her soruda 4 şıklı bir quiz uygulaması olacak, anasayfa açıldığında karşılama ekranı olacak ki bu bizim header kısmımız yani anasayfa ilk açıldığında header ve start quiz hariç diğer öğeler görünmeyecek ve kullanıcı start quiz butonuna tıklayınca ilk soru görünecek. her soruda 4 şık olacak ve sorudaki şıklardan birine tıklandığında cevap geri alınamayacak yani değiştirilemeyecek ve eğer tıklanan cevap doğru ise tıklanan cevabın olduğu buton yeşil rengini alacak ama yanlış ise kırmızı rengi alacak ve doğru cevap yeşil rengi alacak, soru cevaplandıktan sonra aşağıda bulunan next butonuna tıklanınca sonraki soruya geçilecek ve aynı işlemler bütün sorularda olacak ayrıca uygulamada hangi sayfada olursak olalım sayfa yenilendiğinde local storage kullanılarak sayfa aynen geri gelecek yani veriler gitmeyecek uygulama aynen devam edecek. son soru cevaplandıktan sonra score butonu görünür hale gelecek ve tıklanınca 5 adet sorudan kaç tanesinin doğru kaç tanesinin yanlış cevaplandığı gösterilecek ve hangi soruda hangi cevabın verildiği ve doğru cevabın ne olduğu yanyana görülecek. cevaplara tıklanınca doğruysa yeşil renk veya yanlışsa kırmızı renk görünecek. başlangıçta tüm uygulama gizli olacak sadece header ve içindeki start quiz butonu görünecek ve bu butona tıkladıktan sonra header kısmı kaybolacak ve ilk soru görünecek ayrıca soruların altında score butonu görünmeyecek sadece son soru cevaplandıktan sonra görünecek ve tıklanınca hangi soruya hangi cevabın verildiği ve doğru cevabı da yanında yazan bir sayfa olacak ve toplam kaç doğru ve kaç yanlış cevap verildiği görünecek ayrıca html elementlerinde bulunan progress elementi de 1. soruda valuesi 20 2. soruda value değeri 40 3.de 60 4. de 80 ve son soruda 100 olaacak. yapacağımız uygulama bu şekilde olacak. kodları yazmaya başlayalım:

window.onload = function () {
  // sayfa yüklendiğinde sadece header ve start quiz butonu görünecek bunun için window objesinin onload eventini kullanıyoruz
  main.style.display = "none"; // main kısmını gizliyoruz
  scoreArea.style.display = "none"; // score area kısmını gizliyoruz
};

startButton.addEventListener("click", startQuiz); // start quiz butonuna tıklandığında startQuiz fonksiyonu çalışacak

let currentQuestionIndex = 0; // şu anki sorunun indexi
let score = 0; // başlangıçta score 0 olacak

function startQuiz() {
  // start quiz butonuna tıklandığında çalışacak fonksiyon
  header.style.display = "none"; // header kısmını gizliyoruz
  main.style.display = "block"; // main kısmını görünür hale getiriyoruz
  showQuestion(); // showQuestion fonksiyonunu çalıştırıyoruz
}

function showQuestion() {
  // soruları gösteren fonksiyon
  const currentQuestion = questions[currentQuestionIndex]; // şu anki soruyu currentQuestion değişkenine atıyoruz
  currentQuestions.innerText = currentQuestion.question; // şu anki soruyu ekrana yazdırıyoruz
  answerButtons.forEach((answerButton, index) => {
    // answerButtons nodelistindeki her bir buton için forEach döngüsü oluşturuyoruz
    answerButton.innerText = currentQuestion["option" + (index + 1)]; // her bir butonun textContent'ine şu anki sorunun option1, option2, option3, option4 değerlerini atıyoruz
    answerButton.classList.remove("correct"); // her bir butonun classList'inden correct classını kaldırıyoruz
    answerButton.classList.remove("wrong"); // her bir butonun classList'inden wrong classını kaldırıyoruz
    answerButton.disabled = false; // her bir butonun disabled özelliğini false yapıyoruz
  });
  nextButton.style.display = "none"; // next buttonu gizliyoruz
  progress.value = (currentQuestionIndex + 1) * 20; // progress elementinin value değerini şu anki sorunun indexine göre ayarlıyoruz
}

answerButtons.forEach((answerButton) => {
  // answerButtons nodelistindeki her bir buton için forEach döngüsü oluşturuyoruz
  answerButton.addEventListener("click", checkAnswer); // her bir butona tıklandığında checkAnswer fonksiyonu çalışacak
});

function checkAnswer(e) {
  // cevapları kontrol eden fonksiyon
  const currentQuestion = questions[currentQuestionIndex]; // şu anki soruyu currentQuestion değişkenine atıyoruz
  const clickedButton = e.target; // tıklanan butonu clickedButton değişkenine atıyoruz
  const clickedAnswer = clickedButton.innerText; // tıklanan butonun textContent'ini clickedAnswer değişkenine atıyoruz
  if (clickedAnswer === currentQuestion.answer) {
    // eğer tıklanan cevap şu anki sorunun cevabı ise
    clickedButton.classList.add("correct"); // tıklanan butona correct classını ekliyoruz
    score++; // score değişkenini 1 arttırıyoruz
  } else {
    // eğer tıklanan cevap şu anki sorunun cevabı değilse
    clickedButton.classList.add("wrong"); // tıklanan butona wrong classını ekliyoruz
    answerButtons.forEach((answerButton) => {
      // answerButtons nodelistindeki her bir buton için forEach döngüsü oluşturuyoruz
      if (answerButton.innerText === currentQuestion.answer) {
        // eğer butonun textContent'i şu anki sorunun cevabına eşitse
        answerButton.classList.add("correct"); // butona correct classını ekliyoruz
      }
    });
  }
  answerButtons.forEach((answerButton) => {
    // answerButtons nodelistindeki her bir buton için forEach döngüsü oluşturuyoruz
    answerButton.disabled = true; // her bir butonun disabled özelliğini true yapıyoruz
  });
  nextButton.style.display = "block"; // next buttonu görünür hale getiriyoruz
}

nextButton.addEventListener("click", nextQuestion); // next buttonuna tıklandığında nextQuestion fonksiyonu çalışacak

function nextQuestion() {
  // bir sonraki soruya geçen fonksiyon
  currentQuestionIndex++; // şu anki sorunun indexini 1 arttırıyoruz
  if (currentQuestionIndex < questions.length) {
    // eğer şu anki sorunun indexi questions arrayinin uzunluğundan küçükse
    showQuestion(); // showQuestion fonksiyonunu çalıştırıyoruz
  } else {
    // eğer şu anki sorunun indexi questions arrayinin uzunluğundan küçük değilse
    showScore(); // showScore fonksiyonunu çalıştırıyoruz
  }
}
scoreButton.addEventListener("click", showScore); // score buttonuna tıklandığında showScore fonksiyonu çalışacak ve score kısmı görünür hale gelecek
function showScore() {
  // score'u gösteren fonksiyon
  main.style.display = "none"; // main kısmını gizliyoruz
  scoreArea.style.display = "block"; // score area kısmını görünür hale getiriyoruz
  const scoreText = document.getElementById("scoreText"); // scoreText değişkenine scoreText id'li elementi atıyoruz
  scoreText.innerText = `Doğru: ${score} - Yanlış: ${questions.length - score}`; // scoreText elementinin textContent'ine doğru ve yanlış cevap sayılarını yazdırıyoruz
  const scoreList = document.getElementById("scoreList"); // scoreList değişkenine scoreList id'li elementi atıyoruz
  questions.forEach((question, index) => {
    // questions arrayindeki her bir soru için forEach döngüsü oluşturuyoruz
    const li = document.createElement("li"); // li elementi oluşturuyoruz
    li.innerText = `${index + 1}. Soru: ${question.question} - Cevap: ${question.answer} - Verilen Cevap: ${answerButtons[index].innerText}`; // li elementinin textContent'ine soru, cevap ve verilen cevapları yazdırıyoruz
    if (question.answer === answerButtons[index].innerText) {
      // eğer sorunun cevabı ile verilen cevap aynı ise
      li.classList.add("correct"); // li elementine correct classını ekliyoruz
    } else {
      // eğer sorunun cevabı ile verilen cevap aynı değilse
      li.classList.add("wrong"); // li elementine wrong classını ekliyoruz
    }
    scoreList.appendChild(li); // li elementini scoreList elementine ekliyoruz
  });
}
