import { landmarkData } from './landmarkData.js'

let map
let landmarks = {}
let usedLandmarks = []
let selectedLandmark = {}
let userMarker
let marker
let markerPlaced = false
let markerCircle
let geocoder
let score = 0


const nextBtn = document.getElementById("next-btn")
const question = document.getElementById("question")
const submitBtn = document.getElementById("submit-btn")
const scoreBox = document.getElementById("score")







function initMap() {
    selectedLandmark = getCountry()
    if (typeof google !== 'undefined') {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lng: -21.58516515009815, lat: 52.53671745701234},  
            zoom: 2,
            mapId: 'a3924b58325ef9ed',
            streetViewControl: false,
            mapTypeControl: false,
        });

       
        geocoder = new google.maps.Geocoder()
        google.maps.event.addListener(map, 'click', function (event) {
            if (!markerPlaced) {
                placeUserMarker(event.latLng)
                markerPlaced = true
            }
        })

    }
    if (!marker) {
        marker = new google.maps.Marker({
            position: { lat: selectedLandmark.latitude, lng: selectedLandmark.longitude },
            map: map,
            label: {
                text: selectedLandmark.name,
                className: 'marker-label'
            },
            animation: google.maps.Animation.Drop,
            visible: false
            });
}
}




nextBtn.addEventListener("click", function () {
    if (markerPlaced) {
        userMarker.setMap(null);
        userMarker = null
        markerPlaced = false;
        marker.setVisible(false);
        markerCircle.setMap(null)
        
    }
    map.setZoom(2)
    map.panTo({ lng: -38.149403182714195, lat: 42.18812797137536})
    selectedLandmark = getCountry()
    marker.setPosition({ lat: selectedLandmark.latitude, lng: selectedLandmark.longitude });
                marker.setLabel({
                text: selectedLandmark.name,
                className: 'marker-label',
                });
                marker.setVisible(false);
               
    question.innerHTML = `<img class="landmark-img" src ="${selectedLandmark.img}">`
    question.classList.remove("correct", "incorrect")
    submitBtn.disabled = true
})

submitBtn.addEventListener("click", function (){  
  

    checkAnswer()
})



function placeUserMarker(location) {
    userMarker = new google.maps.Marker({
        position: location,
        draggable: true,
        map: map,
        animation: google.maps.Animation.Drop,
    })
    userMarker.addListener('dragend', function() {
        geocode(userMarker.getPosition())
      });
    submitBtn.disabled = false
}

function getCountry() {
    const landmarkKeys = Object.keys(landmarkData)
    let randomIndex = Math.floor(Math.random() * landmarkKeys.length)
    let landmarkKey = landmarkKeys[randomIndex]

 // Keep selecting a new random key until one is found that hasn't been used yet
 while (usedLandmarks.includes(landmarkKey)) {
    randomIndex = Math.floor(Math.random() * landmarkKeys.length)
    landmarkKey = landmarkKeys[randomIndex]
}

usedLandmarks.push(landmarkKey)


    selectedLandmark = {
        name: getNestedValue(landmarkData, landmarkKey, "name"),
        img: getNestedValue(landmarkData, landmarkKey, "img"),
        longitude: getNestedValue(landmarkData, landmarkKey, "longitude"),
        latitude: getNestedValue(landmarkData, landmarkKey, "latitude")
    }
    question.innerHTML = `<img class="landmark-img" src =${selectedLandmark.img}>`
    console.log(selectedLandmark)
    return selectedLandmark 
}



function getNestedValue(obj, key, nestedKey) {
    if (obj[key] && obj[key][nestedKey]) {
        return obj[key][nestedKey]
    }
    return null
}




function checkAnswer() {
    map.panTo(marker.getPosition())
    map.setZoom(5)
    marker.setVisible(true);
    let markerCircle = createCircle(marker)
    markerCircle.setMap(map)
    let isInside = markerCircle.getBounds().contains(userMarker.getPosition())
    if (isInside) {
        question.classList.add("correct")
        score++
    } else {
    let distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), userMarker.getPosition());
        let distanceInKilometers = Math.floor(distanceInMeters / 1000)
        document.getElementById("question").textContent = `${distanceInKilometers}km away`
    question.classList.add("incorrect")
    }
    submitBtn.disabled = true
    userMarker.setDraggable(false)
    scoreBox.textContent = score

}

function createCircle(marker) {
    markerCircle = new google.maps.Circle({
        center: marker.getPosition(),
        radius: 25000,  // radius in meters
        fillColor: '#AA0000',
        fillOpacity: 0.6,
        strokeOpacity: 0.6,
         strokeWeight: 2,
        // clickable: false,
        visible: true
    });
    return markerCircle;
}

initMap()


