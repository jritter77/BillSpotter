import { User } from "../../app/utility/User.js";
import { Bubble } from "../../app/components/Bubble.js";
import { createFields, Form, FormSubmit } from "../../app/components/Form.js";

/** Login Component
 *
 * @returns {Bubble} - Login Component
 */

const Login = () => {
  return Bubble("User Login", loginForm()).css(loginStyle);
};

/** Login Form
 *
 * @returns {Form} - login Form
 */

const loginForm = () => {
  const form = Form();

  const fields = [
    { label: "Username", type: "text" },
    { label: "Password", type: "password" },
  ];

  const { Username: userField, Password: passField } = createFields(fields);

  const submitBtn = FormSubmit("Login", async () => {
    if (validateForm(userField, passField)) {
      let result = await User.login(
        userField.input.val(),
        passField.input.val()
      );

      if (result !== "FAILURE") {
        location.replace(location.toString().replace("login", "app"));
      }
    }
  });

  form.append(userField.group, passField.group, submitBtn);

  return form;
};

/** Validate Form Function
 *
 * @param {Object} userField
 * @param {Object} passField
 */

const validateForm = (userField, passField) => {
  userField.input.removeClass("invalid");
  passField.input.removeClass("invalid");

  userField.feedback.text("");
  passField.feedback.text("");

  let result = true;

  if (!userField.input.val()) {
    userField.feedback.text("Please Enter a Username.");
    userField.input.addClass("invalid");
    result = false;
  }

  if (!passField.input.val()) {
    passField.feedback.text("Please Enter a Password.");
    passField.input.addClass("invalid");
    result = false;
  }

  return result;
};

const loginStyle = {
  "margin-top": "10vh",
};

export { Login };
