chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'uploadFiles') {
      // Trigger the file input action on the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'triggerFileInput' });
      });
    }
  });
  