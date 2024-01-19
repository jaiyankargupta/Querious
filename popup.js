let recognition;
let audioContext;

document.getElementById("startVoiceRecognition").addEventListener("click", toggleVoiceRecognition);
document.getElementById("voiceButton").addEventListener("click", toggleVoiceCommand);
document.getElementById("startAudioCapture").addEventListener("click", startAudioCapture);
document.getElementById("stopAudioCapture").addEventListener("click", stopAudioCapture);

function toggleVoiceRecognition() {
  if (!recognition) {
    startVoiceRecognition();
  } else {
    stopVoiceRecognition();
  }
}

function startVoiceRecognition() {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = function (event) {
    const result = event.results[event.results.length - 1][0].transcript;
    // Do something with the recognized result, e.g., send it to a processing function
    processVoiceInput(result);
  };

  recognition.onend = function () {
    // Voice recognition ended, you can do something here if needed
  };

  recognition.start();
}

function stopVoiceRecognition() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}

function processVoiceInput(input) {
  // Process the recognized input, you can implement NLP here
  console.log("Voice Input:", input);
}

function startAudioCapture() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(handleSuccess)
    .catch(handleError);
}

function handleSuccess(stream) {
  const source = audioContext.createMediaStreamSource(stream);
  // Use 'source' for further processing or analysis
}

function handleError(error) {
  console.error('Error accessing audio:', error);
}

function stopAudioCapture() {
  if (audioContext) {
    audioContext.close();
  }
}

function toggleVoiceCommand() {
  chrome.runtime.sendMessage({ command: "toggle-voice-command" });
}
