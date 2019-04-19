// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    // God code that tracks image url //
    cameraOutput.src = cameraSensor.toDataURL("");

    // var image = new Image();
    // image.src = cameraOutput//cameraView();
    // doocument.body.append(image)

    // var textToSave = cameraOutput.src;
    // var hiddenElement = document.createElement('a');
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    // hiddenElement.target = '_blank';
    // hiddenElement.download = 'myFile.txt';
    // hiddenElement.click();


    cameraOutput.classList.add("taken");

    var element = document.getElementById("camera--trigger");
    element.classList.add("hide");


    var camImgSrc = document.getElementById("camera--output").src;
    console.log(camImgSrc.slice(22));

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBSbFZtR8mDETYYluqKTMvpHWGo9nBnTWg', true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onload = function () {
      console.log(xhr.response)

    var body = JSON.parse(xhr.response);

    var face = body.responses[0].faceAnnotations[0];
      console.log(face)
      console.log(face.joyLikelihood)
      console.log(face.angerLikelihood)
      console.log(face.sorrowLikelihood)


      //happy


      if (face.joyLikelihood=="VERY_LIKELY"){
        var element = document.getElementById("resultOne");
        element.classList.add("reveal");
      }

      if (face.joyLikelihood=="LIKELY"){
        var element = document.getElementById("resultOne");
        element.classList.add("reveal");
      }

      if (face.joyLikelihood=="POSSIBLE"){
        var element = document.getElementById("resultOne");
        element.classList.add("reveal");
      }

      //angry

      if (face.angerLikelihood=="VERY_LIKELY"){
        var element = document.getElementById("resultTwo");
        element.classList.add("reveal");
      }

      if (face.angerLikelihood=="LIKELY"){
        var element = document.getElementById("resultTwo");
        element.classList.add("reveal");
      }

      if (face.angerLikelihood=="POSSIBLE"){
        var element = document.getElementById("resultTwo");
        element.classList.add("reveal");
      }

      //sad

      if (face.sorrowLikelihood=="VERY_LIKELY"){
        var element = document.getElementById("resultThree");
        element.classList.add("reveal");
      }

      if (face.sorrowLikelihood=="LIKELY"){
        var element = document.getElementById("resultThree");
        element.classList.add("reveal");
      }

      if (face.sorrowLikelihood=="POSSIBLE"){
        var element = document.getElementById("resultThree");
        element.classList.add("reveal");
      }

      document.getElementById('bottomTitle').innerHTML = 'Result';


      // Request finished. Do processing here.
    };
var body ={
"requests": [
{
  "image": {
    "content": camImgSrc.slice(22)
  },
  "features": [
    {
      "type": "FACE_DETECTION"
    }
  ]
}
]
};
    xhr.send(JSON.stringify(body));
// xhr.send('string');
// xhr.send(new Blob());
// xhr.send(new Int8Array());
// xhr.send(document);
    // url (required), options (optional)
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false)
