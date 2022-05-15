import { testBills } from "./BillDropdown.js";
import { initNav } from "./navigation.js";
import { initAllPages } from "./pageHandlers.js";

// Initialize navigation

async function getBills() {
  sessionStorage.setItem("bills", JSON.stringify(testBills));
}

getBills();

initNav();

initAllPages();
