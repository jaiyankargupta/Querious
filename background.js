let voiceCommandActive = false;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.command === "toggle-voice-command") {
    voiceCommandActive = !voiceCommandActive;
    sendResponse({ active: voiceCommandActive });
  }
});

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ voiceCommandActive: false });
});
