








let htmlCollection = document.getElementsByClassName('item');
//getting elements by class name into an HTMLCollection

  let itemsId = Array.from(htmlCollection);
//turning the HTMLcollection into an array for easier manipulation of the elements

  let sectionDeg = 360/itemsId.length;
//sectioning the (imaginary) circle into a number of section equalling the number of items
//it can be used on more elements

  let radianSectionDeg = sectionDeg*Math.PI*2/360;
//transforming from degrees into radians

  let radiusLength = 280;
//the distance between the center of the circle to the element
//edit this number to increase/decrease that distance

  for(let i=0; i<itemsId.length; i++){
    itemsId[i].style.top = radiusLength*Math.sin(radianSectionDeg*i-1.5708)+'px';
    itemsId[i].style.left = radiusLength*Math.cos(radianSectionDeg*i-1.5708)+'px';
  }
//setting the top and left positions of each elemenent based on the following formula:
//(x, y) = (r * cos(θ), r * sin(θ)) like this:
//x = (r * cos(θ) => left
//y = r * sin(θ) => top
//1.5708 is a radian used put the first element on top - basically 90deg

let playButton = document.getElementById("play-button");
let quizName = document.getElementById("quiz-name")

function makeATurn(){
    for(let i=0; i<itemsId.length; i++){
      itemsId[i].style.top = radiusLength*Math.sin(radianSectionDeg*i-1.5708)+'px';
      itemsId[i].style.left = radiusLength*Math.cos(radianSectionDeg*i-1.5708)+'px';
    }
  
    // Remove active class from all items
    for (let i = 0; i < itemsId.length; i++) {
      itemsId[i].classList.remove("active");
    }
  
    // Add active class to item at 0th index
    itemsId[0].classList.add("active");
  
    // Get the font awesome solid element
      playButton.innerHTML = ` <a href="${itemsId[0].getAttribute("data-link")}"><button id="play-button">Play the ${itemsId[0].getAttribute("data-name")} Quiz</button></a>`
  
  }
  
//function used to set the new position of the elements

function turnRight(){
    let holder = itemsId.pop();
    itemsId.unshift(holder);
    makeATurn();

  }

function turnLeft(){
    let holder = itemsId.shift();
    itemsId.push(holder);
    makeATurn();
}
//we're moving the elements by changing their position in the array