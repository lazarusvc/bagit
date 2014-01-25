// declare global variables
var map;                                                           // declare map
var companies = new L.layerGroup();                                // declare new companies layerGroup
var searchlayer;                                                   // declare search layer
var markerarray = [];                                              // declare marker array

// initalize map function
function main() {


    //load coordinates of current city and enable tapping
    map = L.map('map',{
      zoom:16,
      tap:true});
  


//Custom Bagit marker icons (Define)   
  var LeafIcon = L.Icon.extend({
    options: {
        iconUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/g3017_zps7c57828a.png',
        shadowUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/Marker-Shadow_zps93ab5b53.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});
  
//Custom Bagit marker icons (Class)
var aIcon = new LeafIcon({iconUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/g3017_zps7c57828a.png'}),
    bIcon = new LeafIcon({iconUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/g3023_zps561076ae.png'});

  
//Function for Geoloaction -- Locate user  
function onLocationFound(e) {
			var radius = e.accuracy / 2;
            var bIcon = new LeafIcon();
  
			L.marker(e.latlng, {icon: bIcon}).addTo(map)
				.bindPopup("Yay! You are within " + radius + " meters from this point").openPopup();

			L.circle(e.latlng, radius).addTo(map);
		}

function onLocationError(e) {
			alert(e.message);
		}

		map.on('locationfound', onLocationFound);
		map.on('locationerror', onLocationError);

		map.locate({setView: true, maxZoom: 16
});
  
  
  //Load and display tile layers on the map
    var mapLayer =  L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',{}).addTo(map);
}

// call map initialize function
window.onload = main;

// plot map marker function  with argument for json data
function plotmarkers(sqljson) {
    
    // get number of layers existing
    if(companies.getLayers().length > 0){
        // check if layers exist
        companies.clearLayers();                                   // clear layers before creating new layer
        createmarker(sqljson);                                     // call create map marker function and pass sqljson data
        markerarray = [];                                          // reset array after creating layer markers
        
    } else {
    
        createmarker(sqljson);                                     // call create map marker function pass sqljson data
        markerarray = [];                                          // reset array after creating layer markers
    
    }
}

// create map marker function with argument for json data
function createmarker(jsonobj){
    
$(function(){
  
  //Custom icon
  var bIcon = new LeafIcon();
    // iterate through json array object "products"
    for (var key in jsonobj.products) {
        //set loop key
        if (jsonobj.products.hasOwnProperty(key)) {
  
              var company   = jsonobj.products[key].company;       // assign company variable
              var latitude  = jsonobj.products[key].latitude;      // assign latitude coordinates
              var longitude = jsonobj.products[key].longitude;     // assign longitude coordinates
              var address   = jsonobj.products[key].address;       // assign business local address
              var opening   = jsonobj.products[key].opening;       // assign business opening time
              var closing   = jsonobj.products[key].closing;       // assign business closing time
  
              // assign marker to searchlayer variable with popup data attached to marker
          searchlayer = L.marker([latitude,longitude], {icon: bIcon}).bindPopup("<b><a href='#' style='text-decoration:none;'><p>"+ company +"</p></a></b>" +
                                                                     "<p>"+ address +"</p>" +
                                                                     "<p>Open: "+ opening +"AM</p>" +
                                                                     "<p>Close: "+ closing+"PM</p>"
                                                                     );
              // push searchlayer object into temporary markerarray
              markerarray.push(searchlayer);
  
          }
      }
  
  
      var layerrarray = [];                                         // initalize layer array
      for (var i in markerarray){                                   // iterate through layer array and add search layer markers
          layerrarray.push(markerarray[i]);                         // push search layer marker objects into array
      }
      
      // assign layerGroup to variable companies
      companies = L.layerGroup(layerrarray);
      // add companies layer to map
      map.addLayer(companies);
      // add animation to markers in searchlayer
      searchlayer.bounce({duration: 500, height: 100}, function(){
        console.log("done");
      });
  
  });
}


$(function() {
  
    // trigger keypress event on search input element
    $("#search").keypress(function() {
        // check if return key pressed
        if (event.keyCode == 13) {

            var searchstr = $("#search").val();                     // get input for search element
            var dataString = 'search='+ searchstr;                  // set input for search element
            
            // check if string Null
            if(searchstr ===''){

            $( "#error404" ).popup("open");                         // display error404 message for div id#
            $("#search").focus();                                   // reset cursor

            } else {
                
                // ajax page loading function
                $.ajax({
                   type: "POST",                                    // define method
                   url: "./include/map_search.php",                 // define file path
                   data: dataString,                                // define output format
                   cache: true,                                     // enable caching
                   success: function(html){
                       
                       jsonarray = new Array([]);                     // initialize array to contain json object
                       var sqlsearch = JSON.parse(html);            // parse json string
                       
                       jsonarray = sqlsearch;                       // assign json object to array
                       plotmarkers(jsonarray);                      // call plotmarker function to pass json object
                       document.getElementById('search').value='';  // clear search variable
                       $("#search").focus();                        // reset cursor
                    }
                });
            }
        return false;                                               // return false
        }
    });
});
