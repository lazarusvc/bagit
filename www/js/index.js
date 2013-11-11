//This section takes care of the Map integration and handling
var map = L.map('map');

L.tileLayer('http://{s}.tile.cloudmade.com/API-key/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
}).addTo(map);

map.locate({setView: true, maxZoom: 16});

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);
//This section initiates the device
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
alert("Device is Ready");

}
//What to do when paused
function onPause(){
alert("paused!");
}
//What to do when resumed
function onResume()
{
alert("resume");
}
