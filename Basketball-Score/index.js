let homeScore = document.getElementById("homePoints")
let awayScore = document.getElementById("awayPoints")
let homeBox = document.querySelector(".homeBox");
let awayBox = document.querySelector(".awayBox");

console.log(homeBox)

homeScore = 0 
awayScore = 0


// functions to increase scores for home and away 

function hPlusOne() {
    
     homeScore += 1 
     homePoints.textContent = homeScore
     highlight()
}

function hPlusTwo() {
    
    homeScore += 2 
    homePoints.textContent = homeScore
    highlight()
}

function hPlusThree() {
    
    homeScore += 3 
    homePoints.textContent = homeScore
    highlight()
}

function aPlusOne() {
    
    awayScore += 1 
    awayPoints.textContent = awayScore
    highlight()
}

function aPlusTwo() {
   
   awayScore += 2 
   awayPoints.textContent = awayScore
   highlight()
}

function aPlusThree() {
   
   awayScore += 3 
   awayPoints.textContent = awayScore
   highlight()
}


// add yellow highlight to team in the lead 

function highlight() {
    if (homeScore > awayScore) { 
    homeBox.classList.add("winning");
    awayBox.classList.remove("winning"); 
    
}

else if (homeScore < awayScore) {
    homeBox.classList.remove("winning");
    awayBox.classList.add("winning"); 
 }

 else  {
    homeBox.classList.remove("winning");
    awayBox.classList.remove("winning");
 }
}



// function to reset scores on 

function newGame() {
    homeScore = 0 
    awayScore = 0
    homePoints.textContent = homeScore
    awayPoints.textContent = awayScore
}