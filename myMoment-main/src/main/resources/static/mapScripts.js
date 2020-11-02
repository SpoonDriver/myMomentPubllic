let map;
let userPosMarker = null;

    //Starts the map and calls on other features
function initMap() {
    (function renderMap() {
        map = new google.maps.Map(
            document.getElementById('map'), {
                disableDefaultUI: true,
                mapId: "53c14bc13344ec8c",
                center: {lat: 0, lng: 0}, zoom: 4
            });
    })();
    let self = this;
    getPoints().then(posts => {
        self.posts = posts;
        initPositionTracking(addMarkers);
        setHeatMap()
    });
}

    //Makes a visible marker for users current position
function userPosition() {
    let userLatLng = {lat: latitude, lng: longitude};
    time = position.timestamp;

    const userIcon = "/images/myMomIconBlue.png";
    if (userPosMarker !== null) {
        userPosMarker.setMap(null)
    }
    userPosMarker = new google.maps.Marker({
        position: userLatLng,
        map: map,
        // animation: google.maps.Animation.DROP,
        icon: userIcon,
        clickable: false,
        opacity: 1,
        title: "This is you :D"
    });
    moveCamToUserPos();
}

    //Stig's magic PostGrabber
function getPoints() {
    return fetchPosts();
}

    //Puts out PostMarkers and PostWindows
function populatePosts() {
    let infoWindow = new google.maps.InfoWindow();
    for (let i = 0; i < this.posts.length; i++) {
        let post = this.posts[i];

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(post.lat, post.lng),
            icon: "/images/postIcon.png",
            animation: google.maps.Animation.DROP,
            scale: 1,
            scaledSize: 0.5,
            map: map,
            opacity: 0.75,
        });

        marker.addListener("click", () => {
            if (infoWindow) {
                const contentString = `
                <div id="contentString">
                <p id="username">${post.user.username}</p>
                <img id="mapImagePreview" src="${post.imgLink}" alt="">
                <br>
                <div style="background-color: #444444; fill-opacity: 50%">
                <span id="textPreview">${post.imgText}</span>
                <span id="datePreview">${post.time}</span>
                </div>
                `;
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
            } else {
                infoWindow.close(map, marker);
            }
        });

        map.addListener("zoom_changed", () => {

            let zoomLevel = map.getZoom();

            if (zoomLevel < 14) {
                marker.setVisible(false);
            } else {
                marker.setVisible(true);
                marker.setAnimation(google.maps.Animation.DROP)
            }
        })
    }
}

    //Just a collection of functions
function addMarkers() {
    populatePosts();
    userPosition();
}

    //Creates and styles the Heatmap
function setHeatMap() {
    function changeGradient(heatmap) {
        const gradient = [
            "rgba(0,255,255,0)",
            "rgb(0,204,255)",
            "rgb(0,174,255)",
            "rgb(0,102,255)",
            "rgb(0,55,255)",
            "rgba(0, 0, 223, 1)",
            "rgba(0, 0, 191, 1)",
            "rgba(0, 0, 159, 1)",
            "rgb(49,0,127)",
            "rgba(63, 0, 91, 1)",
            "rgb(114,0,127)",
            "rgb(140,0,191)",
            "rgb(217,0,255)",
            // "#745ac5",
            // "#8d3f59",
            // "#c26080",
            // "#d9669c",
            // "#e068a4",
            // "#ef8874"
        ];
        heatmap.set("gradient", heatmap.get("gradient") ? null : gradient);
    }

    let ourPosts = [];
    for (let i = 0; i < this.posts.length; i++) {
        let post = this.posts[i];
        ourPosts.push({location: new google.maps.LatLng(post.lat, post.lng), weight: 0.5})
    }

    let heatmap = new google.maps.visualization.HeatmapLayer({
        data: ourPosts
    });
    heatmap.set("radius", 15)
    heatmap.set("opacity", 0.7)
    toggleHeatmap()
    changeGradient(heatmap);

    function toggleHeatmap() {
        map.addListener("zoom_changed", () => {
            let zoomLevel = map.getZoom();

            if (zoomLevel < 14) {
                heatmap.setMap(map)
            } else {
                heatmap.setMap(null)
            }
        })
    }
}

    //Pans the camera to user position and zooms down to 15
function moveCamToUserPos() {
    map.setZoom(15);
    map.panTo({
        lat: latitude,
        lng: longitude
    });
}




