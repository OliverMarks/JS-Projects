// import { LookupRegionResponse } from "@googlemaps/region-lookup";
let map
let countries = {}
let selectedCountry = {}
let userSelectedCountry
let userMarker
let markerPlaced = false
let correctMarker
let geocoder
let countryLabels = []
let countryLayer
let score = 0



const nextBtn = document.getElementById("next-btn")
const question = document.getElementById("question")
const submitBtn = document.getElementById("submit-btn")
const scoreBox = document.getElementById("score")




const getData = () => {
    return fetch('country-details.json')
        .then(response => response.json())
        .then(data => {
        countries = data
    })
}


getData()
    .then(() => {
    if (Object.keys(countries).length) {
        selectedCountry = getCountry()
        initMap()
        
    }
    else {
        console.error('No country data found')
    }
})
    .catch(error => {
    console.error(error)
})
function initMap() {
    if (typeof google !== 'undefined') {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lng: -38.149403182714195, lat: 42.18812797137536},
            zoom: 2,
            mapId: 'a3924b58325ef9ed',
            streetViewControl: false,
            mapTypeControl: false,
        });

        countryLayer = map.getFeatureLayer('COUNTRY')
        geocoder = new google.maps.Geocoder()
        google.maps.event.addListener(map, 'click', function (event) {
            if (!markerPlaced) {
                geocode(event.latLng)
                markerPlaced = true
            }
        })

    }
}


nextBtn.addEventListener("click", function () {
    if (markerPlaced) {
        userMarker.setMap(null)
        userMarker = null
        markerPlaced = false
        countryLayer.style = null
    }
    map.setZoom(2)
    map.panTo({ lng: -38.149403182714195, lat: 42.18812797137536})
    selectedCountry = getCountry()
    question.innerHTML = `<span class="emoji">${selectedCountry.flag.emoji}</span>`
    question.classList.remove("correct", "incorrect")
    submitBtn.disabled = true
})

submitBtn.addEventListener("click", function (){  
    geocode(location)
    applyStyleToSelected(selectedCountry.name)
    userMarker.set('label', {
        text: `${userSelectedCountry}`,
        className: 'marker-label',
    })

    checkAnswer()
})

google.maps.event.addListener(userMarker, 'dragend', function() {
    userSelectedCountry = ""
    geocode(userMarker.getPosition())
  });


function getCountry() {
    const countryKeys = Object.keys(countries)
    const randomIndex = Math.floor(Math.random() * countryKeys.length)
    const countryKey = countryKeys[randomIndex]
    selectedCountry = {
        name: getNestedValue(countries, countryKey, "name"),
        flag: getNestedValue(countries, countryKey, "flag"),
        code: getNestedValue(countries, countryKey, "code"),
    }
    question.innerHTML = `<span class="emoji">${selectedCountry.flag.emoji}</span>`
    console.log(selectedCountry)
    return selectedCountry
}



function getNestedValue(obj, key, nestedKey) {
    if (obj[key] && obj[key][nestedKey]) {
        return obj[key][nestedKey]
    }
    return null
}


function geocode(location) {
    geocoder.geocode({ 'location': location }, function (results, status) {
        if (status === 'OK') {
            if (results[3]) {
                var address_components = results[3].address_components
                for (var i = 0; i < address_components.length; i++) {
                    if (address_components[i].types[0] === "country" && address_components[i].types[1] === "political") {
                        userSelectedCountry = address_components[i].long_name
                        break
                    }
                }
            }
        }
        placeUserMarker(location)
        
    })
}

function placeUserMarker(location) {
    userMarker = new google.maps.Marker({
        position: location,
        draggable: true,
        map: map,
        animation: google.maps.Animation.Drop,
    })
    submitBtn.disabled = false
}

function checkAnswer() {
    if (userSelectedCountry.includes(selectedCountry.name)) {
        question.textContent = `${selectedCountry.name}`
        question.classList.add("correct")
        score++
    }
    else {
        question.textContent = `${selectedCountry.name}`
        question.classList.add("incorrect")
        console.log("incorrect")
    }
    submitBtn.disabled = true
    userMarker.setDraggable(false)
    scoreBox.textContent = score

}



function applyStyleToSelected(countryName) {
   countryLayer.style = (options) => {
        if (options.feature.displayName == countryName) {
          return featureStyleOptions
        }
      }

      const featureStyleOptions = {
        strokeColor: "#e30909",
        strokeOpacity: 1.0,
        strokeWeight: 3.0,
        fillColor: "#e30909",
        fillOpacity: 0.5,
      }
}













// // Headers
// const headers = {
//     "X-Goog-Api-Key": "AIzaSyAu0fUB9qD0-7S277XMZqIGXdNnLejKZgo",
// };
// const data = {
//     identifiers: [
//         {
//             "place": `${selectedCountry.name}`,
//         },
//     ],
// };
// const response = await RegionLookup.lookupRegion({ headers, data });
