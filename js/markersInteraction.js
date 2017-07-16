

for(var i=0; i < fakeData.length; i++){
   var latilongi = new google.maps.LatLng(fakeData[i].latitude, fakeData[i].longitude);
   addmarker(latilongi,fakeData[i].name);
}


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


google.maps.event.addListener(map.data,'addfeature',function(e){
      if(e.feature.getGeometry().getType()==='Polygon'){
          var bounds = new google.maps.LatLngBounds();
          
          e.feature.getGeometry().getArray().forEach(function(path){
          
             path.getArray().forEach(function(latLng){bounds.extend(latLng);})
          
          });
          e.feature.setProperty('bounds',bounds);
          
          //new google.maps.Rectangle({map:map,bounds:bounds,clickable:false})
        
        }
});

google.maps.event.addListener(map.data,'click',function(e){
    var bounds = e.feature.getProperty('bounds');
    if(bounds){
      //alert('bounds:\n'+bounds.toString());
      map.fitBounds(bounds);
    }
});


console.log(map.data);

document.getElementById("myBtn").addEventListener("click", function(e){
    var loc_id = 3;
   // map.data.feature
});