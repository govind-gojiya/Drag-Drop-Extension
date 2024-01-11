document.addEventListener('DOMContentLoaded', function () {
  var dropArea = document.getElementById('drop-area');
  var closeButton = document.getElementById('close-button');

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

  closeButton.addEventListener('click', function () {
    window.close();
  });
});
