






const button1 = document.querySelector("#answer-btn-1")
const button2 = document.querySelector("#answer-btn-2")
const questionElement = document.querySelector("#question")
const scoreElement = document.querySelector("#score")
const messageElement = document.querySelector("#message")

let cities
let score = 0
let city1
let city2

const happy = ["Nice!", "Oh that's what I call Geography", "WOwowowowOWOW", "5/7 - incredible"]
const sad = ["Christ, really?", "Don't be silly", "Lol wut", "Did you go to school in the north?"]



const getData = async () => {
  const response = await fetch('city.json');
  const data = await response.json();

  cities = data

  playQuiz();

 
  // console.log(cities);

//   var keyNames = Object.keys(cities);
// console.log(keyNames); // Outputs ["a","b","c"]
  
};

getData();
console.log(cities)

button1.addEventListener("click", function() {
  checkAnswer()
 

});

button2.addEventListener("click", function() {
  checkAnswer2()
  
  
});


function getMessage(messageArray) {
  const randomIndex = Math.floor(Math.random() * messageArray.length)
    messageElement.textContent = messageArray[randomIndex]
    messageElement.style.display ="block"
  }
  


// check the answer clicked 
function checkAnswer() {
  if (city1[1] > city2[1]) {
    console.log(`Correct! ${city1[0]} has a larger population than ${city2[0]}`)
    console.log(city1[0], city1[1], city2[0], city2[1])
    getMessage(happy)
    messageElement.classList.remove("incorrect")
    messageElement.classList.add("correct")
    score++
  } else {
    console.log(`Incorrect. ${city1[0]} has a smaller population than ${city2[0]}`)
    console.log(city1[0], city1[1], city2[0], city2[1])
    getMessage(sad)
    messageElement.classList.remove("correct")
    messageElement.classList.add("incorrect")
  }
  scoreElement.textContent = `${score}`
  playQuiz()
}

function checkAnswer2() {
  if (city2[1] > city1[1]) {
    console.log(`Correct! ${city2[0]} has a larger population than ${city1[0]}`)
    console.log(city1[0], city1[1], city2[0], city2[1])
    getMessage(happy)
    messageElement.classList.remove("incorrect")
    messageElement.classList.add("correct")
    score++
  } else {
    console.log(`Incorrect. ${city2[0]} has a smaller population than ${city1[0]}`)
    console.log(city1[0], city1[1], city2[0], city2[1])
    getMessage(sad)
    messageElement.classList.remove("correct")
    messageElement.classList.add("incorrect")
  }
  scoreElement.textContent = `${score}`
  playQuiz()
}

// renders game 
  function playQuiz() {
    [city1, city2] = getCities()
    console.log(city1)
    questionElement.textContent = `Which city has a larger population: ${city1[0]} or ${city2[0]}?`
    button1.textContent = city1[0]
    button2.textContent = city2[0]
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












    



    
    




        





