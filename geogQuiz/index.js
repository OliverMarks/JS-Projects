// Declare variables for DOM elements
const startOfGame = document.getElementById("start-of-game")
const daftAudio = document.getElementById("8bit-daft")
const quizWrapper = document.getElementById("quiz-wrapper")
const startBtn = document.getElementById("start-btn")
const container = document.getElementById("container")
const muteButton = document.getElementById('mute-button')
const btnBox = document.getElementById("btn-box")
const questionElement = document.querySelector("#question")
const scoreElement = document.querySelector("#scores")
const timeBar = document.getElementById('time-bar')
const betweenRounds = document.getElementById('between-rounds')
const endOfGame = document.getElementById("endOfGame")
const timer = document.getElementById("timer")
let gameEnded = false;


const topics = ['population', 'longitude', 'latitude'] 


let eventHandler 
let citiesAll 
let cities = []
let displayedCities = []
let timeLeft
let questionSet
let interval
let scores = Array(3).fill(0) 
let roundNumber = 0
let incorrectScore = 0 // number of consecutive incorrect answers
let totalIncorrect = 0 // total number of incorrect answers


const getData = async () => {
  const response = await fetch('citiesAll.json')
  citiesAll =  await response.json()
};




// Fetches data from city.json and starts the quiz
function startGame() {
  gameEnded = false
  scores = Array(3).fill(0)
  incorrectScore = 0
  totalIncorrect = 0
  roundNumber = 1
  scoreElement.textContent = `${scores[roundNumber-1]}`
  startOfGame.style.display = "none"
  endOfGame.style.display = "none"
  quizWrapper.style.display = "flex"
  container.style.display = "flex"
  timeBar.style.backgroundColor = '#55F991'
  timeBar.style.width = '100%'
  startOfRound()
  
}

getData()

function generateQuestion() {
  const questionDict = {
    'population': 'Which city has a larger population:',
    'longitude': 'Which city is furthest East: ',
    'latitude': 'Which city is furthest North: '
  }

  let currentTopic = topics[Math.floor(Math.random() * topics.length)]
  console.log(currentTopic)

  if (incorrectScore >= 3) {
    endGame('gameOver')
  } else {
    let cities = getCities(currentTopic)
    
    displayedCities = cities.slice(0,roundNumber+1)
    console.log(displayedCities)
    let questionString = `${questionDict[currentTopic]} ${displayedCities.map(function(city){return city.name}).join(" or ")}`
    
    for (let i = 0; i < roundNumber + 1; i++) {
      const answerBtn = document.createElement('button')
      answerBtn.textContent = displayedCities[i].name
      answerBtn.setAttribute("class", "answerBtn")
      answerBtn.addEventListener('click', () => checkAnswer(displayedCities[i], displayedCities))
      btnBox.appendChild(answerBtn)
    }
     
   
    questionString += "?"
    questionElement.textContent = questionString
  }
}


 
 function endGame(condition) {
  gameEnded = true
  clearInterval(interval)
  quizWrapper.style.display = "none"
  endOfGame.style.display = "flex"
  const endGameBtn = document.createElement('button')
  endGameBtn.textContent = 'Go Again?'
  endGameBtn.addEventListener('click', () => startGame())
  endOfGame.innerHTML = `
  <h1>${condition === 'time' ? 'Congrats' : 'Game Over'}</h1>
  <p>Round One Score: ${scores[0]}</p>
  <p>Round Two Score: ${scores[1]}</p>
  <p>Round Three Score: ${scores[2]}</p>
  <p>Total Wrong: ${totalIncorrect}</p>
  <p>Final Score: ${scores.reduce((a, b) => a + b, 0)}</p>`
  

  endOfGame.appendChild(endGameBtn)
 
}



