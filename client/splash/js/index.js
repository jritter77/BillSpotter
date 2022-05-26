const navDropdownBtn = document.getElementById("nav_btn");
const navDropdown = document.getElementById("nav_dropdown");

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

  // Display back button if not viewing dashboard
  if (fragmentId === "home") {
    $(".back_button").css("display", "none");
  } else {
    $(".back_button").css("display", "block");
  }

  for (let sec of sections) {
    if (sec.id === fragmentId) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  }
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

// Set window dimensions as constant to prevent soft keyboard from interfering with layout
setTimeout(() => {
  let viewHeight = window.visualViewport.height;
  let viewWidth = window.visualViewport.width;
  let viewport = document.querySelector("meta[name=viewport");
  viewport.setAttribute(
    "content",
    `height=${viewHeight}, width=${viewWidth}, initial-scale=1.0`
  );
}, 300);

$(".back_button").click(() => {
  history.back();
});
