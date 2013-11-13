//####### Initialize the Map  #######//
var map = L.map('map',
                {
                  center: [15.304221,-61.384134],
                  animate: true,
                  zoom:20
                });

//####### Load and display tile layers on the map #######//
L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png').addTo(map);

//####### Automatically locates and sets a maximum view #######//
map.locate({setView: true});

//##### Adds Marker to map at specified coordinates  ####//
L.marker([15.304221,-61.384134]).addTo(map)
.bindPopup("<b>Roseau</b>").openPopup();