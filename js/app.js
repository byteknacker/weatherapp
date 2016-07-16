"use strict";

// Initiate Google maps instance from the Google Maps API
function handleLocationError(browserHasGeolocation) {
    browserHasGeolocation ?
    alert('Error: The Geolocation service failed.') :
    alert('Error: Your browser doesn\'t support geolocation.');
}

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
    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation and execute further methods upon success
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                // Assign the position take from the browser's geolocation API
                // to properties of a position object.
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Find location of user and set map to center at it with infowindow
            geocoder.geocode({'location': pos}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        var marker = new google.maps.Marker({
                            position: pos,
                            map: map
                        });
                        var user_city = results[1].address_components["2"].long_name;
                        var user_country = results[1].address_components["3"].long_name;

                        // Change map location of display and zoom level
                        map.setZoom(11);
                        infowindow.setContent(
                            '<span style="color:black;">' + results[1].formatted_address +
                            '</span>'
                        );
                        infowindow.open(map, marker);

                        // Append the user location to HTML
                        $("#user_city").append(user_city + ",");
                        $("#user_country").append(user_country);
                    }
                }
            });

            // Get weather data and display on the HTML
            

        }, function () {
            // This is the error function if there was no success before.
            handleLocationError(true);
        });
    } else {
        // Browser doesn't support Geolocation in the first place.
        handleLocationError(false);
    }
}
