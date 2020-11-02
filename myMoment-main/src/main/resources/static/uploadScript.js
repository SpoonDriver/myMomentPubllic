function timeConverter(time) {
    let a = new Date(time);
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}

let latitude = 0.0;
let longitude = 0.0;
let time;

function initPositionTracking() {
    navigator.geolocation
        .watchPosition(function (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            time = position.timestamp;

            document.getElementById("latField").value = latitude;
            document.getElementById("lngField").value = longitude;
            document.getElementById("timeField").value = timeConverter(time);
            document.getElementById("fileField").removeAttribute("disabled");
        });
}

let checkStatus = function(event) {
    if (latitude === 0.0 && longitude === 0.0) {
        event.preventDefault();
        alert("Position needed!")
    }
}

let loadFile = function(event) {
    let preview = document.getElementById("preview");
    preview.src = URL.createObjectURL(event.target.files[0]);
    preview.onload = function() {
        URL.revokeObjectURL(preview.src)
        document.getElementById("uploadButton").removeAttribute("disabled");
    }
};

initPositionTracking();

let uploadFormNode = document.getElementById("uploadForm");

uploadFormNode.addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData();
    let fileField = document.querySelector('input[type="file"]');

    formData.append('file', fileField.files[0]);
    formData.append('imgText', document.getElementById("textField").value);
    formData.append('lat', document.getElementById("latField").value);
    formData.append('lng', document.getElementById("lngField").value);
    formData.append('time', document.getElementById("timeField").value);
    formData.append('_csrf', document.querySelector("input[name='_csrf']").value);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(() => {
            location.href = "/";
        })
        .catch(error => {
            console.error('Error:', error);
        });
});