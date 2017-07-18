

for(var i=0; i < fakeData.length; i++){
   var latilongi = new google.maps.LatLng(fakeData[i].latitude, fakeData[i].longitude);
   addmarker(latilongi,fakeData[i].name);
}
var boundsArray = [];

function calculateWaypointRoute(directionsService, directionsDisplay, markersSubSet){
    
    
    console.log(markersSubSet);
    var origin = new google.maps.LatLng(markersSubSet[0].latitude, markersSubSet[0].longitude);
    var destination = new google.maps.LatLng(markersSubSet[markersSubSet.length-1].latitude, markersSubSet[markersSubSet.length-1].longitude);
    
    var waypts = [];
    for (var i = 1; i < markersSubSet.length-1; i++) {
      
        waypts.push({
          location: new google.maps.LatLng(markersSubSet[i].latitude, markersSubSet[i].longitude),
          stopover: true
        });
      
    }
    
    directionsService.route({
          origin: origin,
          destination: destination,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
}

function calculateTwoPointsRoute(map, latlong_origin, latlong_dest) {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: latlong_origin,
        destination: latlong_dest,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);

        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function highlightLocations(map) {
    map.data.loadGeoJson("js/local.json");
    addBounds(map);
    locationListeners(map);
}




function addBounds(map) {

    google.maps.event.addListener(map.data,'addfeature',function(e){
        if(e.feature.getGeometry().getType()==='Polygon'){

            map.data.overrideStyle(event.feature, {strokeWeight: 8, fillColor: "#555"});
            var bounds = new google.maps.LatLngBounds();

            e.feature.getGeometry().getArray().forEach(function(path){

                path.getArray().forEach(function(latLng){bounds.extend(latLng);})

            });
            e.feature.setProperty('bounds',bounds);
        }

        fillBoundsArray(bounds, e);

        map.data.setStyle({
            fillColor: 'green',
            strokeWeight: 1
        });

    });



}

function locationListeners(map) {
    google.maps.event.addListener(map.data,'click',function(e){
        var bounds = e.feature.getProperty('bounds');
        if(bounds){
            //alert('bounds:\n'+bounds.toString());
            map.fitBounds(bounds);
        }
    });
}

function removeHighlightLocations(map) {
    map.data.forEach(function (feature) {
        map.data.remove(feature);
    });
}

function setBoundsOnLocation(map, location_name) {

    console.log(boundsArray);
    for(var i = 0; i < boundsArray.length; i++){
        if(boundsArray[i].name === location_name){
            map.fitBounds(boundsArray[i].bounds);
            map.data.overrideStyle(boundsArray[i].eventBuffer.feature, {fillColor: '#eee',strokeWeight: 4});

        }
    }
}

function fillBoundsArray(bounds, e) {
    boundsArray.push({
        bounds: bounds,
        name: e.feature.getProperty('NOMBRE'),
        eventBuffer: e
    });
}

map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {strokeWeight: 8});
});

function addColors(map) {

    google.maps.event.addListener(map.data,'addfeature',function(e){
        if(e.feature.getGeometry().getType()==='Polygon'){

            map.data.overrideStyle(event.feature, {strokeWeight: 8});

            var bounds = new google.maps.LatLngBounds();

            e.feature.getGeometry().getArray().forEach(function(path){

                path.getArray().forEach(function(latLng){bounds.extend(latLng);})

            });
            e.feature.setProperty('bounds',bounds);
        }
    });

}

$("#myBtn").click(function(){
   setBoundsOnLocation(map, "SANTA FE");
});

// google.maps.event.addListener(map.data,'addfeature',function(e){
//       if(e.feature.getGeometry().getType()==='Polygon'){
//           var bounds = new google.maps.LatLngBounds();
//
//           e.feature.getGeometry().getArray().forEach(function(path){
//
//              path.getArray().forEach(function(latLng){bounds.extend(latLng);})
//
//           });
//           e.feature.setProperty('bounds',bounds);
//
//           //new google.maps.Rectangle({map:map,bounds:bounds,clickable:false})
//
//         }
// });
//

// google.maps.event.addListener(map.data,'click',function(e){
//     var bounds = e.feature.getProperty('bounds');
//     if(bounds){
//       //alert('bounds:\n'+bounds.toString());
//       map.fitBounds(bounds);
//     }
// });


// console.log(map.data);
//
// document.getElementById("myBtn").addEventListener(map.data,"click", function(e){
//     var loc_id = 3;
//     var bounds = e.feature.getProperty('bounds');
//     if(bounds){
//         //alert('bounds:\n'+bounds.toString());
//         map.fitBounds(bounds);
//     }
// });

function bruteForceBounds(map, location_name){


}