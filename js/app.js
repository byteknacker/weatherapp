"use strict";

$(document)
    .ready(function () {
        var options = {
            enableHighAccuracy: true
        };

        function successCallback(position) {
            // Do something with a location here
            var output = '';

            output += "Your position has been located.\n\n";
            output += 'Latitude: ' + position.coords.latitude + "°\n";
            output += 'Longitude: ' + position.coords.longitude + "°\n";
            output += 'Accuracy: ' + position.coords.accuracy + " meters\n";

            if (position.coords.altitude) {
                output += 'Altitude: ' + position.coords.altitude + " meters\n";
            }

            if (position.coords.altitudeAccuracy) {
                output += 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + " meters\n";
            }

            if (position.coords.speed) {
                output += 'Speed: ' + position.coords.Speed + " m/s\n";
                output += 'Time of Position: ' + position.timestamp;
            }

            alert(output);
        }

        function errorCallback(error) {
            // There was a problem getting the location
            var errorMessage = "There was an error in getting your location.\n";
            errorMessage += error;
            alert();
        }

        if (window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
        } else {
            alert('Your browser does not natively support geolocation.');
        }
    });
