window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

let id;
browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  id = tabs[0].id;
  browser.scripting.executeScript({
    target: { tabId: id },
    files: ["content.js"],
  });
  browser.scripting.insertCSS({
    target: { tabId: id },
    files: ["content.css"],
  });
});

document.getElementById("pixelate").addEventListener("click", () => {
  browser.tabs.sendMessage(id, { message: "pixelate" });
});

document.getElementById("reset").addEventListener("click", () => {
  browser.tabs.sendMessage(id, { message: "reset" });
});
