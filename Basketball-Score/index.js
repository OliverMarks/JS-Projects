let homeScore = document.getElementById("homePoints")
let awayScore = document.getElementById("awayPoints")
let homeBox = document.getElementsByClassName("homeBox");
let awayBox = document.getElementsByClassName("awayBox");


homeScore = 0 
awayScore = 0



// functions to increase scores for home and away 

function hPlusOne() {
    
     homeScore += 1 
     homePoints.textContent = homeScore
}

function hPlusTwo() {
    
    homeScore += 2 
    homePoints.textContent = homeScore
}

function hPlusThree() {
    
    homeScore += 3 
    homePoints.textContent = homeScore
}

function aPlusOne() {
    
    awayScore += 1 
    awayPoints.textContent = awayScore
}

function aPlusTwo() {
   
   awayScore += 2 
   awayPoints.textContent = awayScore
}

function aPlusThree() {
   
   awayScore += 3 
   awayPoints.textContent = awayScore
}


// add yellow highlight to team in the lead 

function winning() {
    if (homeScore > awayScore) { 
    homeBox.setAttribute("id","winning");
    awayBox.removeAttribute("winning"); 
}

else if (homeScore < awayScore) {
    homeBox.removeAttribute("winning");
    awayBox.setAttribute("id","winning"); 
 }

 else (homeScore == awayScore) 
    homeBox.removeAttribute("winning");
    awayBox.removeAttribute("winning");
    }


winning(); 


// function to reset scores on 

function newGame() {
    homeScore = 0 
    awayScore = 0
    homePoints.textContent = homeScore
    awayPoints.textContent = awayScore
}