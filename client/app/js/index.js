import { initNav } from "./navigation.js";
import { initAllPages } from "./pageHandlers.js";
import { getBills } from "./requests.js";

// Initialize navigation

async function startApp() {
  await getBills();

  initNav();

  initAllPages();
}

startApp();
