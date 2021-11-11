// Enter your custom JavaScript code here

function beforeMapLoads(){
	console.log("Before map loads function");

	// // This function is called before the map loads, and is useful for manipulating the config object, eg
	// // to add a new custom layer.

	// // Create a layer which is based on a query string in the URL - this shows the US state based on the query
	// // value, eg bootleaf.html/?query=california
	// var statesConfig = {
	// 	"id": "us_states",
	// 	"name": "States",
	// 	"type": "agsDynamicLayer",
	// 	"url": "https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/",
	// 	"layers": [5],
	// 	"useCors": false,
	// 	"visible": true
	// }

	// var query = getURLParameter('query');
	// if(query) {
	// 	statesConfig.layerDefs = "5: STATE_NAME = '" + query + "'";
	// 	statesConfig.name += " (" + query + ")";
	// }

	// // Add this layer to the TOC and map.
	// config.layers.push(statesConfig);
	// for (i in config.tocCategories){
	// 	if (config.tocCategories[i]['name'] === 'ArcGIS Layers') {
	// 		config.tocCategories[i]['layers'].push(statesConfig.id);
	// 	}
	// }

	// // If there are any layers defined in the URL, add this layer to the list so it draws by default
	// if(bootleaf.layerParams.length > 0){
	// 	bootleaf.layerParams.push(statesConfig.id);
	// }
  
  
  //2021-11-03 add L.Control.Locate 
  //src= https://github.com/domoritz/leaflet-locatecontrol
  bootleaf.locateControl = L.control.locate({
      strings: {
          title: "Klik untuk menampilkan lokasi sekarang"
      }
  });//.addTo(bootleaf.map);


	// Continue to load the map
	loadMap();

}

function afterMapLoads(){
	// This function is run after the map has loaded. It gives access to bootleaf.map, bootleaf.TOCcontrol, etc

	console.log("After map loads function");

	// Check to see whether the Gray basemap is chosen, and the user has zoomed in too far. In this case,
	// switch to the Streets basemap
	bootleaf.map.on("zoomend", function(evt){
		if (bootleaf.currentBasemap === 'Gray'){
			if (evt.target._zoom >= 17) {
				setBasemap({"type": 'esri', "id": 'Streets'});
				$.growl.warning({ title: "Basemap change", message: "The grayscale basemap is not available at this scale"});
			}
		}
	});

	// Detect the coordinates of the address returned by the geocoder. This can be used elsewhere as required
	bootleaf.leafletGeocoder.on("markgeocode", function(evt){
		console.log("Coordinates: ", evt.geocode.center.lat, ", ", evt.geocode.center.lng);
	});
  
  
  bootleaf.locateControl.addTo(bootleaf.map);

  
}


/*
In this way given a MySQL date/time in the form "YYYY-MM-DD HH:MM:SS" or even the short form (only date) "YYYY-MM-DD" you can do:

var d1 = Date.createFromMysql("2011-02-20");
var d2 = Date.createFromMysql("2011-02-20 17:16:00");
alert("d1 year = " + d1.getFullYear());
*/
//https://www.generacodice.com/en/articolo/731200/Convert-MySql-DateTime-stamp-into-JavaScript%27s-Date-format
Date.createFromMysql = function(mysql_string)
{ 
   var t, result = null;

   if( typeof mysql_string === 'string' )
   {
      t = mysql_string.split(/[- :]/);

      //when t[3], t[4] and t[5] are missing they defaults to zero
      result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
   }

   return result;   
}

// Initialize Parse
Parse.initialize("cYlv6OxSL8y2zOQnyQfgVW8ApSGQ0HC8vn4GYZ91", "D8IDsCzCzfG6rK2YleE1hvCk13rI14lbl27RcRwi");
Parse.serverURL = "https://hebat.b4a.app/";

async function createParseGPS(coords,owner) {
  // Creates a new Parse GPS object
  let _myGPS = new Parse.Object("GPS");
  // Set the input values to the new GPS object
  _myGPS.set("geopoint", new Parse.GeoPoint({latitude: coords.latitude, longitude: coords.longitude}));
  _myGPS.set("accuracy", coords.accuracy);
  _myGPS.set("altitude", coords.altitude);
  _myGPS.set("altitudeAccuracy", coords.altitudeAccuracy);
  _myGPS.set("heading", coords.heading);
  _myGPS.set("speed", coords.speed);
  let _user = new Parse.User();
  _user.id = owner;
  // error _myGPS.set("owner", new Parse.User("objectID",owner));//UECjcJO1JB
  _myGPS.set("owner", _user)
  //_myGPS.set("owner", "UECjcJO1JB");//UECjcJO1JB //force
  try {
    // Call the save method, which returns the saved object if successful
    _myGPS = await _myGPS.save();
    if (_myGPS !== null) {
      // Notify the success by getting the attributes from the "User" object, by using the get method (the id attribute needs to be accessed directly, though)
      $.growl.notice(
        `New PARSE object created with success! ObjectId: ${
          _myGPS.id
        }`
      );
      console.log(
        `New object created with success! ObjectId: ${
          _myGPS.id
        }`
      );
    }
  } catch (error) {
    $.growl.error(`Error: ${error.message}`);
    console.log(`Error: ${error.message}`);
  }
}
