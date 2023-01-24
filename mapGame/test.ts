import {
    lookupRegion, 
    LookupRegionRequestData, 
    LookupRegionResponseData, 
    LookupRegionResponse, 
    RegionIdentifier
  } from "@googlemaps/region-lookup";

let map;
let countries = {};
let selectedCountry = {};
let userSelectedCountry
let userMarker;
let markerPlaced = false;
let correctMarker
let geocoder
let countryLabels = [];

const styleDefault = {
    strokeColor: "#810FCB",
    strokeOpacity: 1.0,
    strokeWeight: 2.0,
    fillColor: "white",
    fillOpacity: 0.1, // Polygons must be visible to receive click events.
  };
  
  const styleClicked = {
    ...styleDefault,
    fillColor: "#810FCB",
    fillOpacity: 0.5,
  };
  

const resetBtn = document.getElementById("reset-btn");
const question = document.getElementById("question")

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
        } else {
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
                mapId:'a3924b58325ef9ed',
                streetViewControl: false,
                mapTypeControl: false,
                
            });
           localityLayer = map.getFeatureLayer('LOCALITY');
    
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
                userMarker = null
                markerPlaced = false;
                
                
                }
                selectedCountry = getCountry();
                question.textContent = ` ${selectedCountry.flag.emoji}`
                question.classList.remove("correct", "incorrect")


               
                });
                
                
                
                function getCountry() {
                const countryKeys = Object.keys(countries)
                const randomIndex = Math.floor(Math.random() * countryKeys.length)
                const countryKey = countryKeys[randomIndex]
                selectedCountry = {
                name: getNestedValue(countries, countryKey, "name"),
                flag: getNestedValue(countries, countryKey, "flag"),
                }
                question.textContent = ` ${selectedCountry.flag.emoji}`
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
                                var address_components = results[3].address_components;
                                for (var i = 0; i < address_components.length; i++) {
                                    if (address_components[i].types[0] === "country" && address_components[i].types[1] === "political") {
                                        userSelectedCountry = address_components[i].long_name;
                                        break;
                                    }
                                }
                            }
                        }
                        placeUserMarker(location, userSelectedCountry);
                        checkAnswer()
                        handlePlaceClick(LookupRegionResponse)
                    });
                }
                
                function placeUserMarker(location, userSelectedCountry) {
                    userMarker = new google.maps.Marker({
                        position: location,
                        map: map,
                        label: {
                            text: `${userSelectedCountry}`,
                            className: 'marker-label',
                        },
                        animation: google.maps.Animation.Drop,
                    });
                }
                
                

                function  checkAnswer() {
               
                    if (userSelectedCountry === selectedCountry.name) {
                        question.textContent = `Correct that's ${selectedCountry.name}`
                       question.classList.add("correct")

                    } else {
                    question.textContent = `Wrong that's the flag of ${selectedCountry.name}`
                    question.classList.add("incorrect")
                    console.log("incorrect")
                    }
                  }
                
                  


                  function handlePlaceClick(event) {
                    let feature = event.features[0];
                  
                    console.log(event);
                    if (!feature.placeId) return;
                  
                    // Apply the style to the feature layer.
                    applyStyleToSelected(feature.placeId);
                  

                  }

                  function applyStyleToSelected(placeid) {
                    // Apply styles to the feature layer.
                    featureLayer.style = (options) => {
                      // Style fill and stroke for a polygon.
                      if (placeid && options.feature.placeId == placeid) {
                        return styleClicked;
                      }
                      // Style only the stroke for the entire feature type.
                      return styleDefault;
                    };
                  }

                  
                  // Headers
const headers = {
    "X-Goog-Api-Key": "AIzaSyAu0fUB9qD0-7S277XMZqIGXdNnLejKZgo",
  };
  const data: LookupRegionRequestData = {
    identifiers: [
      {
        "place": `${selectedCountry.name}`,
        
      },
    ],
  };
  const response: LookupRegionResponse = await RegionLookup.lookupRegion({ headers, data });