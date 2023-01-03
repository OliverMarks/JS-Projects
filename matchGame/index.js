let cards = [
    "imgs/abe.jpg", 
    "imgs/flanders.jpeg",
    "imgs/homer.jpg",
    "imgs/jasp.jpeg",
    "imgs/kent.jpg",
    "imgs/lenny.jpg",
    "imgs/lisa.jpg",
    "imgs/mole.jpg",
    "imgs/abe.jpg", 
    "imgs/flanders.jpeg",
    "imgs/homer.jpg",
    "imgs/jasp.jpeg",
    "imgs/kent.jpg",
    "imgs/lenny.jpg",
    "imgs/lisa.jpg",
    "imgs/mole.jpg"
    
]

let errorCount = 0 
let total = 0 
let clicked = []

// Dom Elements 
 const frontCards = document.getElementById("front-cards")
 const cardContainer = document.getElementById("card-container")
 const newGameBtn = document.getElementById("new-game")
 
 // shuffle function 
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array 
  }

// render cards at the start of game
 function render() {
    shuffle(cards)
    for (let i = 0; i < cards.length; i++) {
        // cardContainer.innerHTML += `<img class="card" id="card" src="${cards[i]}">`

        let frontCard = document.createElement('img')
            frontCard.src = "imgs/mysterybox.jpg"
            frontCard.id = `frontCard${[i]}` 
            frontCard.className = 'frontCards'
            frontCards.appendChild(frontCard)

        let card = document.createElement('img')
            card.src = cards[i]
            card.id = `card${[i]}` 
            card.className = 'card'
            cardContainer.appendChild(card)

        
    }
}

render() 

// Start a new game 
newGameBtn.addEventListener("click", function() {
    cardContainer.innerHTML = ``
    frontCards.innerHTML = ``
    render()
    let errorCount = 0
    let total = 0
})

// function gets all img objects from the DOM, iterates over them and adds a click event 
// which logs the src of the clicked img to the start of the empty clicked array [does this need to loop for new game btn]

// let frontCardImg = document.getElementById.('frontCard[i]')

// document.addEventListener("click", function (){
//     frontCardImg.classList.add("hidden")
// } )





let getAllImages = document.getElementsByTagName('img');

for (let i = 0; i < getAllImages.length; i++) {
  (function(x) {
    getAllImages[x].addEventListener('click', function() {

      clicked.unshift(this.getAttribute('src'))
    
      console.log(clicked)

// Logic which checks the first and second item of the clicked array and runs appropriate function 

      if (clicked[0] === clicked[1] && clicked.length === 2) {
        console.log("match")
        this.classList.add('hidden')
        clicked = []
        total ++ 
      }

      else if (clicked[0] !== clicked[1] && clicked.length === 2){
        console.log("no match")
        clicked = []
      }

      else {
        console.log("one more")
      }

    })

  }(i))
}



// function for match 
function match() {
    card.classList.add("hidden")
}

// function for no match 

// need to disable clicked element to stop someone clicking on same pic twice and getting a match 

// keep a track of success; if score = 8, then game state = won? 


