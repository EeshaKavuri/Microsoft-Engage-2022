const video = document.getElementById('video')
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/static/blog/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/static/blog/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/static/blog/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/static/blog/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/static/blog/models')
]).then(startVideo)
function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}
video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  let imgcanvas;
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    var hdnCandidateValue = document.getElementById("hdnCandidate").value;
    if (hdnCandidateValue && hdnCandidateValue != "") {
      return;
    }
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    if (resizedDetections.length > 0 && resizedDetections[0].detection.score > 0.7 && resizedDetections[0].expressions.happy > 0.5) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const img = document.createElement("img");
      img.src = canvas.toDataURL('image/webp');
      //imgcanvas = faceapi.createCanvasFromMedia(img)
      CompareImages(img, displaySize, canvas).then(
        (results) => {
          var result = results[0];
          console.log(result);
          //console.log(document.getElementById('dvSuccess').style.display);
          if (result && result._label != 'unknown') {
            video.pause();
            video.currentTime = 0;
            var candidateName = "";
            if (result && result._label) {
              candidateName = result._label;
            }
            document.getElementById('divVideo').hidden = true;
            if (document.getElementById('screenshot').innerHTML == '' ||
              document.getElementById("hdnCandidate").value != candidateName) {
              document.getElementById("hdnCandidate").value = candidateName;
              document.getElementById('screenshot').innerHTML = "";
              document.getElementById('screenshot').appendChild(img);
              //document.getElementById('screenshot').innerHTML=img;
              if (document.getElementById('dvSuccess')) {
                document.getElementById('dvSuccess').style.display = "inline-block";
                document.getElementById('Success').innerHTML = "Hello " + result._label + ",Your Attendance is taken Successfully!";
                
              }
              if (document.getElementById('dvFailure'))
                document.getElementById('dvFailure').style.display = "none";
              document.getElementById('Success').innerHTML = "Hi " + result._label + " Your Attendance Register Successfully ";
            }
            video.removeEventListener('play', {});
          }
          else {
            console.log('Not Detected..');
            document.getElementById('dvFailure').style.display = "inline-block";
            document.getElementById('dvSuccess').style.display = "none";
            document.getElementById('Failure').innerHTML = "We have not identified you, Please register";
            document.getElementById('divVideo').hidden = true;
          }
          // const box = resizedDetections[i].detection.box
          // const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
          // drawBox.draw(canvas)
        }
      );
    }
    // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    // faceapi.draw.drawDetections(canvas, resizedDetections)
    // faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
  }, 100)
})
async function CompareImages(image, displaySize, canvas) {
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
  const resizedDetections = faceapi.resizeResults(detections, displaySize)
  const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
  // results.forEach((result, i) => {
  //  //console.log(result);
  //  const box = resizedDetections[i].detection.box
  //  const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
  //  drawBox.draw(canvas)
  // })
  return results;
  //console.log(results);
  
}
function loadLabeledImages() {
  const labels = ['Eesha', 'Nikki']
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 1; i++) {
        const img = await faceapi.fetchImage(`/static/images/${label}/${i}.jpg`)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}