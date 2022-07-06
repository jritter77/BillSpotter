class User {
  static async newUser(username, password) {
    let endpoint = "../../server/users/newUser.php";
    let payload = { req: JSON.stringify({ username, password }) };

    let result = await $.post(endpoint, payload);

    console.log(result);

    return result;
  }

  static async login(username, password) {
    let endpoint = "../../server/users/userLogin.php";
    let payload = { req: JSON.stringify({ username, password }) };

    let result = await $.post(endpoint, payload);

    console.log(result);

    if (!(result === "FAILURE")) {
      sessionStorage.setItem("user", result);
    }

    return result;
  }

  static async verifyUser() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let endpoint = "../../server/users/verifyUser.php";
    let payload = { req: JSON.stringify({ user: user }) };

    let result = await $.post(endpoint, payload);

    if (!result) {
      sessionStorage.clear();
      location.reload();
    }

    console.log(result);
  }
}

export { User };
