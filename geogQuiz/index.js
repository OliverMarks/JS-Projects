// Declare variables for DOM elements
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

let cities // will store the data from the city.json file
let score = 0 // player's current score
let incorrectScore = 0 // number of consecutive incorrect answers
let totalIncorrect = 0 // total number of incorrect answers
let city1 // first city to compare in the quiz
let city2 // second city to compare in the quiz

// Arrays to store possible messages to display
const happy = ["Nice!", "Oh that's what I call Geography", "WOwowowowOWOW", "5/7 - incredible", "Good Gravy!", "Check out the Geog-chops on this fella", "Unbelievable Jeff"]
const sad = ["Christ, really?", "Don't be silly", "Lol wut", "Did you go to school in the north?", "Just shite", "Utterly Ridiculous", "Wasting everyone's time" ]



/**
 * Hides the start screen and starts the quiz.
 * Resets the score and number of incorrect answers.
 * Calls the `startTimer` and `playQuiz` functions.
 */
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



/**
 * Renders the quiz by selecting two cities to compare and displaying
 * their names as the quiz question.
 * If the player has answered three questions incorrectly in a row, ends the game.
 */
function playQuiz() {
  if (incorrectScore === 3) {
    endGame()
  } else {
  [city1, city2] = getCities()
  questionElement.textContent = `Which city has a larger population: ${city1[0]} or ${city2[0]}?`
  button1.textContent = city1[0]
  button2.textContent = city2[0]
}}





// Timer function
function startTimer() {
  let timeLeft = 60;
  let timerInterval = setInterval(function() {
    timer.textContent = `Time: ${timeLeft} secs`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timerInterval);
      endGame();
      return
    }
  }, 1000);
}

/**
 * Fetches data from city.json and stores it in the `cities` variable.
 * Then calls the `playQuiz` function to start the quiz.
 */
const getData = async () => {
  const response = await fetch('city.json');
  const data = await response.json();

  cities = data

  playQuiz();
  
};

// Fetches data from city.json and starts the quiz
getData();

// Event listeners for button clicks
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









 // Displays a random message from the given message array.

function getMessage(messageArray) {
  const randomIndex = Math.floor(Math.random() * messageArray.length)
    messageElement.textContent = messageArray[randomIndex]
    messageElement.style.display ="flex"
  }
  


/**
 * Compares the population of two cities and displays a message indicating whether
 * the player's answer was correct or incorrect.
 * Increments the score if the answer was correct and resets the number of consecutive
 * incorrect answers to 0.
 * Increments the number of consecutive incorrect answers if the answer was incorrect.
 */ 
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



/**
 * Returns the value of a nested object key.
 * @param {object} obj - The object to search.
 * @param {string} key - The key to search for in the object.
 * @param {string} nestedKey - The nested key to search for in the object.
 * @returns {any} The value of the nested key, or null if not found.
 */

  function getNestedValue(obj, key, nestedKey) {
    if (obj[key] && obj[key][nestedKey]) {
      return obj[key][nestedKey];
    }
    return null;
  }


/**
 * Gets two cities for the quiz by randomly selecting keys from the `cities` object.
 * The cities' names and population data are extracted using the `getNestedValue` function.
 * @returns {array} An array of two city arrays, each containing a city's name and population.
 */

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


  /**
 * Hides the quiz and displays the end game screen.
 * The final score and number of incorrect answers are displayed.
 * The rating is currently hardcoded to "Hot stuff".
 * A function score/totalIncorrect needs to be made to determine rating
 */
 
  function endGame() {
    quizWrapper.style.display = "none"
    endOfGame.style.display = "flex"
  endOfGame.innerHTML += `
 
  <p>Final Score: ${score}</p>
  
  <p>Total Wrong: ${totalIncorrect}</p>

  <p>Rating: Hot stuff</p>`
  }



  