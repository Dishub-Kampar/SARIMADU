// Set listeners for buttons, tools, etc.


$(window).resize(function() {
  sizeLayerControl();
});

$(document).on("click", ".feature-row", function(e) {
  $(document).off("mouseout", ".feature-row", clearHighlight);
  // sidebarClick(parseInt($(this).attr("id"), 10));
  blah = 0;
});

if ( !("ontouchstart" in window) ) {
  $(document).on("click", ".feature-row", function(e) {
    bootleaf.map.removeLayer(bootleaf.highlightLayer);

    // Retrieve the feature's geometry from the queryResults dict, then send it to the
    // showHighlight function. Tweak the parameters to match the identifyResults format
    try{
      var feature = bootleaf.queryResults[parseInt(e.target.dataset['idx'])];
      if (feature.attributes === undefined){
        // Standardise between ArcGIS Server and GeoServer attribute syntax
        feature.attributes = {}
        for (var key in feature.properties) {
          if (key !== 'bbox'){
            feature.attributes[key] = feature.properties[key]
          }
        }
      }
      feature.geometryType = bootleaf.queryResults.geometryType;
      feature.geometry['spatialReference']= {"wkid": bootleaf.queryResults.wkid};
      showHighlight(feature, true);

    } catch(err) {
      if(err.message !== undefined){
        console.log(err.message);
      } else {
        console.log("There was a problem: ", err);
      }
    }
  });
}

$(document).on("mouseout", ".feature-row", function(e){
  bootleaf.map.removeLayer(bootleaf.highlightLayer);
});

$(document).on("mouseover", ".feature-row", function(e){
  bootleaf.map.removeLayer(bootleaf.highlightLayer);

  // Retrieve the feature's geometry from the queryResults dict, then send it to the
  // showHighlight function. Tweak the parameters to match the identifyResults format
  try{
    var feature = bootleaf.queryResults[parseInt(e.target.dataset['idx'])];
    feature.geometryType = bootleaf.queryResults.geometryType;
    feature.geometry['spatialReference']= {"wkid": bootleaf.queryResults.wkid};
    showHighlight(feature, false);

  } catch(err) {
    if(err.message !== undefined){
      console.log(err.message);
    } else {
      console.log("There was a problem: ", err);
    }
  }

});

