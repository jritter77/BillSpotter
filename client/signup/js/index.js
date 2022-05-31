import { login } from "../../app/js/requests";

const navDropdownBtn = document.getElementById("nav_btn");
const navDropdown = document.getElementById("nav_dropdown");

navDropdownBtn.onclick = () => {
  navDropdown.classList.toggle("active");
};

$("input[type=submit]").click((e) => {
  e.preventDefault();
  let username = $("#username").val();
  let password = $("#password").val();
  let confirmPass = $("#confirm_pass").val();

  if (password === confirmPass) {
    //TODO: implement check if username already exists
    newUser(username, password);
  } else {
    console.log("pass do not match");
  }
});

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

async function newUser(username, password) {
  let endpoint = "../../server/users/newUser.php";
  let payload = { req: JSON.stringify({ username, password }) };

  let result = await $.post(endpoint, payload);

  console.log(result);

  if (result === "SUCCESS") {
    await login(username, password);
    location.replace("http://localhost/billspotter/client/app/#home");
  }
}
