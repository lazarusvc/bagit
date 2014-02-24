/*
 * Main javascript file functionality
 * leaflet API
 * App Login
 * Facbook Login API
*/

// declare global variables
var map;                                                           // declare map
var companies = new L.layerGroup();                                // declare new companies layerGroup
var searchlayer;                                                   // declare search layer
var markerarray = [];                                              // declare marker array
var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/{styleId}/256/{z}/{x}/{y}.png';
var LeafIcon = L.Icon.extend({
	options: {
		shadowUrl: 'leaflet-0.7.1/images/marker-shadow.png',
		iconUrl: 'leaflet-0.7.1/images/marker-icon.png',
		iconSize:     [32, 52],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 94],
		popupAnchor:  [-5, -90]
	}
});
var minimal   = L.tileLayer(cloudmadeUrl, {styleId: 22677}),
style  = L.tileLayer(cloudmadeUrl, {styleId: 118958}),
regular  = L.tileLayer(cloudmadeUrl, {styleId: 997});


// call map initialize function
window.onload = main;

// initalize map function
function main() {

	//load coordinates of current city and enable tapping
    map = L.map('map',{
    center: [15.304221,-61.384134],
	zoom:16,
	tap:true,
	layers: [style, minimal, regular ],
	zoomControl: false
	});

    // Add our zoom control manually where we want to
    var zoomControl = L.control.zoom({
        position: 'topleft'
    });
    map.addControl(zoomControl);

    //Load and display tile layers on the map
    var baseMaps = {"Bagit Grey layer": minimal,"Bagit color layer": style,"Traditional layer": regular};

    //Controls for Map layer
    L.control.layers(baseMaps, null,{position:'topleft'
    }).addTo(map);

    //Base map layer - Bagit Style
    var mapLayer =  L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/22677/256/{z}/{x}/{y}.png',{}).addTo(map);

    //Custom markers
    var blueIcon = new LeafIcon({iconUrl: 'leaflet-0.7.1/images/marker-icon.png'}),
	pinkIcon = new LeafIcon({iconUrl: 'leaflet-0.7.1/images/marker-icon-2.png'});



 // add a marker in the given location, attach some popup content to it and open the popup
    L.marker([15.304221,-61.384134], {icon: pinkIcon}).addTo(map)
        .bindPopup('<strong>Bagit</strong> makes it easy to </br> Find, Browse and Shop for </br>products near you.')
        .openPopup();

  //Search
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
                    // jsonp pass search variable to remote url and get data from mysql
                    $.getJSON('http://www.macasdominica.net/map_search.php?callback=?',dataString,function(data){
                        plotmarkers(data);                              // call plotmarker function to pass json object

                    });
                }
            return false;
            }
        });
    });

}//End of Main




$(window).load(function() {
    screenloader();
});

function screenloader(){
    $('#status').fadeOut();                             // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow');         // fade out the white DIV that covers the page;
    $('body').delay(350).css({'overflow':'visible'});

}


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

