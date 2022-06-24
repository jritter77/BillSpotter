import { Navbar } from "./components/Navbar.js";

import { Dashboard } from "./pages/dashboard/index.js";
import { MyBills } from "./pages/myBills/index.js";
import { MyPayments } from "./pages/myPayments/index.js";
import { EditBill } from "./pages/editBill/index.js";
import { EditPayment } from "./pages/editPayment/index.js";
import { Summary } from "./pages/summary/index.js";

$("header").html(Navbar());

const pages = {
  dashboard: Dashboard,
  bills: MyBills,
  payments: MyPayments,
  editBill: EditBill,
  editPayment: EditPayment,
  summary: Summary,
};

function getPageFromURL() {
  const loc = location.hash.substring(1);
  return loc.split("/")[0];
}

// Populate contentDiv wtih retrieved HTML
function loadContent() {
  let fragmentId = getPageFromURL();
  pages[fragmentId]();
}

// Set to home page if no hash
if (!location.hash) {
  location.hash = "#dashboard";
}

// initial call to load content
loadContent();

// add event listener for hash
window.addEventListener("hashchange", loadContent);
