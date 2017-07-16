// When the window has finished loading create our google map below

var map;

function initMap() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    //variables for directions  
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 11,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(4.636526, -74.083160), //Bogota UNAL

        // How you would like to style the map.
        // This is where you would paste any style found on Snazzy Maps.
        // styles: [
        //     {
        //         "featureType": "all",
        //         "elementType": "labels.text.fill",
        //         "stylers": [
        //             {
        //                 "saturation": 36
        //             },
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 40
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "all",
        //         "elementType": "labels.text.stroke",
        //         "stylers": [
        //             {
        //                 "visibility": "on"
        //             },
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 16
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "all",
        //         "elementType": "labels.icon",
        //         "stylers": [
        //             {
        //                 "visibility": "off"
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "administrative",
        //         "elementType": "geometry.fill",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 20
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "administrative",
        //         "elementType": "geometry.stroke",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 17
        //             },
        //             {
        //                 "weight": 1.2
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "landscape",
        //         "elementType": "geometry",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 20
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "poi",
        //         "elementType": "geometry",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 21
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "road.highway",
        //         "elementType": "geometry.fill",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 17
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "road.highway",
        //         "elementType": "geometry.stroke",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 29
        //             },
        //             {
        //                 "weight": 0.2
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "road.arterial",
        //         "elementType": "geometry",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 18
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "road.local",
        //         "elementType": "geometry",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 16
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "transit",
        //         "elementType": "geometry",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 19
        //             }
        //         ]
        //     },
        //     {
        //         "featureType": "water",
        //         "elementType": "geometry",
        //         "stylers": [
        //             {
        //                 "color": "#000000"
        //             },
        //             {
        //                 "lightness": 17
        //             }
        //         ]
        //     }
        // ]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('local_map');  

    // Create the Google Map using our element and options defined above
    map = new google.maps.Map(mapElement, mapOptions);
    
    //set display direction
    directionsDisplay.setMap(map);
    
    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
         
        var markersSubSet = [];
        for (var i = 0; i < 4 ; i++) {
            markersSubSet.push(fakeData[i]);
        }
        console.log(markersSubSet);
        calculateWaypointRoute(directionsService, directionsDisplay, markersSubSet);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
    
    

    // Let's also add a marker while we're at it
    
    // var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(4.636526, -74.083160),
    //     map: map,
    //     title: 'sdsd'
    // });
    // var marker2 = new google.maps.Marker({
    //     position: new google.maps.LatLng(4.406526, -74.083160),
    //     map: map,
    //     title: ''
    // });
    
    // addInfoWindow(map,marker);
    map.data.loadGeoJson("js/local.json");
    
}

function addInfoWindow(map, marker){
    
    //test content
    var content = createInfoWindow("esto es la info", "Salud Teusquilla", 123, "cra1 num 2"); //just test porpouse 
    
    var infowindow = new google.maps.InfoWindow({
      content:content

    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
    
}


function addmarker(latilongi, title) {
    var marker = new google.maps.Marker({
        position: latilongi,
        title: title,
        map: map
    });
}

function createInfoWindow(info, centerType, tel, direction){
    var contentInfoWindow = '<h5><strong>Información: </strong>' + info + '</h5>'+
                            '<h5><strong>Centro de atención: </strong>'+ centerType + '</h5>'+
                            '<h5><strong>Teléfono: </strong>'+ tel + '</h5>'+
                            '<h5><strong>Dirección: </strong>'+ direction + '</h5>';
    return contentInfoWindow;
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: new google.maps.LatLng(4.636526, -74.083160),
      destination: new google.maps.LatLng(4.406526, -74.083160),
      travelMode: 'DRIVING'
    }, function(response, status) { 
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}