// Declare variables for DOM elements
const startOfGame = document.getElementById("start-of-game")
const daftAudio = document.getElementById("8bit-daft")
const quizWrapper = document.getElementById("quiz-wrapper")
const startBtn = document.getElementById("start-btn")
const container = document.getElementById("container")
const muteButton = document.getElementById('mute-button')
const button1 = document.querySelector("#answer-btn-1")
const button2 = document.querySelector("#answer-btn-2")
const questionElement = document.querySelector("#question")
const scoreElement = document.querySelector("#score")
const timeBar = document.getElementById('time-bar')
const betweenRounds = document.getElementById('between-rounds')
// const messageElement = document.querySelector("#message")
const endOfGame = document.getElementById("endOfGame")
const timer = document.getElementById("timer")
let gameEnded = false;


const topics = ['population', 'longitude', 'latitude'] //'currency', 'country']

// , 'currency', 'country'

let citiesAll // will store the data from the city.json file
let timeLeft
let questionSet
let score = 0 // player's current score
let roundNumber = 1 
let incorrectScore = 0 // number of consecutive incorrect answers
let totalIncorrect = 0 // total number of incorrect answers
let city1 // first city to compare in the quiz
let city2 // second city to compare in the quiz

// // Arrays to store possible messages to display
// const happy = ["Nice!", "Oh that's what I call Geography", "WOwowowowOWOW", "5/7 - incredible", "Good Gravy!", "Check out the Geog-chops on this fella", "Unbelievable Jeff"]
// const sad = ["Christ, really?", "Don't be silly", "Lol wut", "Did you go to school in the north?", "Just shite", "Utterly Ridiculous", "Wasting everyone's time" ]




/**
 * Fetches data from city.json and stores it in the `cities` variable.
 * Then calls the `playQuiz` function to start the quiz.
 */
const getData = async () => {
  const response = await fetch('citiesAll.json');
  citiesAll =  await response.json();
  playQuiz();
  
};

// Fetches data from city.json and starts the quiz
getData();

/**
 * Hides the start screen and starts the quiz.
 * Resets the score and number of incorrect answers.
 * Calls the `startTimer` and `playQuiz` functions.
 */
function startGame() {
  gameEnded = false
  score = 0
  incorrectScore = 0
  totalIncorrect = 0
  roundNumber = 0
  // messageElement.textContent = 
  // messageElement.classList.remove("incorrect", "correct") 
  scoreElement.textContent = `${score}`
  
  startOfGame.style.display = "none"
  endOfGame.style.display = "none"
  quizWrapper.style.display = "flex"
  container.style.display = "flex"
  timeBar.style.backgroundColor = '#55F991'
  timeBar.style.width = '100%'
  startOfRound()
  startTimer()
  playQuiz()
}


/**
 * Renders the quiz by selecting two cities to compare and displaying
 * their names as the quiz question.
 * If the player has answered three questions incorrectly in a row, ends the game.
 */
function playQuiz() {
  const questionDict = {
    'population': 'Which city has a larger population:',
    'longitude': 'Which city is furthest East: ',
    'latitude': 'Which city is furthest North: '
    // 'currency': `The  is the currency used in which city:`,
    // 'country': `'Which of these cities is in:`
  }

  let currentTopic = topics[Math.floor(Math.random() * topics.length)]
  console.log(currentTopic)
  if (incorrectScore === 3) {
    endGame('gameOver')
  } else {
  [city1, city2] = getCities(currentTopic)

  questionElement.textContent = `${questionDict[currentTopic]} ${city1.name} or ${city2.name}?`
  button1.textContent = city1.name
  button2.textContent = city2.name
}}



 /**
 * Hides the quiz and displays the end game screen.
 * The final score and number of incorrect answers are displayed.
 */
 
 function endGame(condition) {
  gameEnded = true;
  quizWrapper.style.display = "none"
  endOfGame.style.display = "flex"

  const endGameBtn = document.createElement('button')
  

  endGameBtn.textContent = 'Go Again?'
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
    } else if(correctRatio < 5) {
      return "Superstar DJ"
    } else if (correctRatio < 6 && totalIncorrect === 0) {
      return "PERFECTION"
    }
  
  } 

