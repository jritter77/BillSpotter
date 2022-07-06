import { Dashboard } from "./pages/dashboard/index.js";
import { MyBills } from "./pages/myBills/index.js";
import { MyPayments } from "./pages/myPayments/index.js";
import { EditBill } from "./pages/editBill/index.js";
import { EditPayment } from "./pages/editPayment/index.js";
import { Summary } from "./pages/summary/index.js";

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

// initial call to load content
$(window).ready(() => {
  if (!sessionStorage.getItem("user")) {
    location = location.toString().replace("app", "login");
    return;
  }

  // add event listener for hash
  window.addEventListener("hashchange", loadContent);

  // Set to home page if no hash
  if (!location.hash) {
    location.hash = "#dashboard";
  } else {
    loadContent();
  }

  // set dropdown menu behavior
  $(".navDropdownBtn").click(() => {
    $(".navDropdownMenu").toggleClass("active");
  });

  $(window).on("hashchange", () => {
    $(".navDropdownMenu").removeClass("active");
  });

  $(".navDropdownMenu")
    .find("a")
    .click(() => $(".navDropdownMenu").removeClass("active"));

  $("#logout").click(() => sessionStorage.clear());
});
