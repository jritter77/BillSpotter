function getPageFromURL() {
  const loc = location.hash.substring(1);
  return loc.split("-")[0];
}

// Populate contentDiv wtih retrieved HTML
async function loadContent(e) {
  e?.preventDefault();
  let fragmentId = getPageFromURL();

  const navDropdownBtn = document.getElementById("nav_btn");
  const navDropdown = document.getElementById("nav_dropdown");
  const sections = document.getElementsByTagName("section");

  navDropdownBtn.onclick = () => {
    navDropdown.classList.toggle("active");
  };

  for (let sec of sections) {
    if (sec.id === fragmentId) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  }
}

// Set to home page if no hash
if (!location.hash) {
  location.hash = "#home";
}

// initial call to load content
loadContent();

// add event listener for hash
window.addEventListener("hashchange", loadContent);
