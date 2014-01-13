//Initialize Map
$(document).on('pageinit', '#index', function(){
    //Loads page w/o tile issue
    setTimeout(function(){
        //load coordinates of roseau city and enable tapping
        var map = L.map('map',{center: [15.304221,-61.384134],zoom:16,tap:true});
        //Load and display tile layers on the map
        var mapLayer =  L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',{}).addTo(map);
        //Marker w/ Popup for Roseau Central
        L.marker([15.304221,-61.384134]).addTo(map).bindPopup("<a href='#Roseau' style='text-decoration:none;'><p>Roseau Central</p></a>");
        //Marker w/ Popop for Princess Margaret Hospital
        L.marker([15.305708,-61.385105]).addTo(map).bindPopup("<a href='#PMH' style='text-decoration:none;'><p>Princess Margaret Hospital</p></a>");
        //Marker w/ Popop for Roseau Bus Stop
        L.marker([15.300650,-61.388465]).addTo(map).bindPopup("<a href='#RBS' style='text-decoration:none;'><p>Roseau Bus Stop</p></a>");
        //Marker w/ Popop for Roseau Valley Bus Stop
        L.marker([15.299134,-61.38522]).addTo(map).bindPopup("<a href='#RVBS' style='text-decoration:none;'><p>Roseau Valley Bus Stop</p></a>");
        //Marker w/ Popop for My home(TEST)
        L.marker([15.3332779,-61.3852137]).addTo(map).bindPopup("<a href='#test' style='text-decoration:none;'><p>Hello World!</p></a>");
    },1);// end of Load page issue
});// end of Initialize the Map
