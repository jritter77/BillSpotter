import {
  updatePaymentDetails,
  updateEditBill,
  updateMyBills,
} from "./pageHandlers.js";

function getPageFromURL() {
  const loc = location.hash.substring(1);
  return loc.split("-")[0];
}

// Populate contentDiv wtih retrieved HTML
async function loadContent(e) {
  e?.preventDefault();

  // Get elements
  const navDropdown = document.getElementById("nav_dropdown");
  const sections = document.getElementsByTagName("section");

  // Split location into page and billName
  let page = getPageFromURL();
  let fragmentId = page.match(/[A-Za-z0-9\-\_]+/)[0];
  let billName = page.match(/bill=[0-9A-Za-z&_]+/);

  // Display blank edit bill form if no billName
  if (billName) {
    billName = billName[0].split("=")[1];
  } else {
    $("#edit_bill_form")[0].reset();
  }

  // close nav dropdown on tranition
  navDropdown.classList.remove("active");

  // close all dropdowns on tranition
  $(".contents").removeClass("active");

  // Display back button if not viewing dashboard
  if (fragmentId === "home") {
    $("#back_button").css("display", "none");
  } else {
    $("#back_button").css("display", "block");
  }

  // Trigger section specific functions
  for (let sec of sections) {
    // if section = currnet location
    if (sec.id === fragmentId) {
      sec.classList.add("active");

      // if current section = edit_bill
      if (sec.id === "edit_bill") {
        updateEditBill(billName);
      }

      // if current section = payment_details
      else if (sec.id === "payment_details") {
        updatePaymentDetails(billName);
      }

      // if current section = bills
      else if (sec.id === "bills") {
        updateMyBills();
      }
    } else {
      sec.classList.remove("active");
    }
  }
}

// initialize navigation handlers and elements
function initNav() {
  const navDropdownBtn = document.getElementById("nav_btn");
  const navDropdown = document.getElementById("nav_dropdown");

  // set onclick handler of nav dropdown button
  navDropdownBtn.onclick = () => {
    navDropdown.classList.toggle("active");
  };

  // Set to home page if no hash
  if (!location.hash) {
    location.hash = "#home";
  }

  // initial call to load content
  loadContent();

  // add event listener for hash
  window.addEventListener("hashchange", loadContent);
}

export { initNav };