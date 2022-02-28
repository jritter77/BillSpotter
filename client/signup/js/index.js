const navDropdownBtn = document.getElementById("nav_btn");
const navDropdown = document.getElementById("nav_dropdown");

navDropdownBtn.onclick = () => {
  navDropdown.classList.toggle("active");
};
