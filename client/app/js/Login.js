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

  let submit = $(`<input type="submit" value="Login">`);

  submit.click((e) => {
    e.preventDefault();

    let user = username.val();
    let pass = password.val();

    login(user, pass);
  });

  container.append(
    form.append(
      `<label for"user">Username</label>`,
      username,
      `<label for="pass">Password</label>`,
      password,
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
