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

  let isValid = validateForm(username, password, confirmPass);

  if (isValid) {
    newUser(username, password);
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

function validateForm(username, password, confirmPass) {
  $("#username").css("border-color", "black");
  $("#password").css("border-color", "black");
  $("#confirm_pass").css("border-color", "black");
  $("#terms_pass").css("border-color", "black");

  $("#username_feedback").css("display", "none");
  $("#password_feedback").css("display", "none");
  $("#confirm_pass_feedback").css("display", "none");
  $("#terms_pass_feedback").css("display", "none");

  if (!username) {
    $("#username").css("border-color", "red");
    $("#username_feedback")
      .css("display", "block")
      .text("Please enter a username.");
    return false;
  }

  if (!password) {
    $("#password").css("border-color", "red");
    $("#password_feedback")
      .css("display", "block")
      .text("Please enter a password.");
    return false;
  }

  if (!confirmPass) {
    $("#confirm_pass").css("border-color", "red");
    $("#confirm_pass_feedback")
      .css("display", "block")
      .text("Please confirm password.");
    return false;
  }

  if (password !== confirmPass) {
    $("#confirm_pass").css("border-color", "red");
    $("#confirm_pass_feedback")
      .css("display", "block")
      .text("Passwords do not match.");
    return false;
  }

  if (!$("#terms")[0].checked) {
    $("#terms_feedback")
      .css("display", "block")
      .text("Please agree to Terms & Conditions.");
    return false;
  }

  return true;
}
