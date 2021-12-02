var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function saveOptions(e) {
    e.preventDefault();
    let link = document.querySelector("link").value
    getJSON(link,
    function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        browser.storage.local.set(data);
        alert('Updated');
      }
    });
  }
  
document.querySelector("form").addEventListener("submit", saveOptions);
  