// import { LookupRegionResponse } from "@googlemaps/region-lookup";
let map;
let countries = {};
let selectedCountry = {};
let userSelectedCountry;
let userMarker;
let markerPlaced = false;
let correctMarker;
let geocoder;
let countryLabels = [];
let countryLayer



const resetBtn = document.getElementById("reset-btn");
const question = document.getElementById("question");
const submitBtn = document.getElementById("submit-btn");



const featureStyleOptions = {
    strokeColor: "#e30909",
    strokeOpacity: 1.0,
    strokeWeight: 3.0,
    fillColor: "#e30909",
    fillOpacity: 0.5,
  };

const getData = () => {
    return fetch('country-details.json')
        .then(response => response.json())
        .then(data => {
        countries = data;
    });
};
getData()
    .then(() => {
    if (Object.keys(countries).length) {
        selectedCountry = getCountry();
        initMap();
    }
    else {
        console.error('No country data found');
    }
})
    .catch(error => {
    console.error(error);
});
function initMap() {
    if (typeof google !== 'undefined') {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 40.4637, lng: 3.7492 },
            zoom: 2,
            mapId: 'a3924b58325ef9ed',
            streetViewControl: false,
            mapTypeControl: false,
        });

        countryLayer = map.getFeatureLayer('COUNTRY');
        geocoder = new google.maps.Geocoder();

        google.maps.event.addListener(map, 'click', function (event) {
            if (!markerPlaced) {
                geocode(event.latLng);
                markerPlaced = true;
            }
        });
    }
}
resetBtn.addEventListener("click", function () {
    if (markerPlaced) {
        userMarker.setMap(null);
        userMarker = null;
        markerPlaced = false;
        countryLayer.style = null;
    }
    selectedCountry = getCountry();
    question.textContent = ` ${selectedCountry.flag.emoji}`;
    question.classList.remove("correct", "incorrect");
});

submitBtn.addEventListener("click", function (){
       
    geocode(location)

    applyStyleToSelected(selectedCountry.name);
    userMarker.set('label', {
        text: `${userSelectedCountry}`,
        className: 'marker-label',

        
    }); 
    checkAnswer()
})

// google.maps.event.addListener(userMarker, 'ondrop', function() {
//     geocode(userMarker.getPosition());
//   });


function getCountry() {
    const countryKeys = Object.keys(countries);
    const randomIndex = Math.floor(Math.random() * countryKeys.length);
    const countryKey = countryKeys[randomIndex];
    selectedCountry = {
        name: getNestedValue(countries, countryKey, "name"),
        flag: getNestedValue(countries, countryKey, "flag"),
        code: getNestedValue(countries, countryKey, "code"),
    };
    question.textContent = ` ${selectedCountry.flag.emoji}`;
    console.log(selectedCountry);
    return selectedCountry;
}



function getNestedValue(obj, key, nestedKey) {
    if (obj[key] && obj[key][nestedKey]) {
        return obj[key][nestedKey];
    }
    return null;
}


function geocode(location) {
    geocoder.geocode({ 'location': location }, function (results, status) {
        if (status === 'OK') {
            if (results[3]) {
                var address_components = results[3].address_components;
                for (var i = 0; i < address_components.length; i++) {
                    if (address_components[i].types[0] === "country" && address_components[i].types[1] === "political") {
                        userSelectedCountry = address_components[i].long_name;
                        break;
                    }
                }
            }
        }
        placeUserMarker(location);
        
    });
}

function placeUserMarker(location) {
    userMarker = new google.maps.Marker({
        position: location,
        // draggable: true,
        map: map,
        animation: google.maps.Animation.Drop,
    });
}

function checkAnswer() {
    if (userSelectedCountry === selectedCountry.name) {
        question.textContent = `Correct that's ${selectedCountry.name}`;
        question.classList.add("correct");
    }
    else {
        question.textContent = `Wrong that's the flag of ${selectedCountry.name}`;
        question.classList.add("incorrect");
        console.log("incorrect");
    }
}



function applyStyleToSelected(countryName) {
   countryLayer.style = (options) => {
        if (options.feature.displayName == countryName) {
          return featureStyleOptions;
        }
      };
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
