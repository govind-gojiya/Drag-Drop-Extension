chrome.runtime.onInstalled.addListener(function () {
    // Set initial state to open
    chrome.storage.local.set({ extensionState: 'open' });
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleExtensionState') {
      chrome.storage.local.get('extensionState', function (data) {
        var newState = data.extensionState === 'open' ? 'closed' : 'open';
        chrome.storage.local.set({ extensionState: newState });
      });
    } else if (request.action === 'uploadFiles') {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'triggerFileInput' });
      });
    }
  });
  
  chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.storage.local.get('extensionState', function (data) {
      var newState = data.extensionState === 'open' ? 'closed' : 'open';
      chrome.storage.local.set({ extensionState: newState }, function () {
        // Send a message to the content script to toggle the drop zone visibility
        chrome.tabs.sendMessage(tab.id, { action: 'toggleDropZone', state: newState });
      });
    });
  });
  