//create map marker function with argument for json data
function createmarker(jsonobj){

$(function(){

    //Custom markers
    var blueIcon = new LeafIcon({iconUrl: 'leaflet-0.7.1/images/marker-icon.png'}),
	pinkIcon = new LeafIcon({iconUrl: 'leaflet-0.7.1/images/marker-icon-2.png'});


    // iterate through json array object "products"
    for (var key in jsonobj.products) {
        //set loop key
 if (jsonobj.products.hasOwnProperty(key)){
   var tag = jsonobj.products[key].tag;       		// assign tag variable
              var company = jsonobj.products[key].company;       // assign company variable
              var latitude  = jsonobj.products[key].latitude;      // assign latitude coordinates
              var longitude = jsonobj.products[key].longitude;     // assign longitude coordinates
              var address   = jsonobj.products[key].address;       // assign business local address
              var opening   = jsonobj.products[key].opening;       // assign business opening time
              var closing   = jsonobj.products[key].closing;       // assign business closing time

              // assign marker to searchlayer variable with popup data attached to marker
              searchlayer = L.marker([latitude,longitude], {icon: blueIcon}).bindPopup("<b><a href='" + tag +"' style='text-decoration:none;'><img src='img/popup-img.png'/><p>"+ company +"</p></a></b>" + "<hr width='100%' color='grey'>"+ "</br>" +
                                                                     "<p>"+ address +"</p>" + "</br>" +
                                                                     "<p>Open: "+ opening +"AM</p>" + "</br>" +
                                                                     "<p>Close: "+ closing+"PM</p>",{ autoPan:true, keepInView:true, autoPanPaddingBottomRight:null
              });


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
      searchlayer.bounce({duration: 500, height: 100}, function(){console.log("done");
      });

  });
} //End of createMarker

// trigger keypress event on login-btn submit
$(document).ready(function() {
    $('#login-btn').click(function(e) {

         var username = $("#username").val();
         var password = $("#password").val();

        e.preventDefault();

        if (username === '' || password === ''){
          $( "#error406" ).popup("open");
        } else {

          if (username == "sysadmin" && password == "bagit"){
              $.mobile.changePage("#main", { transition: "pop"} );
              location.reload();
              screenloader();
          } else {
              $( "#error407" ).popup("open");

            $.ajax({
            url: 'http://www.macasdominica.net/user_login.php?callback=?',
            data: 'username='+ username +'&password='+ password,
            dataType: 'jsonp',
            success: function(data) {
                if (data == 'True') {
                    $.mobile.changePage("#main", { transition: "slideup"} );
                  location.reload();
                } else {
                  $( "#error407" ).popup("open");
                }
            }
           });

          }
        }
     });
});


window.fbAsyncInit = function() {
    FB.init({
            appId      : '1396057040652514', //App ID
            status     : true, // check login status
            cookie     : true, // enable cookies to allow the server to access the session
            xfbml      : true  // parse XFBML
            });

    // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
    // for any authentication related change, such as login, logout or session refresh.
    FB.Event.subscribe('auth.authResponseChange', function(response) {

        if (response.status === 'connected') {
            FBAPI();

        } else if (response.status === 'not_authorized') {
            FB.login();

        } else {
            FB.login();
        }
    });
};

    // Load the SDK asynchronously
    (function(d){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/en_US/all.js";
         ref.parentNode.insertBefore(js, ref);
     }(document));

    // Here we run a very simple test of the Graph API after login is successful.
    function FBAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
        });
}

//###### Dynamic page transition from Places to Companies ######//
$(document).ready(function(){
  $("#category-btn").click(function(){
        $.mobile.changePage("#companies", { transition: "slide"} );
    });
  $("#category-btn1").click(function(){
      $.mobile.changePage("#companies", { transition: "slide"} );
  });
  $("#category-btn2").click(function(){
      $.mobile.changePage("#companies", { transition: "slide"} );
  });
  $("#category-btn3").click(function(){
      $.mobile.changePage("#companies", { transition: "slide"} );
  });
  $("#category-btn4").click(function(){
      $.mobile.changePage("#companies", { transition: "slide"} );
  });
  $("#category-btn5").click(function(){
      $.mobile.changePage("#companies", { transition: "slide"} );
  });
});


$(document).ready(function(){
    $("#placespage").click(function(){
        screenloader();
        getplaces();
        $.mobile.changePage("#places", { transition: "pop"} );

    });
});

function getplaces() {
    $.ajax({
           url: 'http://www.macasdominica.net/count_place.php?callback=?',
           dataType: 'json',
           async: false,
           cache: false,
           success: function(data) {
           for (var i in data) {

               document.getElementById("total1").innerHTML = data[0];
               document.getElementById("total2").innerHTML = data[1];
               document.getElementById("total3").innerHTML = data[2];
               document.getElementById("total4").innerHTML = data[3];
               document.getElementById("total5").innerHTML = data[4];
               document.getElementById("total6").innerHTML = data[5];
           }
        }
    });
}

//Dynamically load panel
$(document).ready(function(){
	  $("#setting").click(function(){
		  $( "#setting" ).popup( "open" );
	    });
	});



