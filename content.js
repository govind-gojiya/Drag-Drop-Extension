document.addEventListener('DOMContentLoaded', function () {
  var dropArea = document.getElementById('drop-area');
  
  // Check the initial extension state
  browser.storage.local.get('extensionState', function (data) {
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
  browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'toggleDropZone') {
      dropArea.style.display = request.state === 'open' ? 'block' : 'none';
    }
  });
});

// Allow users to paste files into the drop zone
document.addEventListener('paste', function (e) {
  var items = e.clipboardData.items;

  for (var i = 0; i < items.length; i++) {
    if (items[i].kind === 'file') {
      var file = items[i].getAsFile();
      document.dispatchEvent(new CustomEvent('filesDropped', { detail: [file] }));
      break;  // Only handle the first file
    }
  }
});
