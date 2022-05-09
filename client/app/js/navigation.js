function getPageFromURL() {
  const loc = location.hash.substring(1);
  return loc.split("-")[0];
}

// Populate contentDiv wtih retrieved HTML
async function loadContent(e) {
  e?.preventDefault();
  const navDropdown = document.getElementById("nav_dropdown");

  let page = getPageFromURL();
  let fragmentId = page.match(/[A-Za-z0-9\-\_]+/)[0];
  let billName = page.match(/bill=[A-Za-z]+/);

  if (billName) {
    billName = billName[0].split("=")[1];
  } else {
    $("#edit_bill_form")[0].reset();
  }

  const sections = document.getElementsByTagName("section");

  navDropdown.classList.remove("active");

  for (let sec of sections) {
    if (sec.id === fragmentId) {
      sec.classList.add("active");

      if (sec.id === "edit_bill") {
        let bills = JSON.parse(sessionStorage.getItem("bills"));

        for (let bill of bills) {
          if (billName && bill.billName === billName) {
            $("#bill_name").val(bill.billName);
            $("#bill_type")[0].value = bill.type;
            $("#bill_freq")[0].value = bill.freq;
            $("#bill_date_due").val(bill.nextDue);
            $("#bill_amt_due").val(bill.amtDue);
          }
        }
      }
    } else {
      sec.classList.remove("active");
    }
  }
}

function initNav() {
  const navDropdownBtn = document.getElementById("nav_btn");
  const navDropdown = document.getElementById("nav_dropdown");

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
