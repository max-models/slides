const API = chrome || browser;

API.tabs.onActivated.addListener((activeInfo) => {
  API.tabs.get(activeInfo.tabId, function (tab) {
    API.commands.onCommand.addListener((command) => {
      if (command === "pixelate") {
        API.tabs.sendMessage(tab.id, { message: "pixelate" });
      } else if (command === "reset") {
        API.tabs.sendMessage(tab.id, { message: "reset" });
      }
    });
  });
});
