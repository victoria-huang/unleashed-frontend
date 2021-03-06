let myMarker;
let mymap;
let cruellaMarker;

function mapInit(dogLoc, cruellaLoc) {
  // console.log(dogLoc)
  mymap = L.map('map', {
    zoomControl: false
  }).setView([dogLoc.latitude, dogLoc.longitude], 17);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 16,
    zoomControl: false,
    dragging: !L.Browser.mobile,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoicmVkZmlzaDA3IiwiYSI6ImNqZ3hzbDNrMDI5NjUzM3Axcm90N2o2NmcifQ.HjxYG61ovRMiydlM3AkfPQ'
  }).addTo(mymap);

  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
  mymap.boxZoom.disable();
  mymap.keyboard.disable();
  $(".leaflet-control-zoom").css("visibility", "hidden");

  mymap.scrollWheelZoom.disable()
  mymap.keyboard.disable();
  mymap.touchZoom.disable();
  mymap.doubleClickZoom.disable();
  mymap.scrollWheelZoom.disable();
  mymap.boxZoom.disable();
  mymap.keyboard.disable();
  $(".leaflet-control-zoom").css("visibility", "hidden");

  var myIcon = L.icon({
    iconUrl: 'https://dl.dropboxusercontent.com/s/mwq7anqrx04k3so/pug2.gif',
    iconSize: [80, 50]
  });

  myMarker = L.marker([dogLoc.latitude, dogLoc.longitude], {
    autoPan: true,
    autoPanSpeed: 10,
    icon: myIcon
  }).addTo(mymap)

  var cruella = L.icon({
    iconUrl: 'https://dl.dropboxusercontent.com/s/cwps7d02dum7ypj/cruella.gif?dl=0',
    iconSize: [50, 50]
  });

  cruellaMarker = L.marker([cruellaLoc.latitude, cruellaLoc.longitude], {
    autoPan: true,
    autoPanSpeed: 10,
    icon: cruella
  }).addTo(mymap)
}

function moveTo(data) {
  myMarker.setLatLng([data.latitude, data.longitude], {
    draggable: 'true'
  }).update();
  mymap.panTo(new L.LatLng(data.latitude, data.longitude));
}

function outOfBounds() {
  myMarker.bindPopup("I can't move that way!").openPopup();
  setTimeout(function() {
    mymap.closePopup()
  }, 800)
}

function foundItem(item) {
  playGetCollectableNoise()

  let itemIcon = L.icon({
    iconUrl: `${item.img}`,
    iconSize: [50, 50]
  })

  myMarker.bindPopup(`I found <b>${item.name}</b>! <img src=${item.img} width="50" height="50">`).openPopup();
  setTimeout(() => mymap.closePopup(), 1300)

  L.marker([dogLocation.latitude, dogLocation.longitude], {
    icon: itemIcon
  }).addTo(mymap);

  stop = true
  setTimeout(() => {
    stop = false
  }, 1000)

  let char = store.npcs.find(n => n.dialogue.indexOf(item.name) >= 0)

  let npcs = document.querySelectorAll(`img[src="${char.img}"]`)
  npcs.forEach(npc => {
    npc.classList.add("fadeout-npc")
    let setFound = store.npcs.find(n => n.img === npc.getAttribute('src'))
    setFound.found = true
  })
}

function unlocked() {
  const markerImg = document.querySelector('#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > img:nth-child(1)')
  markerImg.src = 'https://dl.dropboxusercontent.com/s/tjviytubg8zg3s6/unlocked.gif'
  document.getElementById("unlocked").style.display = "block";
  let unlockedText = document.getElementById('unlocked-text');
  unlockedText.innerHTML = "<h4 id='title' align='center'>You've unlocked the secret character!</h4><hr><img src='https://dl.dropboxusercontent.com/s/tjviytubg8zg3s6/unlocked.gif' class='center'><hr><h5 align='center'>Click anywhere to resume!</h5>"

  let navBar = document.getElementsByClassName('navbar-nav mr-auto')[0]
  navBar.innerHTML += "<a class='nav-item nav-link' data-toggle='modal' id='change-char'>Transform</a>"
  document.getElementById('change-char').addEventListener('click', () => {
    toggleChar();
  })
}

function toggleChar() {
  const markerImg = document.querySelector('#map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-marker-pane > img:nth-child(1)')

  if (markerImg.src === 'https://dl.dropboxusercontent.com/s/tjviytubg8zg3s6/unlocked.gif') {
    markerImg.src = 'https://dl.dropboxusercontent.com/s/mwq7anqrx04k3so/pug2.gif'
  } else {
    markerImg.src = 'https://dl.dropboxusercontent.com/s/tjviytubg8zg3s6/unlocked.gif'
  }
}

function moveCruella(cruella, dog) {
  let num = Math.round(Math.random());

  if (num === 0) {
    return moveStreet(cruella, dog);
  } else {
    return moveAve(cruella, dog)
  }
}

function moveStreet(cruella, dog) {
  if (parseInt(cruella.street) < parseInt(dog.street) && parseInt(cruella.street) < 50) {
    newCruella = store.locations.find(l => l.street === `${parseInt(cruella.street) + 1}` && l.ave === cruella.ave)
    return cruellaMoveTo(newCruella)
    // console.log("move up street")
  } else if (parseInt(cruella.street) > parseInt(dog.street) && parseInt(cruella.street) > 14) {
    newCruella = store.locations.find(l => l.street === `${parseInt(cruella.street) - 1}` && l.ave === cruella.ave)
    return cruellaMoveTo(newCruella)
    // console.log("move down street")
  } else {
    if (cruella.ave === dog.ave) {
      gameOver();
    } else {
      return moveAve(cruella, dog);
    }
  }
}

function moveAve(cruella, dog) {
  if (parseInt(cruella.ave) < parseInt(dog.ave) && parseInt(cruella.ave) < 9) {
    newCruella = store.locations.find(l => l.street === cruella.street && l.ave === `${parseInt(cruella.ave) + 1}`)
    return cruellaMoveTo(newCruella)
    // console.log("move up ave")
  } else if (parseInt(cruella.ave) > parseInt(dog.ave) && parseInt(cruella.ave) > 1) {
    newCruella = store.locations.find(l => l.street === cruella.street && l.ave === `${parseInt(cruella.ave) - 1}`)
    return cruellaMoveTo(newCruella)
    // console.log("move down ave")
  } else {
    if (cruella.street === dog.street) {
      gameOver();
    } else {
      return moveStreet(cruella, dog);
    }
  }
}

function cruellaMoveTo(data) {
  // console.log(cruellaMarker)
  cruellaMarker.setLatLng([data.latitude, data.longitude]).update()
  return data;
}

function gameOver() {
  if (cruellaInterval) {
    clearInterval(cruellaInterval);
  }

  let overlayText = document.getElementById("reload-text")
  overlayText.innerHTML = "<img src='https://dl.dropboxusercontent.com/s/anyyh8bsk1mur5x/sad_pug.gif?dl=0' height='300px' width='200px'><h3>GAME OVER</h3><hr><h5>Cruella found you :(</h5><hr><h5>Click Anywhere to Play Again!</h5>"
  document.getElementById("reload").style.display = "block";
  fetch('https://unleashedbackendapp.herokuapp.com/api/v1/locations/reset')
}
