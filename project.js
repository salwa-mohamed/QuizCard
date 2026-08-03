// ========== 1. DATA ==========
const quizData = {
  "Science": [
    { q: "Which planet is known as the “Red Planet”?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { q: "What is H2O?", options: ["Salt", "Water", "Oxygen", "Gold"], answer: "Water" },
    { q: "How many bones in adult human body?", options: ["206", "300", "150", "180"], answer: "206" },
    { q: "What gas do plants absorb?", options: ["Oxygen", "Nitrogen", "CO2", "Helium"], answer: "CO2" },
    { q: "Speed of light is approx?", options: ["300,000 km/s", "150,000 km/s", "1M km/s", "50,000 km/s"], answer: "300,000 km/s" },
    { q: "Largest organ?", options: ["Liver", "Brain", "Skin", "Heart"], answer: "Skin" },
    { q: "Atom's center is?", options: ["Electron", "Neutron", "Nucleus", "Proton"], answer: "Nucleus" },
    { q: "0°C is freezing point of?", options: ["Water", "Alcohol", "Oil", "Mercury"], answer: "Water" },
    { q: "How many hearts does an octopus have?", options: ["1", "2", "3", "4"], answer: "3" },
    { q: "DNA stands for?", options: ["Deoxyribonucleic Acid", "Digital Network Access", "Data Numeric Array", "Dynamic Node Algorithm"], answer: "Deoxyribonucleic Acid" }
  ],
  "General knowledge": [
    { q: "Capital of Egypt?", options: ["Alex", "Cairo", "Giza", "Luxor"], answer: "Cairo" },
    { q: "How many continents?", options: ["5", "6", "7", "8"], answer: "7" },
    { q: "Largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { q: "Currency of USA?", options: ["Euro", "Dollar", "Pound", "Yen"], answer: "Dollar" },
    { q: "Tallest animal?", options: ["Elephant", "Giraffe", "Horse", "Camel"], answer: "Giraffe" },
    { q: "How many days in a week?", options: ["5", "6", "7", "8"], answer: "7" },
    { q: "Color of sky?", options: ["Green", "Red", "Blue", "Yellow"], answer: "Blue" },
    { q: "Opposite of hot?", options: ["Warm", "Cold", "Cool", "Freeze"], answer: "Cold" },
    { q: "How many wheels in a car?", options: ["3", "4", "5", "6"], answer: "4" },
    { q: "Sun rises from?", options: ["West", "East", "North", "South"], answer: "East" }
  ],
  "History": [
    { q: "Who built the pyramids?", options: ["Romans", "Greeks", "Ancient Egyptians", "Vikings"], answer: "Ancient Egyptians" },
    { q: "WW2 ended in?", options: ["1918", "1939", "1945", "1950"], answer: "1945" },
    { q: "First man on moon?", options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "John Glenn"], answer: "Neil Armstrong" },
    { q: "French Revolution year?", options: ["1776", "1789", "1812", "1917"], answer: "1789" },
    { q: "Inventor of light bulb?", options: ["Tesla", "Edison", "Newton", "Einstein"], answer: "Edison" },
    { q: "Ancient wonder in Egypt?", options: ["Colosseum", "Great Wall", "Pyramids", "Taj Mahal"], answer: "Pyramids" },
    { q: "Vikings from?", options: ["Italy", "Scandinavia", "Spain", "Greece"], answer: "Scandinavia" },
    { q: "Renaissance started in?", options: ["England", "France", "Italy", "Germany"], answer: "Italy" },
    { q: "Columbus reached America in?", options: ["1492", "1607", "1776", "1804"], answer: "1492" },
    { q: "Berlin Wall fell in?", options: ["1989", "1991", "1975", "2000"], answer: "1989" }
  ],
  "Sports": [
    { q: "How many players in football team?", options: ["9", "10", "11", "12"], answer: "11" },
    { q: "NBA is for?", options: ["Football", "Basketball", "Tennis", "Baseball"], answer: "Basketball" },
    { q: "Olympics held every?", options: ["2 years", "3 years", "4 years", "5 years"], answer: "4 years" },
    { q: "Country of Messi?", options: ["Brazil", "Portugal", "Argentina", "Spain"], answer: "Argentina" },
    { q: "Tennis Grand Slam count?", options: ["2", "3", "4", "5"], answer: "4" },
    { q: "Sport with a racket?", options: ["Soccer", "Swimming", "Tennis", "Boxing"], answer: "Tennis" },
    { q: "World Cup in 2022?", options: ["Russia", "Qatar", "Brazil", "Germany"], answer: "Qatar" },
    { q: "Swimming stroke?", options: ["Dribble", "Butterfly", "Tackle", "Serve"], answer: "Butterfly" },
    { q: "Boxing rounds?", options: ["10", "12", "15", "20"], answer: "12" },
    { q: "Sport of F1?", options: ["Racing", "Riding", "Sailing", "Flying"], answer: "Racing" }
  ]
};

// ========== 2. STATE ==========
let currentCategory = "";
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let selectedQuestions = [];

// ========== 3. DOM ==========
const homeScreen = document.getElementById('home screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const categoryBtns = document.querySelectorAll('.category-btn');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');

// ========== 4. FUNCTIONS ==========

function startQuiz() {
  if (!currentCategory) {
    alert("Please select a category first!");
    return;
  }
  selectedQuestions = [...quizData[currentCategory]].sort(() => 0.5 - Math.random()).slice(0, 10);

  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;

  homeScreen.classList.add('d-none');
  quizScreen.classList.remove('d-none');
  loadQuestion();
}

function loadQuestion() {
  const currentQ = selectedQuestions[currentQuestionIndex];

  document.getElementById('question').textContent = `Question ${currentQuestionIndex + 1} of 10`;
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('title-card').textContent = currentCategory.toUpperCase();
  document.getElementById('card-question').textContent = currentQ.q; // <- اتعدل

  document.getElementById('progress').style.width = `${(currentQuestionIndex / 10) * 100}%`;

  const optionsContainer = document.getElementById('choices');
  optionsContainer.innerHTML = "";
  currentQ.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-outline-secondary', 'option-btn', 'w-100', 'text-start', 'p-3');
    btn.innerHTML = `<strong>${String.fromCharCode(65 + index)}</strong>. ${option}`;
    btn.onclick = () => checkAnswer(option, btn);
    optionsContainer.appendChild(btn);
  });

  nextBtn.classList.add('d-none');
}