// Login modal listeners
$("#btnArcGISOnline").click(authoriseArcGIS);
$('#loginModal').on('hide.bs.modal', function (e) {
  console.log("login modal was just closed");
  if (config.token === undefined) {
    $.growl.error({message: "There was a problem logging in to ArcGIS", fixed: true});
    $("#loading").hide();
  }
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#full-extent-btn").click(function() {
  bootleaf.map.setView(config.start.center, config.start.zoom);
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#legend-btn").click(function() {
  $("#legendModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#identify-btn").click(function() {
  if ($(this).parent().hasClass('disabled')) { return null;}
  configureIdentifyTool();
});

$("#coordinates-btn").click(function() {
  configureCoordinatesTool();
});
$("#gps-btn").click(function() {
  //
  resetSidebar("GPS Tracking"
    ,"<p><span class='info'>GPS tracking ...</span></p>"
  );// #sidebarTitle,  #sidebarContents
  //
  $("#sidebar").show("slow");
  switchOffTools();
  bootleaf.activeTool = "GPS";
  //bootleaf.map.on('click', showMarker);//contoh dari yanglain
  $("#sidebarContents").html('<span id="gps" class="info">GPS Coordinates</span><div>Waktu: <span id="gpsdate"></span></div><div>Latitude: <span id="gpslatitude"></span></div><div>Longitude: <span id="gpslongitude"></span></div><div>Accuracy: <span id="gpsaccuracy"></span> m</div><div>Altitude: <span id="gpsaltitude"></span> m</div><div>Altitude Accuracy: <span id="gpsaltitudeaccuracy"></span> m</div><div>Speed: <span id="gpsspeed"></span> m/s</div><div>&nbsp;<input type="button" onclick="startTracking()" value="Start Tracking"/><input type="button" onclick="stopTracking()" value="Stop Tracking"/></div>');
  //startTracking();//auto start?

//accuracy
//altitude
//altitudeAccuracy
//heading  
//latitude
//longitude
//speed
  
});

var watchId, datasource, userShape;

function startTracking() {
    if (!watchId) {
        //Watch the users position.
        watchId = navigator.geolocation.watchPosition(function (geoPosition) {

            //Get the coordinate information from the geoPosition.
            var userPosition = [geoPosition.coords.latitude, geoPosition.coords.longitude ];//latlong in Leaflet
            

            //TIP: altitude? in meters, speed? in meters/second and heading? in degrees are also potential properties of geoPosition.coords

            if (!userShape) {
                //Create a shape to show the users position and add it to the data source.
                //userShape = new atlas.Shape(new atlas.data.Feature(new atlas.data.Point(userPosition), geoPosition));
                userShape = new L.Marker(userPosition).addTo(bootleaf.map);
                //datasource.add(userShape);
            } else {
                //userShape.setCoordinates(userPosition);
                userShape.setLatLng(userPosition);
                //userShape.setProperties(geoPosition);
            }
            $.growl.notice({message: "Latitude: "+ geoPosition.coords.latitude+" Longitude: "+ geoPosition.coords.longitude });
            console.log("Date(): "+ new Date());
            console.log("Latitude: "+ geoPosition.coords.latitude+" Longitude: "+ geoPosition.coords.longitude);
            console.log("geoPosition.timestamp: "+ geoPosition.timestamp);
            $("#gpslongitude").html(geoPosition.coords.longitude);
            $("#gpslatitude").html(geoPosition.coords.latitude);
            $("#gpsaltitude").html(geoPosition.coords.altitude);
            $("#gpsaltitudeaccuracy").html(geoPosition.coords.altitudeAccuracy);
            $("#gpsaccuracy").html(geoPosition.coords.accuracy);
            $("#gpsspeed").html(geoPosition.coords.speed);
            $("#gpsdate").html(new Date());
            
            createParseGPS(geoPosition.coords,"UECjcJO1JB");
                
//accuracy
//altitude
//altitudeAccuracy
//heading  
//latitude
//longitude
//speed
            //Center the map on the users position.
            //bootleaf.map.setView({
            //    center: userPosition,
            //    zoom: 17
            //});
            bootleaf.map.setView(userPosition,17);
            
            
        }, function (error) {
            //If an error occurs when trying to access the users position information, display an error message.
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    //alert('User denied the request for Geolocation.');
                    $.growl.error({message:'User denied the request for Geolocation.'});
                    break;
                case error.POSITION_UNAVAILABLE:
                     $.growl.error({message:'Position information is unavailable.'});
                    break;
                case error.TIMEOUT:
                     $.growl.error({message:'The request to get user position timed out.'});
                    break;
                case error.UNKNOWN_ERROR:
                     $.growl.error({message:'An unknown error occurred.'});
                    break;
            }
        });
    }
}

function stopTracking() {
    //Cancel the geolocation updates.
    navigator.geolocation.clearWatch(watchId);

    //Clear all data from the map.
    //datasource.clear();
    userShape.removeFrom(bootleaf.map);//remove the marker
    userShape = null;
    watchId = null;
}

$("#share-btn").click(function() {
  // This function returns the hostname and parameters, which can be used to generate a unique URL for the current map
  shareObj = configureShare();
  var shareURL;
  var hostname = shareObj[0];
  var port = shareObj[1];
  var path = shareObj[2];
  var params = shareObj[3];
  if (port.length > 0) {
    shareURL = hostname + ":" + port + path + params;
  } else {
    shareURL = hostname + path + params;
  }
  $("#shareURL").html("<a target='_blank' href=" + shareURL+ ">Link to this map</a>");
  $("#shareModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
});

$("#list-btn").click(function() {
  animateSidebar();
  return false;
});

$("#nav-btn").click(function() {
  $(".navbar-collapse").collapse("toggle");
  return false;
});

$("#sidebar-toggle-btn").click(function() {
  animateSidebar();
  return false;
});

$("#sidebar-hide-btn").click(function() {
  switchOffTools();
  $(".mapTools").removeClass("active");
  animateSidebar();
  return false;
});

function animateSidebar() {
  switchOffTools();
  $("#sidebar").animate({
    width: "toggle"
  }, 350, function() {
    bootleaf.map.invalidateSize();
  });
}

function sizeLayerControl() {
  $(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}

function clearHighlight() {
  //highlight.clearLayers();
}

function sidebarClick(id) {
  var layer = markerClusters.getLayer(id);
  bootleaf.map.setView([layer.getLatLng().lat, layer.getLatLng().lng], 17);
  layer.fire("click");
  /* Hide sidebar and go to the map on small screens */
  if (document.body.clientWidth <= 767) {
    $("#sidebar").hide();
    switchOffTools();
    bootleaf.map.invalidateSize();
  }
}

function resetSidebar(title,contents){
  var sidebarTitle = title || "sidebar"
  var sidebarContents = contents || "<p><span class='info'></span></p>";
  $("#sidebarTitle").html(sidebarTitle);
  $("#sidebarContents").html(sidebarContents);
}

$(".mapTools").click(function(){
  // Enable/Disable the tools as appropriate
  if ($(this).hasClass("disabled")) {
    return false;
  };
  if ($(this).hasClass("active")) {
    setMapCursor('auto');
    switchOffTools();
    $(".mapTools").removeClass("active");
    bootleaf.activeTool = null;
    resetSidebar();
    $("#sidebar").hide("slow");
  } else {
    $(".mapTools").removeClass("active");
    $(this).addClass("active");
    if (this.dataset["tool"] !== undefined){
      if (this.dataset["tool"] === 'identify') {
        configureIdentifyTool();
      } else if (this.dataset["tool"] === 'coordinates') {
        configureCoordinatesTool();
      } else if (this.dataset["tool"] === 'queryWidget') {
        configureQueryWidget();
      } else if (this.dataset["tool"] === 'filterWidget') {
        configureFilterWidget();
      }
    } else {
      $("#sidebar").hide("slow");
    }
  }
  // return false; //uncomment this line to keep the menu open when a tool is chosen
});
