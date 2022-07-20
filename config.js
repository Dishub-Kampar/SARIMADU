var config = {
	"requireArcGISLogin": false, // Does the user need to log in to ArcGIS Online or ArcGIS Server?
	"tokenUrl": 'https://www.arcgis.com/sharing/generateToken', // ArcGIS token generation URL

	"title": "SARIMADU",
	"start": {
		"center": [0.33710166666666663,101.14930333333332],// koordinat SARIMADU dari Yuris
		"zoom": 12,
		"attributionControl": false,
		"zoomControl": false
	},
	"about": {
		"title": "SARIMADU",
		"contents": "<h1>SARIMADU</h1><p>Sistem Area Rute Integrasi Masyarakat, Aparatur dan Dunia Usaha</p><img src='./img/logo.png'>"
	},
	"controls": {
		"zoom": {
			"position": "topleft"
		},
		"leafletGeocoder": {
			//https://github.com/perliedman/leaflet-control-geocoder
			"collapsed": false,
			"position": "topleft",
			"placeholder": "Search for a location",
			"type": "OpenStreetMap", // OpenStreetMap, Google, ArcGIS
			//"suffix": "Australia", // optional keyword to append to every search
			//"key": "AIzaS....sbW_E", // when using the Google geocoder, include your Google Maps API key (https://developers.google.com/maps/documentation/geocoding/start#get-a-key)
		},
		"TOC": {
			//https://leafletjs.com/reference-1.0.2.html#control-layers-option
			"collapsed": true,
			"uncategorisedLabel": "Layers",
			"position": "topright",
			"toggleAll": true
		},
		"history": {
			"position": "bottomleft"
		},
		"bookmarks": {
			"position": "bottomright",
			"places": [
				{
				"latlng": [
					0.31544920407146204, 101.03411116355805177
				],
				"zoom": 15,
				"name": "Dinas Perhubungan",
				"id": "a148fa354ba3",
				"editable": false,
				"removable": false
				}
			]
		}
	},

	"activeTool": "coordinates", //"", // options are  filterWidget / identify / coordinates / queryWidget
  //all basemaps are listed on README.md
  //
	"basemaps": ['OpenStreetMap','esriImagery', 'esriDarkGray', 'esriStreets', 'esriGray'],
	"bing_key": "",
	"mapboxKey": "",
	// "defaultIcon": {
	// 	"imagePath": "https://leafletjs.com/examples/custom-icons/",
	// 	"iconUrl": "leaf-green.png",
	// 	"shadowUrl": "leaf-shadow.png",
	// 	"iconSize":     [38, 95],
	// 		"shadowSize":   [50, 64],
	// 		"iconAnchor":   [22, 94],
	// 		"shadowAnchor": [4, 62],
	// 		"popupAnchor":  [-3, -76]
	// },
//	"tocCategories": [
//		{
//			"name": "GeoJSON layers",
//			"layers": ["theatres", "museums", "us_density"]
//		},
//		{
//			"name": "ArcGIS Layers",
//			"layers" : ["cities", "counties", "railways", "us_states"]
//		},
//		{
//			"name": "WMS/WFS layers",
//			"layers": ["US_population", "countries"],
//			"exclusive": false
//		}
//	],
	"projections": [
		{4269: '+proj=longlat +ellps=GRS80 +datum=NAD83 +no_defs '}
	],
	"highlightStyle": {
		"weight": 2,
		"opacity": 1,
		"color": 'white',
		"dashArray": '3',
		"fillOpacity": 0.5,
		"fillColor": '#E31A1C',
		"stroke": true
	},
	"layers": [
	{
    "id": "halte",
    "name": "Halte",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    //"minZoom": 12,
    "url": "./data/halte.geojson",
    "icon": {
        //"iconUrl": "./img/theater.png",
        //"iconSize": [24,28]
        "iconUrl": "./img/bus-30.png",
        "iconSize": [30,30]
    },
    "style": {
    "stroke": true,
    "fillColor": "#00FFFF",
    "fillOpacity": 0.5,
    "radius": 10,
    "weight": 0.5,
    "opacity": 1,
    "color": '#727272',
    },
	  "visible": true,
	  "label": {
	   	"name": "Name",
	   	"minZoom": 14
	  },
    "popup": true,
	},
  
	{
    "id": "bus1",
    "name": "Rute Bus 01",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    //"minZoom": 12,
    "url": "./data/bus1.geojson",
    //"style": {color: 'black', weight: '3',  dashArray: '3, 3', dashOffset: '0'},
    
    "style": function (feature) {
      var warna={"Pergi":"#ff3135", "Pulang":"#009b2e"};
      var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
        "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
        "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
        "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
        "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
        "Q":"#ffff00", "R":"#ffff00" };
      return {
        color: warna[feature.properties.Rute],
        weight: 5,
        dashArray: '10, 10', 
        dashOffset: '0',
        opacity: 1
      };
    },
	  "visible": true,
    "popup": true,
	},


	{
    "id": "bus2",
    "name": "Rute Bus 02",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    //"minZoom": 12,
    "url": "./data/bus2.geojson",
    //"style": {color: 'black', weight: '3',  dashArray: '3, 3', dashOffset: '0'},
    
    "style": function (feature) {
      var warna={"Pergi":"#ff3135", "Pulang":"#009b2e"};
      var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
        "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
        "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
        "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
        "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
        "Q":"#ffff00", "R":"#ffff00" };
      return {
        color: warna[feature.properties.Rute],
        weight: 5,
        dashArray: '10, 10', 
        dashOffset: '0',
        opacity: 1
      };
    },
	  "visible": true,
    "popup": true,
	},



	{
    "id": "bus3",
    "name": "Rute Bus 03",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    //"minZoom": 12,
    "url": "./data/bus3.geojson",
    //"style": {color: 'black', weight: '3',  dashArray: '3, 3', dashOffset: '0'},
    
    "style": function (feature) {
      var warna={"Pergi":"#ff3135", "Pulang":"#009b2e"};
      var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
        "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
        "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
        "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
        "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
        "Q":"#ffff00", "R":"#ffff00" };
      return {
        color: warna[feature.properties.Rute],
        weight: 5,
        dashArray: '10, 10', 
        dashOffset: '0',
        opacity: 1
      };
    },
	  "visible": true,
    "popup": true,
	},




	{
    "id": "bus4",
    "name": "Rute Bus 04",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    //"minZoom": 12,
    "url": "./data/bus4.geojson",
    //"style": {color: 'black', weight: '3',  dashArray: '3, 3', dashOffset: '0'},
    
    "style": function (feature) {
      var warna={"Pergi":"#976900", "Pulang":"#969696"};
      var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
        "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
        "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
        "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
        "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
        "Q":"#ffff00", "R":"#ffff00" };
      return {
        color: warna[feature.properties.Rute],
        weight: 5,
        dashArray: '10, 10', 
        dashOffset: '0',
        opacity: 1
      };
    },
	  "visible": true,
    "popup": true,
	},




	{
    "id": "bus5",
    "name": "Rute Bus 05",
    "type": "geoJSON",
    "cluster": true,
    "showCoverageOnHover": false,
    //"minZoom": 12,
    "url": "./data/bus5.geojson",
    //"style": {color: 'black', weight: '3',  dashArray: '3, 3', dashOffset: '0'},
    
    "style": function (feature) {
      var warna={"Pergi":"#ff3135", "Pulang":"#009b2e"};
      var subwayColors = {"1":"#ff3135", "2":"#ff3135", "3":"ff3135", "4":"#009b2e",
        "5":"#009b2e", "6":"#009b2e", "7":"#ce06cb", "A":"#fd9a00", "C":"#fd9a00",
        "E":"#fd9a00", "SI":"#fd9a00","H":"#fd9a00", "Air":"#ffff00", "B":"#ffff00",
        "D":"#ffff00", "F":"#ffff00", "M":"#ffff00", "G":"#9ace00", "FS":"#6e6e6e",
        "GS":"#6e6e6e", "J":"#976900", "Z":"#976900", "L":"#969696", "N":"#ffff00",
        "Q":"#ffff00", "R":"#ffff00" };
      return {
        color: warna[feature.properties.Rute],
        weight: 5,
        dashArray: '10, 10', 
        dashOffset: '0',
        opacity: 1
      };
    },
	  "visible": true,
    "popup": true,
	}

	]
}
