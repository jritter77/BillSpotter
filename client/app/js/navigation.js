function getPageFromURL() {
  const loc = location.hash.substring(1);
  return loc.split("-")[0];
}

// Populate contentDiv wtih retrieved HTML
async function loadContent(e) {
  e?.preventDefault();
  const navDropdown = document.getElementById("nav_dropdown");

  let fragmentId = getPageFromURL();
  fragmentId = fragmentId.match(/[A-Za-z0-9\-\_]+/)[0];
  console.log(fragmentId);

  const sections = document.getElementsByTagName("section");

  navDropdown.classList.remove("active");

  for (let sec of sections) {
    if (sec.id === fragmentId) {
      sec.classList.add("active");

      if (sec.id === "edit_bill") {
        let bills = JSON.parse(sessionStorage.getItem("bills"));
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
