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

  return container;
}

export { Login };
