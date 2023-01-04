const startOfGame = document.getElementById("start-of-game")
const quizWrapper = document.getElementById("quiz-wrapper")
const startBtn = document.getElementById("start-btn")
const container = document.getElementById("container")
const button1 = document.querySelector("#answer-btn-1")
const button2 = document.querySelector("#answer-btn-2")
const questionElement = document.querySelector("#question")
const scoreElement = document.querySelector("#score")
const incorrectScoreElement = document.getElementById("incorrect-score")
const messageElement = document.querySelector("#message")
const endOfGame = document.getElementById("endOfGame")
const restartBtn = document.getElementById("restart-btn")
const timer = document.getElementById("timer")

let cities
let score = 0
let incorrectScore = 0
let totalIncorrect = 0 
let city1
let city2

const happy = ["Nice!", "Oh that's what I call Geography", "WOwowowowOWOW", "5/7 - incredible", "Good Gravy!", "Check out the Geog-chops on this fella", "Unbelievable Jeff"]
const sad = ["Christ, really?", "Don't be silly", "Lol wut", "Did you go to school in the north?", "Just shite", "Utterly Ridiculous", "Wasting everyone's time" ]


function startGame() {
  score = 0;
  incorrectScore = 0;
  totalIncorrect = 0;
  startOfGame.style.display = "none";
  endOfGame.style.display = "none";
  quizWrapper.style.display = "flex";
  container.style.display = "flex";
  startTimer();
  playQuiz();
}

// renders game 
function playQuiz() {
  if (incorrectScore === 3) {
    endGame()
  } else {
  [city1, city2] = getCities()
  questionElement.textContent = `Which city has a larger population: ${city1[0]} or ${city2[0]}?`
  button1.textContent = city1[0]
  button2.textContent = city2[0]
}}

function startTimer() {
  let timeLeft = 60;
  let timerInterval = setInterval(function() {
    timer.textContent = `Time: ${timeLeft} secs`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      endGame();
    }
  }, 1000);
}

const getData = async () => {
  const response = await fetch('city.json');
  const data = await response.json();

  cities = data

  playQuiz();
  
};

button1.addEventListener("click", function() {
  checkAnswer(city1, city2)
})

button2.addEventListener("click", function() {
  checkAnswer(city2, city1)
})

startBtn.addEventListener("click", function(){
  startGame()
})

restartBtn.addEventListener("click", function(){ 
  startGame()
  
})



getData();





function getMessage(messageArray) {
  const randomIndex = Math.floor(Math.random() * messageArray.length)
    messageElement.textContent = messageArray[randomIndex]
    messageElement.style.display ="flex"
  }
  


// check the answer clicked 
function checkAnswer(cityX, cityY) {
  if (cityX[1] > cityY[1]) {
    console.log(`Correct! ${cityX[0]} has a larger population than ${cityY[0]}`)
    console.log(cityX[0], cityX[1], cityY[0], cityY[1])
    getMessage(happy)
    messageElement.classList.remove("incorrect") // toggle might be better for these?
    messageElement.classList.add("correct")
    score++
    incorrectScore = 0
  } else {
    console.log(`Incorrect. ${cityX[0]} has a smaller population than ${cityY[0]}`)
    console.log(cityX[0], cityX[1], cityY[0], cityY[1])
    getMessage(sad)
    messageElement.classList.remove("correct")
    messageElement.classList.add("incorrect")
    incorrectScore++
    totalIncorrect++
  }
  scoreElement.textContent = `${score}`
  incorrectScoreElement.textContent = `${incorrectScore}`
  playQuiz()
}





  function getNestedValue(obj, key, nestedKey) {
    if (obj[key] && obj[key][nestedKey]) {
      return obj[key][nestedKey];
    }
    return null;
  }
  // gets the cities for the questions randomly from json data includes their name and population data 
  function getCities() {
    const cityKeys = Object.keys(cities);
    const randomIndex1 = Math.floor(Math.random() * cityKeys.length)
    const randomIndex2 = Math.floor(Math.random() * cityKeys.length)
    const city1Key = cityKeys[randomIndex1]
    const city2Key = cityKeys[randomIndex2]
    const city1 = [getNestedValue(cities, city1Key, "name"), getNestedValue(cities, city1Key, "population")]
    const city2 = [getNestedValue(cities, city2Key, "name"), getNestedValue(cities, city2Key, "population")]
    return [city1, city2]
    
  }


  // end of game 
  function endGame() {
    quizWrapper.style.display = "none"
    endOfGame.style.display = "flex"
  endOfGame.innerHTML += `
 
  <p>Final Score: ${score}</p>
  
  <p>Total Wrong: ${totalIncorrect}</p>

  <p>Rating: Hot stuff</p>`
  }



  