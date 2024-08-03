const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

// Options for getDisplayMedia()

const displayMediaOptions = {
  video: {
    displaySurface: "window",
  },
  audio: false,
};

const mediaRecordingOptions = {
  mimeType: "video/webm; codecs=vp9"
};

// Set event listeners for the start and stop buttons
startElem.addEventListener(
  "click",
  (evt) => {
    startCapture();
  },
  false,
);

stopElem.addEventListener(
  "click",
  (evt) => {
    stopCapture();
  },
  false,
);

console.log = (msg) => (logElem.textContent = `${logElem.textContent}\n${msg}`);
console.error = (msg) =>
  (logElem.textContent = `${logElem.textContent}\nError: ${msg}`);

let mediaRecorder;

async function startCapture() {
  logElem.textContent = "";

  try {
    mediaStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    videoElem.srcObject = mediaStream;

    mediaRecorder = new MediaRecorder(mediaStream, mediaRecordingOptions);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();

    setTimeout(() => takePhoto(mediaStream), 3000);

    dumpOptionsInfo();
  } catch (err) {
    console.error(err);
  }
}

const recordedChunks = [];

function handleDataAvailable(event) {
  console.log("data-available");
  if (event.data.size > 0) {
    recordedChunks.push(event.data);
    console.log(recordedChunks);
    // download();
  } else {
    // …
  }
}

async function takePhoto(stream) {
    const mediaStreamTracks = mediaStream.getVideoTracks();
    console.assert(mediaStreamTracks.length == 1);
    const mediaStreamTrack = mediaStreamTracks[0];
    const image = await (new ImageCapture(mediaStreamTrack).grabFrame());
    console.log(image.height);
    console.log(image.width);
    bitmapToImage(image);
}

async function bitmapToImage(bmp) {
  const canvas = document.createElement('canvas');
  // resize it to the size of our ImageBitmap
  canvas.width = bmp.width;
  canvas.height = bmp.height;
  // get a bitmaprenderer context
  const ctx = canvas.getContext('bitmaprenderer');
  ctx.transferFromImageBitmap(bmp);
  // get it back as a Blob
  const blob2 = await new Promise((res) => canvas.toBlob(res));
  console.log(blob2); // Blob
  const img = document.body.appendChild(new Image());
  img.src = URL.createObjectURL(blob2);
}

function download() {
  const blob = new Blob(recordedChunks, {
    type: "video/webm",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  a.href = url;
  a.download = "test.webm";
  a.click();
  window.URL.revokeObjectURL(url);
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

function dumpOptionsInfo() {
  const videoTrack = videoElem.srcObject.getVideoTracks()[0];

  console.log("Track settings:");
  console.log(JSON.stringify(videoTrack.getSettings(), null, 2));
  console.log("Track constraints:");
  console.log(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

