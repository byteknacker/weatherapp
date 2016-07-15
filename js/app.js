"use strict";

// Initiate Google maps instance from the Google Maps API
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        // Center at the middle of world map
        center: {
            lat: 0,
            lng: 0
        },
        // With a zoom that displays nearly the entire world map
        zoom: 2
    });

    // Try HTML5 geolocation and execute further methods upon success
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                // Assign the position take from the browser's geolocation API
                // to properties of a position object.
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            // The initial map position is now changed to the new correct one
            // which is the user's current location.
            map.setCenter(pos);
            map.setZoom(10);
        }, function () {
            // This is the error function if there was no success before.
            handleLocationError(true, map, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation in the first place.
        handleLocationError(false, map, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, map, pos) {
    browserHasGeolocation ?
    alert('Error: The Geolocation service failed.') :
    alert('Error: Your browser doesn\'t support geolocation.');
}
