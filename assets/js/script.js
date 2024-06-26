//M-Check Variables
let currentQuestion = 0;
let previousQuestion = -1;
const ids = ["q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "q12", "q13", "q14", "q15", "q16", "q17", "q18", "q19", "q20"]

//Function to start quiz and show next question in the survery
function nextQ() {
  currentQuestion++;
  previousQuestion++;
  let nextShow = document.getElementById(ids[currentQuestion]);
  nextShow.style.display = "block";
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none";
}
function showReport() {
  let nextShow = document.getElementById("mcheck-report");
  nextShow.style.display = "block";
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none";
}
// Function to capture radio input and add it to final report
function addToReport() {
  document.getElementById("report").innerHTML = " ";
  var ele = document.getElementsByTagName('input');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].type = "radio") {

      if (ele[i].checked)
        document.getElementById("report").innerHTML
          += ele[i].name + ele[i].value + "<br>";
    }
  }
}

//Function to show the report
function showReport() {
  currentQuestion++;
  previousQuestion++;
  let preHide = document.getElementById(ids[previousQuestion]);
  preHide.style.display = "none";
  let reportshow = document.getElementById("mcheck-report");
  reportshow.style.display = "block";
}
//Function to update the m-check image with progress
function updateCheckImage() {
  if (currentQuestion == 0) {
    document.getElementById('mcheck').src = "assets/img/bicycle_m.png";
  } else if (currentQuestion >= 1 && currentQuestion <= 3) {
    document.getElementById('mcheck').src = "assets/img/check1.png";
  } else if (currentQuestion >= 4 && currentQuestion <= 5) {
    document.getElementById('mcheck').src = "assets/img/check2.png";
  } else if (currentQuestion >= 6 && currentQuestion <= 7) {
    document.getElementById('mcheck').src = "assets/img/check3.png";
  } else if (currentQuestion >= 8 && currentQuestion <= 9) {
    document.getElementById('mcheck').src = "assets/img/check4.png";
  } else if (currentQuestion >= 10 && currentQuestion <= 12) {
    document.getElementById('mcheck').src = "assets/img/check5.png";
  }
}
//Function to show next question
function nextQuestion() {
  addToReport();
  nextQ();
  updateCheckImage();
}

function startQuiz() {
  nextQ();
  updateCheckImage();
}
window.onload = updateCheckImage;

function copyReport(text) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
  }


//Google Maps Script: the following code was modified by myself based on a Google guide on how to use Map API's //

let pos;
let map;
let bounds;
let infoWindow;
let currentInfoWindow;
let service;
let infoPane;

function initMap() {
  // Initialize variables
  bounds = new google.maps.LatLngBounds();
  infoWindow = new google.maps.InfoWindow;
  currentInfoWindow = infoWindow;
  infoPane = document.getElementById('panel');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 13
      });
      bounds.extend(pos);

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
      getNearbyPlaces(pos);
    }, () => {
      handleLocationError(true, infoWindow);
    });
  } else {
    handleLocationError(false, infoWindow);
  }
}

// Handle a geolocation error
function handleLocationError(browserHasGeolocation, infoWindow) {
  // Set default location to Bristol, UK
  pos = { lat: 51.469, lng: -2.59 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 12,
  });

  // Display an InfoWindow at the map center
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Geolocation permissions denied. Using default location.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
  currentInfoWindow = infoWindow;
  getNearbyPlaces(pos);
  }

function getNearbyPlaces(position) {
  let request = {
    location: position,
    rankBy: google.maps.places.RankBy.DISTANCE,
    keyword: 'bicycle mechanic+bike repair'
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, nearbyCallback);
}
function nearbyCallback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    createMarkers(results);
  }
}
function createMarkers(places) {
  places.forEach(place => {
    let marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
    google.maps.event.addListener(marker, 'click', () => {
      let request = {
        placeId: place.place_id,
        fields: ['name', 'formatted_address', 'geometry', 'rating',
          'website', 'photos']
      };
      service.getDetails(request, (placeResult, status) => {
        showDetails(placeResult, marker, status)
      });
    });
    bounds.extend(place.geometry.location);
  });
   map.fitBounds(bounds);
}
function showDetails(placeResult, marker, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    let placeInfowindow = new google.maps.InfoWindow();
    let rating = "None";
    if (placeResult.rating) rating = placeResult.rating;
    placeInfowindow.setContent('<div><strong>' + placeResult.name +
      '</strong><br>' + 'Rating: ' + rating + '</div>');
    placeInfowindow.open(marker.map, marker);
    currentInfoWindow.close();
    currentInfoWindow = placeInfowindow;
    showPanel(placeResult);
  } else {
    console.log('showDetails failed: ' + status);
  }
}

function showPanel(placeResult) {
  // If infoPane is already open, close it
  if (infoPane.classList.contains("open")) {
    infoPane.classList.remove("open");
  }

    while (infoPane.lastChild) {
    infoPane.removeChild(infoPane.lastChild);
  }
 if (placeResult.photos) {
    let firstPhoto = placeResult.photos[0];
    let photo = document.createElement('img');
    photo.classList.add('hero');
    photo.src = firstPhoto.getUrl();
    infoPane.appendChild(photo);
  }
  let name = document.createElement('h1');
  name.classList.add('place');
  name.textContent = placeResult.name;
  infoPane.appendChild(name);
  if (placeResult.rating) {
    let rating = document.createElement('p');
    rating.classList.add('details');
    rating.textContent = `Rating: ${placeResult.rating} \u272e`;
    infoPane.appendChild(rating);
  }
  let address = document.createElement('p');
  address.classList.add('details');
  address.textContent = placeResult.formatted_address;
  infoPane.appendChild(address);
  if (placeResult.website) {
    let websitePara = document.createElement('p');
    let websiteLink = document.createElement('a');
    let websiteUrl = document.createTextNode(placeResult.website);
    websiteLink.appendChild(websiteUrl);
    websiteLink.title = placeResult.website;
    websiteLink.href = placeResult.website;
    websitePara.appendChild(websiteLink);
    infoPane.appendChild(websitePara);
  }

 infoPane.classList.add("close");
}