function checkAnswer(selectedOption, btnElement) {
  const correctAnswer = selectedQuestions[currentQuestionIndex].answer;
  const allOptions = document.querySelectorAll('.option-btn');

  allOptions.forEach(btn => btn.disabled = true);

  if (selectedOption === correctAnswer) {
    btnElement.classList.remove('btn-outline-secondary');
    btnElement.classList.add('btn-success');
    score += 10;
    correctAnswers++;
  } else {
    btnElement.classList.remove('btn-outline-secondary');
    btnElement.classList.add('btn-danger');
    incorrectAnswers++;
    allOptions.forEach(btn => {
      if (btn.textContent.includes(correctAnswer)) {
        btn.classList.remove('btn-outline-secondary');
        btn.classList.add('btn-success');
      }
    });
  }

  nextBtn.classList.remove('d-none');
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < 10) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('d-none');
  resultScreen.classList.remove('d-none');

  document.getElementById('final-score').textContent = `${correctAnswers}/10`;
  document.getElementById('correct-count').textContent = correctAnswers;
  document.getElementById('incorrect-count').textContent = incorrectAnswers;
  document.getElementById('result-category').textContent = currentCategory;
  document.getElementById('result-message').textContent = `You scored higher than ${correctAnswers * 10}% of players`;
}

function resetQuiz() {
  resultScreen.classList.add('d-none');
  homeScreen.classList.remove('d-none');
  categoryBtns.forEach(btn => btn.classList.remove('active', 'btn-primary'));
  categoryBtns.forEach(btn => btn.classList.add('btn-outline-primary'));
  currentCategory = "";
}

// ========== 5. EVENT LISTENERS ==========
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryBtns.forEach(b => {
      b.classList.remove('active', 'btn-primary');
      b.classList.add('btn-outline-primary');
    });
    btn.classList.add('active', 'btn-primary');
    btn.classList.remove('btn-outline-primary');
    currentCategory = btn.dataset.category;
  });
});

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
document.getElementById('play-agian-btn').addEventListener('click', startQuiz);
document.getElementById('change-category-btn').addEventListener('click', resetQuiz);