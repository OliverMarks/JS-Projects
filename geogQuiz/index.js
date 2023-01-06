// Declare variables for DOM elements
const startOfGame = document.getElementById("start-of-game")
const daftAudio = document.getElementById("8bit-daft")
const quizWrapper = document.getElementById("quiz-wrapper")
const startBtn = document.getElementById("start-btn")
const container = document.getElementById("container")
const button1 = document.querySelector("#answer-btn-1")
const button2 = document.querySelector("#answer-btn-2")
const questionElement = document.querySelector("#question")
const scoreElement = document.querySelector("#score")

const messageElement = document.querySelector("#message")
const endOfGame = document.getElementById("endOfGame")
const timer = document.getElementById("timer")
let gameEnded = false;


const topics = ['population', 'longitude', 'latitude']

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
  gameEnded = false;
  score = 0;
  incorrectScore = 0;
  totalIncorrect = 0;
  messageElement.textContent = 
  messageElement.classList.remove("incorrect", "correct") 
  scoreElement.textContent = `${score}`
  // incorrectScoreElement.textContent = `${incorrectScore}`
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
  const questionDict = {
    'population': 'Which city has a larger population:',
    'longitude': 'Which city is furthest East?: ',
    'latitude': 'Which city is furthest North?: '
  }

  let currentTopic = topics[Math.floor(Math.random() * topics.length)]
  if (incorrectScore === 3) {
    endGame('gameOver')
  } else {
  [city1, city2] = getCities(currentTopic)

  questionElement.textContent = `${questionDict[currentTopic]} ${city1.name} or ${city2.name}?`
  button1.textContent = city1.name
  button2.textContent = city2.name
}}





// Timer function
function startTimer() {
  let timeLeft = 60;
  let timerInterval = setInterval(function() {
    timer.textContent = `${timeLeft} secs`;
    timeLeft--;
    if (timeLeft < 0 || gameEnded) {
      clearInterval(timerInterval);
      endGame('time');
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
  cities =  await response.json();
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
  daftAudio.play()

  console.log(daftAudio.muted); // Outputs the current mute state of the audio element
console.log(daftAudio.volume); // Outputs the current volume of the audio element (a value between 0 and 1)
})

// restartBtn.addEventListener("click", function(){
//   startGame()
//
// })









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
  if (cityX.answer > cityY.answer) {
    console.log('Correct!')
    console.log(cityX.name, cityX.answer, cityY.name, cityY.answer)
    getMessage(happy)
    messageElement.classList.remove("incorrect") 
    messageElement.classList.add("correct")
    score++
    incorrectScore = 0
  } else {
    console.log('Incorrect')
    console.log(cityX.name, cityX.answer, cityY.name, cityY.answer)
    //set wrong answer
    getMessage(sad)
    messageElement.classList.remove("correct") 
    messageElement.classList.add("incorrect")
    incorrectScore++
    totalIncorrect++
  }
  scoreElement.textContent = `${score}`
  // incorrectScoreElement.textContent = `${incorrectScore}`
  incorrectIndicator()
  playQuiz()
}

function incorrectIndicator(){
  if (incorrectScore === 1){
    quizWrapper.classList.add("red1")
  } else if  (incorrectScore === 2){
    quizWrapper.classList.add("red2")
  } else  {
    quizWrapper.classList.remove("red1", "red2")
  }
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

  // function getNestedValue(obj, key, nestedKey, nestedNestedKey) {
  //   if (nestedKey && nestedNestedKey) {
  //     if (obj[key] && obj[key][nestedKey] && obj[key][nestedKey][nestedNestedKey]) {
  //       return obj[key][nestedKey][nestedNestedKey];
  //     }
  //   } else if (nestedKey) {
  //     if (obj[key] && obj[key][nestedKey]) {
  //       return obj[key][nestedKey];
  //     }
  //   } else {
  //     if (obj[key]) {
  //       return obj[key];
  //     }
  //   }
  //   return null;
  // }


/**
 * Gets two cities for the quiz by randomly selecting keys from the `cities` object.
 * The cities' names and population data are extracted using the `getNestedValue` function.
 * @returns {array} An array of two city arrays, each containing a city's name and population.
 */

  function getCities(topic) {
    const cityKeys = Object.keys(cities);
    const randomIndex1 = Math.floor(Math.random() * cityKeys.length)
    const randomIndex2 = Math.floor(Math.random() * cityKeys.length)
    const city1Key = cityKeys[randomIndex1]
    const city2Key = cityKeys[randomIndex2]

  const city1 = {
      name: getNestedValue(cities, city1Key, "name"),
      answer: getNestedValue(cities, city1Key, topic)
  }
  const city2 = {
    name: getNestedValue(cities, city2Key, "name"),
    answer: getNestedValue(cities, city2Key, topic)
  }
    return [city1, city2]
  }


  /**
 * Hides the quiz and displays the end game screen.
 * The final score and number of incorrect answers are displayed.
 * The rating is currently hardcoded to "Hot stuff".
 * A function score/totalIncorrect needs to be made to determine rating
 */
 
  function endGame(condition) {
    gameEnded = true;
    quizWrapper.style.display = "none"
    endOfGame.style.display = "flex"

    const endGameBtn = document.createElement('button')
    

    endGameBtn.textContent = 'Go Again'
    endGameBtn.addEventListener('click', () => startGame())

    // condition isnt working as intended 
    endOfGame.innerHTML = `
 
 <h1>${condition === 'time' ? 'Time up' : 'Game Over'}</h1>
  <p>Final Score: ${score}</p>
  
  <p>Total Wrong: ${totalIncorrect}</p>

  <p>Rating: ${getRating(score, totalIncorrect)}</p>
`

    endOfGame.appendChild(endGameBtn)
   
  }

  function getRating(right, wrong) {
    const correctRatio = right/wrong 
    console.log(correctRatio)
    if (correctRatio < 1) {
    return "Shocking"
    } else if (correctRatio < 2){
      return "Not great ay"
    } else if (correctRatio < 3){
      return "Not bad" 
    } else if (correctRatio < 4){
      return "Impressive" 
      } else {
        return "Superstar DJ"
      }
    } 
  

    const muteButton = document.getElementById('mute-button');

    muteButton.addEventListener('click', () => {
      const audioElement = document.querySelector('audio');
      audioElement.muted = !audioElement.muted;
    
      if (audioElement.muted) {
        muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        muteButton.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    })
 
  