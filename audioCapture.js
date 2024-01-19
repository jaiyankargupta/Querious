// audioCapture.js

let audioContext;
let audioStream;

function startAudioCapture() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(handleSuccess)
    .catch(handleError);
}

function handleSuccess(stream) {
  audioStream = stream;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaStreamSource(stream);
  // Use 'source' for further processing or analysis
}

function handleError(error) {
  console.error('Error accessing audio:', error);
}

function stopAudioCapture() {
  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
    audioStream = null;
  }

  if (audioContext) {
    audioContext.close().then(() => {
      audioContext = null;
    });
  }
}

// Example: Start audio capture
// startAudioCapture();
