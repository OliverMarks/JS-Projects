let map;
let citiesAll
let city = []
let marker;
let userMarker
let markerPlaced = false;



const generateMarker = document.getElementById("generate-marker")


const getData = () => {
    return fetch('citiesAll.json')
        .then(response => response.json())
        .then(data => {
            citiesAll = data;
        });
};

getData().then(() => {
    if (citiesAll) {
        const city = getCities();
        if(city){
            initMap();
        }
    }
});

function initMap() {
   if (typeof google !== 'undefined') {
     const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.4637, lng: 3.7492 },
        zoom: 2,
        mapId:'a3924b58325ef9ed',
        streetViewControl: false,
        mapTypeControl: false
     });
    
    
     google.maps.event.addListener(map, 'click', function(event) {
        if (!markerPlaced) {
            placeMarker(event.latLng);
            markerPlaced = true;
        }
        

    });


    
    
    function placeMarker(location) {
       userMarker = new google.maps.Marker({
            position: location, 
            map: map
        });
        marker.setVisible(true);

        let distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(marker.getPosition(), userMarker.getPosition());
        let distanceInKilometers = Math.floor(distanceInMeters / 1000)
        document.getElementById("question").textContent = `Only ${distanceInKilometers}km away`
    }
     if (!marker) {
        marker = new google.maps.Marker({
         position: { lat: city.latitude, lng: city.longitude },
         map: map
        });
        marker.setVisible(false);
       
      }
   } else {
     setTimeout(initMap, 100);
   }
}



  

  window.initMap = initMap;

 
  generateMarker.addEventListener("click", function(){
    if (markerPlaced) {
        userMarker.setMap(null);
        userMarker = null
        markerPlaced = false;
        marker.setVisible(false);

    }
    getCities()
    marker.setPosition({ lat: city.latitude, lng: city.longitude });
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
    
  console.log(getCities().name)

    function getNestedValue(obj, key, nestedKey) {
      if (obj[key] && obj[key][nestedKey]) {
        return obj[key][nestedKey]
      }
      return null
    }
  