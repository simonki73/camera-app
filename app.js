/*
set selfie cam as the default and turn off audio. If we want to use the normal camera, use:
facingMode = "environment"
*/
var constraints = { video: { facingMode: "user" }, audio: false };

/* define our constants */
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")

    // set the camera to stream to the "cameraView" video element
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function (error) {
            console.error("Oops. Something is broken.", error);
        });
}      

// react to the camera button click
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

// trigger the cmaeraStart function once the page has finished loading
window.addEventListener("load", cameraStart, false);