let latitude = 0.0;
let longitude = 0.0;
let position = {};
let time;

function initPositionTracking(cb) {
    navigator.geolocation
        .watchPosition(function (position) {

            let deltaLat = Math.abs(position.coords.latitude - latitude);
            let deltaLng = Math.abs(position.coords.longitude - longitude);
            const threshold = 0.0000000001;

            if (!(deltaLat > threshold || deltaLng > threshold)) {
                return;
            }

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            cb(latitude, longitude);
        });
}

function fetchPosts(lat, lng) {
    let url = "/api";
    if (typeof lat !== "undefined" && typeof lng !== "undefined") {
        url = url + "?lat=" + lat + "&lng=" + lng;
    }
    return fetch(url)
        .then(function (response) {
            return response.json();
        });
}