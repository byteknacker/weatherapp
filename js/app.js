"use strict";

function initMap() {
    var options = {
        enableHighAccuracy: true
    };
    var userLocation = {};
    var map;
    
    if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
    } else {
        console.log('Your browser does not natively support geolocation.');
    }
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: userLocation.latitude,
            lng: userLocation.longitude
        },
        zoom: 8
    });
}

function successCallback(position) {
    // Gather all location data into the userLocation object
    userLocation.latitude = position.coords.latitude;
    userLocation.longitude = position.coords.longitude;
    console.log(userLocation);
}

function errorCallback(error) {
    // Display when there is location tracking enabled on device
    // but there is still an error retrieving the location data
    var errorMessage = "There was an error in getting your location.\n";
    errorMessage += error;
    console.log(errorMessage);
}
