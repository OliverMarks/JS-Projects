

let map;
let citiesAll = {};
let city = {};
let marker;
let userMarker;
let markerPlaced = false;
let geocoder

const generateMarker = document.getElementById("generate-marker");

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

        geocoder = new google.maps.Geocoder();


        google.maps.event.addListener(map, 'click', function (event) {
            if (!markerPlaced) {
                placeMarker(event.latLng);
                markerPlaced = true;
                geocode(event.latLng);

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
                
                function placeMarker(location) {
                userMarker = new google.maps.Marker({
                position: location,
                map: map,
                label: {
                text: "Your Guess",
                className: 'marker-label',
                },
                animation: google.maps.Animation.Drop,
                });
                marker.setVisible(true);

                    let distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), userMarker.getPosition());
                    let distanceInKilometers = Math.floor(distanceInMeters / 1000)
                    document.getElementById("question").textContent = `Only ${distanceInKilometers}km away`

                }

                generateMarker.addEventListener("click", function () {
                if (markerPlaced) {
                userMarker.setMap(null);
                userMarker = null
                markerPlaced = false;
                marker.setVisible(false);
                document.getElementById("response").innerText = ""
                }
                city = getCities();
                marker.setPosition({ lat: city.latitude, lng: city.longitude });
                marker.setLabel({
                text: city.name,
                className: 'marker-label',
                });
                marker.setVisible(false);
                });
                
                function getCities() {
                const cityKeys = Object.keys(citiesAll)
                const randomIndex = Math.floor(Math.random() * cityKeys.length)
                const cityKey = cityKeys[randomIndex]
                city = {
                name: getNestedValue(citiesAll, cityKey, "name"),
                longitude: getNestedValue(citiesAll, cityKey, "longitude"),
                latitude: getNestedValue(citiesAll, cityKey, "latitude")
                }
                document.getElementById("question").textContent = `click where you think ${city.name} is`
                return city
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
                                        var country = address_components[i].long_name;
                                        break;
                                    }
                                }
                                console.log(country)
                                document.getElementById("response").innerText = country;
                            } else {
                                console.log('No results found');
                            }
                        } else {
                            console.log('Geocoder failed due to: ' + status);
                        }
                    });
                }