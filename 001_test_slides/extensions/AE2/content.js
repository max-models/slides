window.browser = (function () {
  return window.msBrowser || window.browser || window.chrome;
})();

function pickPixelArt(art) {
  switch (art) {
    case "a":
      return browser.runtime.getURL("images/pixel-adventure-time.png");
    case "b":
      return browser.runtime.getURL("images/pixel-cat.jpg");
    case "c":
      return browser.runtime.getURL("images/pixel-city.png");
    case "d":
      return browser.runtime.getURL("images/pixel-zen-garden.png");
  }
}

function pickRandomImage() {
  const array = ["a", "b", "c", "d"];
  let index = Math.floor(Math.random() * array.length);
  let random = array[index];
  return random;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "pixelate") {
    if (!document.getElementById("pixelTime")) {
      const container = document.createElement("div");
      container.setAttribute("id", "pixelTime");
      container.className = "pixel-time";
      const pixelArt = document.createElement("img");
      const url = pickPixelArt(pickRandomImage());
      pixelArt.setAttribute("src", url);
      container.appendChild(pixelArt);
      document.body.appendChild(container);
    } else {
      console.log("Already pixelated");
    }
  }

  if (request.message === "reset") {
    if (document.getElementById("pixelTime")) {
      document.getElementById("pixelTime").remove();
    } else {
      console.log("No pixels left");
    }
  }
});
