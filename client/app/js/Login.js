import { login } from "./requests";

function Login() {
  let container = $(`
        <div id="login" class="bubble">
            <h1>User Login</h1>
        </div>
    `);

  let form = $(`<form id="login_form"></form>`);

  let username = $('<input id="user">');
  let password = $('<input id="pass" type="password">');

  let username_feedback = $('<p class="input_feedback"></p>');
  let password_feedback = $('<p class="input_feedback"></p>');

  let submit = $(`<input type="submit" value="Login">`);

  submit.click(async (e) => {
    e.preventDefault();

    let user = username.val();
    let pass = password.val();

    username.css("border-color", "black");
    password.css("border-color", "black");

    $(".input_feedback").css("display", "none");

    if (!user) {
      username.css("border-color", "red");
      username_feedback
        .css("display", "block")
        .text("Please enter a username.");
      return false;
    }

    if (!pass) {
      password.css("border-color", "red");
      password_feedback
        .css("display", "block")
        .text("Please enter a password.");
      return false;
    }

    if ((await login(user, pass)) === "FAILURE") {
      password.css("border-color", "red");
      password_feedback.css("display", "block").text("Invalid Credentials");
      return false;
    }
  });

  container.append(
    form.append(
      `<label for"user">Username</label>`,
      username,
      username_feedback,
      `<label for="pass">Password</label>`,
      password,
      password_feedback,
      submit
    )
  );

  setNavDropdown();

  return container;
}

const setNavDropdown = () => {
  const dropdown = $("#nav_dropdown");

  $("nav > a").attr("href", "../splash/index.html#home");

  dropdown.html(`
    <hr />
    <li><a href="../splash/index.html#home">Home</a></li>
    <li><a href="../splash/index.html#about">About</a></li>
    <li><a href="../splash/index.html#features">Features</a></li>
    <hr />
    <li><a href="../signup/index.html">Sign Up</a></li>
    <li><a href="#home">Login</a></li>
    <hr />
    <li><a href="#">Terms</a></li>
  `);
};

export { Login };
