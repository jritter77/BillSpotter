import { Bubble } from "./Bubble.js";
import { createFields, Form, FormSubmit } from "./Form.js";

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

  const submitBtn = FormSubmit("Login", () =>
    validateForm(userField, passField)
  );

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

  if (!userField.input.val()) {
    userField.feedback.text("Please Enter a Username.");
    userField.input.addClass("invalid");
  }

  if (!passField.input.val()) {
    passField.feedback.text("Please Enter a Password.");
    passField.input.addClass("invalid");
  }
};

const loginStyle = {
  "margin-top": "10vh",
};

export { Login };
