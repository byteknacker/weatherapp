var app = {};
$("[name='my-checkbox']").bootstrapSwitch();

// Define error function for map instance
function handleLocationError(browserHasGeolocation) {
    "use strict";
    if (browserHasGeolocation) {
        alert('Error: The Geolocation service failed.');
    } else {
        alert('Error: Your browser doesn\'t support geolocation.');
    }
}
// Initiate Google maps instance from the Google Maps API
function initMap() {
    "use strict";
    app.map = new google.maps.Map(document.getElementById('map'), {
        // Center at the middle of world map
        center: {
            lat: 0,
            lng: 0
        },
        // With a zoom that displays nearly the entire world map
        zoom: 2
    });
    app.geocoder = new google.maps.Geocoder();
    app.infowindow = new google.maps.InfoWindow();

    // Try HTML5 geolocation and execute further methods upon success
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            app.pos = {
                // Assign the position take from the browser's geolocation API
                // to properties of a position object.
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Find location of user and set map to center at it with infowindow
            app.geocoder.geocode({
                'location': app.pos
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        app.marker = new google.maps.Marker({
                            position: app.pos,
                            map: app.map
                        });
                        app.user_city = results[1].address_components["2"].long_name;
                        app.user_country = results[1].address_components["3"].long_name;
                        app.user_country_code = results[1].address_components["3"].short_name;

                        // Change map location of display and zoom level
                        app.map.setZoom(11);
                        app.infowindow.setContent(
                            '<span style="color:black;">' + results[1].formatted_address +
                            '</span>'
                        );
                        app.infowindow.open(app.map, app.marker);

                        // Append the user location to HTML
                        $("#user_city")
                            .append(app.user_city + ",");
                        $("#user_country")
                            .append(app.user_country);

                        // Get weather data and display on the HTML
                        app.openweatherApi = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?";
                        $.getJSON(app.openweatherApi, {
                            q: app.user_city + "," + app.user_country_code,
                            APPID: "5fff6225e5fb459bea0c4356c958aabe",
                            type: "accurate",
                            units: "metric"
                        }, function (data) {
                            app.celsius = data.main.temp;
                            app.fahrenheit = parseFloat(app.celsius * 1.8 + 32)
                                .toFixed(2);
                            app.units_tracker = "celsius";
                            $("#temp_degree")
                                .append(app.celsius);
                            $("#temp_units")
                                .on("click", function () {
                                    if (app.units_tracker === "celsius") {
                                        $("#temp_degree")
                                            .html(app.fahrenheit);
                                        app.units_tracker = "fahrenheit";
                                    } else {
                                        $("#temp_degree")
                                            .html(app.celsius);
                                        app.units_tracker = "celsius";
                                    }
                                });
                        });
                    }
                }
            });

        }, function () {
            // This is the error function if there was no success before.
            handleLocationError(true);
        });
    } else {
        // Browser doesn't support Geolocation in the first place.
        handleLocationError(false);
    }
}