// Timer function
function startTimer() {
  let timeLeft = 60
  timeBar.style.backgroundColor = '#55F991'
  const interval = setInterval(() => {
    timeLeft--
    timeBar.style.width = `${timeLeft / 60 * 100}%`
    if (timeLeft <= 10) {
      timeBar.style.backgroundColor = '#DC3B08'
    }
    if (timeLeft === 0) {
      clearInterval(interval)
      roundNumber++
      startOfRound()
      console.log(roundNumber)
      return 
    } else if (roundNumber === 6) {
      quizWrapper.style.display = "none"
      clearInterval(interval)
      endGame('time')
    }
   
  }, 1000) }

  function startOfRound() {
    let timeLeft = 60
    if (roundNumber === 2) {
      quizWrapper.style.display = "none"
      betweenRounds.style.display = "block"
      betweenRounds.innerHTML = `<div class="question">Ready to take it up a notch? </div>`
    }
    else if (roundNumber === 4) {
      quizWrapper.style.display = "none"
      betweenRounds.style.display = "block"
      betweenRounds.innerHTML = `<div class="question">One More to go; time for hard mode </div>`
    }
    else {
      betweenRounds.style.display = "none"
    }
    setTimeout(function() {
      betweenRounds.style.display = "none"
      quizWrapper.style.display = "flex"
      container.style.display = "flex"
      
    }, 4500)
    startTimer()      
      playQuiz()
  }
  


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
})

muteButton.addEventListener('click', () => {
  const audioElement = document.querySelector('audio')
  audioElement.muted = !audioElement.muted

  if (audioElement.muted) {
    muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>'
  } else {
    muteButton.innerHTML = '<i class="fas fa-volume-up"></i>'
  }
})

function checkAnswer(cityX, cityY) {
  // if (currentTopic === 'currency' || 'country') {
  //   if ()
  // }
   if (cityX.answer > cityY.answer) {
    console.log('Correct!')
    console.log(cityX.name, cityX.answer, cityY.name, cityY.answer)
    // getMessage(happy)
    // messageElement.classList.remove("incorrect") 
    // messageElement.classList.add("correct")
    score++
    incorrectScore = 0
  } else {
    console.log('Incorrect')
    console.log(cityX.name, cityX.answer, cityY.name, cityY.answer)
    //set wrong answer
    // getMessage(sad)
    // messageElement.classList.remove("correct") 
    // messageElement.classList.add("incorrect")
    incorrectScore++
    totalIncorrect++
  }
  scoreElement.textContent = `${score}`
  // incorrectScoreElement.textContent = `${incorrectScore}`
  incorrectIndicator()
  playQuiz()
}

 // Displays a random message from the given message array.

// function getMessage(messageArray) {
//   const randomIndex = Math.floor(Math.random() * messageArray.length)
//     messageElement.textContent = messageArray[randomIndex]
//     messageElement.style.display ="flex"
//   }
  


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
 * Gets two cities for the quiz by randomly selecting keys from the `cities` object.
 * The cities' names and population data are extracted using the `getNestedValue` function.
 * @returns {array} An array of two city arrays, each containing a city's name and population.
 */

  function getCities(topic) {
    let questionSet = decideQuestionSet()

    const cityKeys = Object.keys(questionSet)
    const randomIndex1 = Math.floor(Math.random() * cityKeys.length)
    const randomIndex2 = Math.floor(Math.random() * cityKeys.length)
    const city1Key = cityKeys[randomIndex1]
    const city2Key = cityKeys[randomIndex2]

    // if (topic === 'population' || 'longitude' || 'latitude') {

  const city1 = {
      name: getNestedValue(questionSet, city1Key, "name"),
      answer: getNestedValue(questionSet, city1Key, topic)
  }
  const city2 = {
    name: getNestedValue(questionSet, city2Key, "name"),
    answer: getNestedValue(questionSet, city2Key, topic)
  }
// } else {
//   const city1 = {
//     name: getNestedValue(citiesAll, city1Key, "name"),
//     answer: getNestedValue(citiesAll, city1Key, topic)
// }
// const city2 = {
//   name: getNestedValue(citiesAll, city2Key, "name"),
//   answer: getNestedValue(citiesAll, city2Key, topic)
// }

console.log([city1, city2])
return [city1, city2]
}


//will change to correct data sets when we have them
 function decideQuestionSet() {
  if (roundNumber === 1) {
    questionSet = citiesAll 
  } else if (roundNumber === 2) {
     questionSet = citiesAll
  } else {
    questionSet = citiesAll 
  }
  return questionSet
 } 
  


  /**
 * Returns the value of a nested object key.
 * @param {object} obj - The object to search.
 * @param {string} key - The key to search for in the object.
 * @param {string} nestedKey - The nested key to search for in the object.
 * @returns {any} The value of the nested key, or null if not found.
 */

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

  function getNestedValue(obj, key, nestedKey) {
    if (obj[key] && obj[key][nestedKey]) {
      return obj[key][nestedKey];
    }
    return null;
  }

  


  
 
  