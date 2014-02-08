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

// initalize map function
function main() {
    //load coordinates of current city and enable tapping
    map = L.map('map',{center: [15.304221,-61.384134],zoom:16,tap:true});
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
              searchlayer = L.marker([latitude,longitude]).bindPopup("<b><a href='#' style='text-decoration:none;'><p>"+ company +"</p></a></b>" +
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
      searchlayer.bounce({duration: 500, height: 100}, function(){console.log("done")});
  
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
            if(searchstr ==''){

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

// trigger keypress event on login-btn submit
$(document).ready(function() {
    $('#login-btn').submit(function(e) {
         var username = $("#username").val();
         var password = $("#password").val();
        
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: './include/user-login.php',
            data: 'username='+ username,
            success: function(data) {
        
                if (data === 'Login') {
                    window.location = './include/user-login.php';
                } else {
                    alert('Invalid Credentials');
                }
            }
        });
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

$(document).ready(function(){
    $("#toggle-up").click(function(){
        $("#menu-panel").slideToggle("slow");
    });
});


$(document).ready(function(){
    $("#login-btn").click(function(){
          
    });
});