// Timer function
function startTimer() {
  let timeLeft = 60
  timeBar.style.backgroundColor = '#55F991'
  clearInterval(interval)
  interval = setInterval(() => {
    timeLeft--
    timeBar.style.width = `${timeLeft / 60 * 100}%`
    if (timeLeft <= 10) {
      timeBar.style.backgroundColor = '#DC3B08'
    }
    if (timeLeft === 0) {
      clearInterval(interval)
      if (roundNumber === 3) {
        quizWrapper.style.display = "none"
      
      endGame('time')
      return
      }
      roundNumber++
      startOfRound()
      console.log(roundNumber)
      return 
    }  
      
  }, 1000) }

  function startOfRound() {
    const answerBtns = document.getElementsByClassName("answerBtn")

while (answerBtns.length > 0) {
  btnBox.removeChild(answerBtns[0])
}
    incorrectScore = 0
    timeLeft = 60
    interval = 
    quizWrapper.classList.remove("red1", "red2")
    
    if (roundNumber === 2) {
      quizWrapper.style.display = "none"
      betweenRounds.style.display = "block"
      betweenRounds.innerHTML = `<div class="between-round">
      <p> ${scores[0]} Correct, Not bad! </p> 
      <p>Ready to take it up a notch? </p>
      <p>More cities and three answers to choose from!</p> 
      </div>`
    
    } else if (roundNumber === 3) {
      quizWrapper.style.display = "none"
      betweenRounds.style.display = "block"
      betweenRounds.innerHTML = 
      `<div class="between-round">
      <p>${scores[1]} Correct Good stuff!</p> 
      <p>One More to go; time for hard mode</p>
      <p>All cities and four answers!</p> </div>`
    
    } else if (roundNumber >= 3){
      betweenRounds.style.display = "none"
    
    } else {
      betweenRounds.style.display = "none"
    
    }
    setTimeout(function() {
      betweenRounds.style.display = "none"
      quizWrapper.style.display = "flex"
      container.style.display = "flex"
      
    }, 4500)
    
    startTimer()      
    generateQuestion()
     
  }
  




startBtn.addEventListener("click", function(){
  startGame()
  // daftAudio.play()
})



function checkAnswer(cityX, displayedCities) {
  let isCorrect = true
  let maxAnswer = cityX.answer
  for (let i = 0; i < displayedCities.length; i++) {
    if (cityX.name !== displayedCities[i].name && cityX.answer < displayedCities[i].answer) {
      isCorrect = false
      break
    }
    maxAnswer = Math.max(maxAnswer, displayedCities[i].answer)
  }
  if (isCorrect && cityX.answer === maxAnswer) {
    console.log("Correct!", maxAnswer)
    scores[roundNumber - 1]++
    incorrectScore = 0
  } else {
    console.log("Incorrect", incorrectScore, maxAnswer)
    incorrectScore++
    totalIncorrect++
  }
  scoreElement.textContent = `${scores[roundNumber - 1]}`
  incorrectIndicator()
  const answerBtns = document.getElementsByClassName("answerBtn")

while (answerBtns.length > 0) {
  btnBox.removeChild(answerBtns[0])
}

  generateQuestion()
}




  
// muteButton.addEventListener('click', () => {
//   const audioElement = document.querySelector('audio')
//   audioElement.muted = !audioElement.muted

//   if (audioElement.muted) {
//     muteButton.innerHTML = '<i class="fas fa-volume-mute"></i>'
//   } else {
//     muteButton.innerHTML = '<i class="fas fa-volume-up"></i>'
//   }
// })

function incorrectIndicator(){
  if (incorrectScore === 1){
    quizWrapper.classList.add("red1")
  } else if  (incorrectScore === 2){
    quizWrapper.classList.add("red2")
  } else  {
    quizWrapper.classList.remove("red1", "red2")
  }
  }

function getCities(topic) {
 
  const cityKeys = Object.keys(decideQuestionSet())

  let numCities
  if (roundNumber === 1) {
    numCities = 2
  } else if (roundNumber === 2) {
    numCities = 3
  } else if (roundNumber === 3) {
    numCities = 4
  }
  let cities = []
  for (let i = 0; i < numCities; i++) {
      const randomIndex = Math.floor(Math.random() * cityKeys.length)
      const cityKey = cityKeys[randomIndex]
      const city = {
          name: getNestedValue(questionSet, cityKey, "name"),
          answer: getNestedValue(questionSet, cityKey, topic)
      }
      cities.push(city)
  }
  console.log(cities)
  return cities
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
  

  function getNestedValue(obj, key, nestedKey) {
    if (obj[key] && obj[key][nestedKey]) {
      return obj[key][nestedKey]
    }
    return null
  }


