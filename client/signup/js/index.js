const navDropdownBtn = document.getElementById("nav_btn");
const navDropdown = document.getElementById("nav_dropdown");

navDropdownBtn.onclick = () => {
  navDropdown.classList.toggle("active");
};

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
