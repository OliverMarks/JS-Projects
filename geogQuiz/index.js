






const button1 = document.querySelector("#answer-btn-1")
const button2 = document.querySelector("#answer-btn-2")
const questionElement = document.querySelector("#question")
const scoreElement = document.querySelector("#score")

let cities
let score = 0
let city1
let city2




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
  checkAnswer()
  
  
});

function checkAnswer() {
  if (city1[1] > city2[1]) {
    console.log(`Correct! ${city1[0]} has a larger population than ${city2[0]}`)
    console.log(city1[0], city1[1], city2[0], city2[1])
    score++
  } else {
    console.log(`Incorrect. ${city1[0]} has a smaller population than ${city2[0]}`)
    console.log(city1[0], city1[1], city2[0], city2[1])
  }
  scoreElement.textContent = `${score}`
  playQuiz()
}


  function playQuiz() {
    [city1, city2] = getCities()
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












    



    
    




        





