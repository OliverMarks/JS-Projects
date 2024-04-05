

let map;
let citiesAll = {};
let city = {};
let marker;
let userMarker;
let markerPlaced = false;
let markerCircle
let score = 0


const nextBtn = document.getElementById("next-btn")
const question = document.getElementById("question")
const submitBtn = document.getElementById("submit-btn")
const scoreBox = document.getElementById("score")

const timezoneHint = document.getElementById("timezone-hint")
const currencyHint = document.getElementById("currency-hint")
// const countryHint = document.getElementById("country-hint")

const getData = () => {
    return fetch('citiesAll.json')
        .then(response => response.json())
        .then(data => {
            citiesAll = data;
        });
};

getData()
    .then(() => {
        if (Object.keys(citiesAll).length) {
            city = getCities();
            initMap();
        } else {
            console.error('No city data found');
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
            mapTypeControl: false
        });



        google.maps.event.addListener(map, 'click', function (event) {
            if (!markerPlaced) {
                placeUserMarker(event.latLng);
                markerPlaced = true;

            }
        });

        if (!marker) {
            marker = new google.maps.Marker({
                position: { lat: city.latitude, lng: city.longitude },
                map: map,
                label: {
                    text: city.name,
                    className: 'marker-label'
                },
                animation: google.maps.Animation.Drop,
                visible: false
                });
                }
                } else {
                setTimeout(initMap, 100);
                }
                }
                
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



                timezoneHint.addEventListener("click", function(){
                    timezoneHint.innerHTML =`${city.timezone.timezone}`
                })

                currencyHint.addEventListener("click", function(){
                    currencyHint.innerHTML =`${city.currency.code}`
                })

               

                submitBtn.addEventListener("click", function (){  
                    checkAnswer()
                })


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
                city = getCities();
                marker.setPosition({ lat: city.latitude, lng: city.longitude });
                marker.setLabel({
                text: city.name,
                className: 'marker-label',
                
                
                });
                question.classList.remove("correct", "incorrect")
                timezoneHint.innerHTML = `<i class="fa-solid fa-clock hint-icons"></i>`
                currencyHint.innerHTML = `<i class="fa-solid fa-dollar-sign hint-icons"></i>`
                // countryHint.innerHTML = `<i class="fa-solid fa-map-location-pin hint-icons"></i>`
                marker.setVisible(false);
                submitBtn.disabled = true
                });
                
                
                
                function getCities() {
                const cityKeys = Object.keys(citiesAll)
                const randomIndex = Math.floor(Math.random() * cityKeys.length)
                const cityKey = cityKeys[randomIndex]
                city = {
                name: getNestedValue(citiesAll, cityKey, "name"),
                longitude: getNestedValue(citiesAll, cityKey, "longitude"),
                latitude: getNestedValue(citiesAll, cityKey, "latitude"),
                timezone: getNestedValue(citiesAll, cityKey, "timezone"),
                currency: getNestedValue(citiesAll, cityKey, "currency"),
                country: getNestedValue(citiesAll, cityKey, "country")

                }
                document.getElementById("question").textContent = `${city.name}`
                return city
                }
                
                function getNestedValue(obj, key, nestedKey) {
                if (obj[key] && obj[key][nestedKey]) {
                return obj[key][nestedKey]
                }
                return null
                }
    

                