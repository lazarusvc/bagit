//####### Initialize the Map  #######//
var map = L.map('map',
                {
                  center: [15.304221,-61.384134], //<== Exact Coordinates of the town of Roseau 
                  animate: true, //<== Creates an animation effect when navigating the map
                  zoom:20 //<== Creates an initial zoom level on map load 
                });

//####### Load and display tile layers on the map #######//
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png').addTo(map);

//####### Automatically locates and sets a maximum view #######//
map.locate({setView: true});

//##### Adds Marker to map at specified coordinates  ####//
L.marker([15.304221,-61.384134]).addTo(map)
.bindPopup("<b>Roseau</b>").openPopup(); //<== Creates a Popup on the marker 


    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp                    + '<br />';
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }
	