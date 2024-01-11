browser.runtime.onInstalled.addListener(function () {
    // Set initial state to open
    browser.storage.local.set({ extensionState: 'open' });
  });
  
  browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleExtensionState') {
      browser.storage.local.get('extensionState', function (data) {
        var newState = data.extensionState === 'open' ? 'closed' : 'open';
        browser.storage.local.set({ extensionState: newState }, function () {
          // Send a message to all tabs to toggle the drop zone visibility
          browser.tabs.query({}, function (tabs) {
            tabs.forEach(function (tab) {
              browser.tabs.sendMessage(tab.id, { action: 'toggleDropZone', state: newState });
            });
          });
        });
      });
    } else if (request.action === 'uploadFiles') {
      browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { action: 'triggerFileInput' });
      });
    }
  });
  
  // Ensure the extension state is updated when a tab is activated
  browser.tabs.onActivated.addListener(function () {
    browser.storage.local.get('extensionState', function (data) {
      browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        browser.tabs.sendMessage(tabs[0].id, { action: 'toggleDropZone', state: data.extensionState });
      });
    });
  });
  