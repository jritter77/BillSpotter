const navDropdownBtn = document.getElementById("nav_btn");
const navDropdown = document.getElementById("nav_dropdown");
const dropdowns = document.getElementsByClassName("dropdown");

function getPageFromURL() {
  const loc = location.hash.substring(1);
  return loc.split("-")[0];
}

// Populate contentDiv wtih retrieved HTML
async function loadContent(e) {
  e?.preventDefault();
  let fragmentId = getPageFromURL();

  const sections = document.getElementsByTagName("section");

  navDropdown.classList.remove("active");

  for (let sec of sections) {
    if (sec.id === fragmentId) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  }
}

for (let dd of dropdowns) {
  dd.onclick = () => {
    for (let el of document.getElementsByClassName("contents")) {
      if (el !== dd.children[1]) {
        el.classList.remove("active");
      }
    }
    dd.children[1].classList.toggle("active");
  };
}

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
