document.addEventListener('DOMContentLoaded', function () {
  var dropArea = document.createElement('div');
  dropArea.id = 'drop-area';
  dropArea.innerHTML = 'Drop files here';

  dropArea.addEventListener('dragover', function (e) {
    e.preventDefault();
    dropArea.classList.add('active');
  });

  dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('active');
  });

  dropArea.addEventListener('drop', function (e) {
    e.preventDefault();
    dropArea.classList.remove('active');

    var files = e.dataTransfer.files;
    if (files.length > 0) {
      // Dispatch a custom event to be caught by the content script injected on the webpage
      document.dispatchEvent(new CustomEvent('filesDropped', { detail: files }));
    }
  });

  document.body.appendChild(dropArea);
});

// Listen for events from the extension popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'getDropArea') {
    sendResponse({ dropAreaId: 'drop-area' });
  }
});

document.addEventListener('filesDropped', function (event) {
  var files = event.detail;

  // Implement the logic to find the specific file input and trigger its action
  // Example: Assuming the file input has an ID 'file-input'
  var fileInput = document.getElementById('file-input');

  if (fileInput) {
    fileInput.files = files;
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
  }
});
