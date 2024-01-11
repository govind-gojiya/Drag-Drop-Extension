document.addEventListener('DOMContentLoaded', function () {
  var dropArea = document.getElementById('drop-area');

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
      document.dispatchEvent(new CustomEvent('filesDropped', { detail: files }));
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var dropArea = document.getElementById('drop-area');
  
  // Check the initial extension state
  chrome.storage.local.get('extensionState', function (data) {
    if (data.extensionState === 'closed') {
      dropArea.style.display = 'none';
    }
  });

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
      document.dispatchEvent(new CustomEvent('filesDropped', { detail: files }));
    }
  });

  // Listen for messages from the background script to toggle the drop zone visibility
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleDropZone') {
      dropArea.style.display = request.state === 'open' ? 'block' : 'none';
    }
  });
});
