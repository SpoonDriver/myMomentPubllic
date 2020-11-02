let uploadFormNode = document.getElementById("uploadForm");

uploadFormNode.addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData();
    let fileField = document.querySelector('input[type="file"]');

    formData.append('file', fileField.files[0]);
    formData.append('_csrf', document.querySelector("input[name='_csrf']").value);

    fetch('/uploadProfileImage', {
        method: 'POST',
        body: formData
    })
        .then(response => response.text())
        .then(() => {
            location.href = "/profile";
        })
        .catch(error => {
            console.error('Error:', error);
        });
});