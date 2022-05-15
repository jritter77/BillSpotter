import { initNav } from "./navigation.js";
import { initAllPages } from "./pageHandlers.js";
import { getBills } from "./requests.js";

// Initialize navigation

setTimeout(() => {
  let viewHeight = window.visualViewport.height;
  let viewWidth = window.visualViewport.width;
  let viewport = document.querySelector("meta[name=viewport");
  viewport.setAttribute(
    "content",
    `height=${viewHeight}, width=${viewWidth}, initial-scale=1.0`
  );
}, 300);

async function startApp() {
  await getBills();

  initNav();

  initAllPages();
}

startApp();
