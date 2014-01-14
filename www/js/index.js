//Initialize the Map
$(document).on('pageinit', '#index', function(){  

//Loads page w/o tile issue  
setTimeout(function(){
  var map = L.map('map',{
    
//Exact Coordinates for the town of Roseau 
center: [15.304221,-61.384134], 
//Creates an initial zoom level on map             
zoom:16,
//Enables double tapping 
tap:true
});
  
//Custom Bagit marker icons (Define)   
  var LeafIcon = L.Icon.extend({
    options: {
        iconUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/Marker-A_zpsf0ea448b.png',
        shadowUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/Marker-Shadow_zps93ab5b53.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});
  
//Custom Bagit marker icons (Class)
var aIcon = new LeafIcon({iconUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/Marker-A_zpsf0ea448b.png'}),
    bIcon = new LeafIcon({iconUrl: 'http://i818.photobucket.com/albums/zz102/g-star118/Marker-B_zpsd83fdad7.png'});

    
//Load and display tile layers on the map
var mapLayer =  L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',{
    }).addTo(map);


//Marker w/ Popup for Roseau Central 
L.marker([15.304221,-61.384134], {icon: bIcon}).addTo(map).bindPopup(
  "<a href='#Roseau' style='text-decoration:none;'><p>Roseau Central</p></a>"); 

//Marker w/ Popop for Princess Margaret Hospital  
L.marker([15.305708,-61.385105], {icon: aIcon}).addTo(map).bindPopup(
  "<a href='#PMH' style='text-decoration:none;'><p>Princess Margaret Hospital</p></a><hr width='100%' color='grey'><p>Charles Avenue, Goodwill</p>");

  
//Marker w/ Popop for Roseau Bus Stop   
L.marker([15.300650,-61.388465], {icon: bIcon}).addTo(map).bindPopup(
  "<a href='#RBS' style='text-decoration:none;'><p>Roseau Bus Stop</p></a>");
  
  
//Marker w/ Popop for Roseau Valley Bus Stop   
L.marker([15.299134,-61.38522], {icon: bIcon}).addTo(map).bindPopup(
  "<a href='#RVBS' style='text-decoration:none;'><p>Roseau Valley Bus Stop</p></a>"); 

//Marker w/ Popop for My home(TEST)   
L.marker([15.3332779,-61.3852137], {icon: bIcon}).addTo(map).bindPopup(
"<a href='#test' style='text-decoration:none;'><p>Hello World!</p></a>");
  
//Marker w/ Popop for Optical Services Ltd.   
L.marker([15.3009985,-61.3867475], {icon: aIcon}).addTo(map).bindPopup(
  "<a href='#Optical' style='text-decoration:none;'><p>Optical Services Ltd.</p></a><hr width='100%' color='grey'><p><b>Tel: 449-9099</b></p><p>Hillsborough Street</p><p>Open-8:00am</p>Closed-6:00pm</p>");
  
  
  
  },1);// end of Load page issue 
});// end of Initialize Map

	
	
		


