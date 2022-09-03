import { createFields, Form, FormSubmit } from "../../app/components/Form.js";

import { User } from "../../app/utility/User.js";

// Form Field definitions
const fields = [
  {
    label: "Username",
    type: "text",
  },
  {
    label: "Password",
    type: "password",
  },
  {
    label: "Confirm Password",
    type: "password",
  },
];

/** Payment Form
 *
 * @returns {Form}
 */

const SignupForm = () => {
  const form = Form();

  // Create and destruct fields
  const {
    Username: userField,
    Password: passField,
    "Confirm Password": confirmPassField,
  } = createFields(fields);

  // Set submission handler
  const submitBtn = FormSubmit("Register", () => {
    submissionHandler(userField, passField, confirmPassField);
  });

  form.append(
    userField.group,
    passField.group,
    confirmPassField.group,
    submitBtn
  );

  return form;
};

// Submission handler
const submissionHandler = async (userField, passField, confirmPassField) => {
  if (validateForm(userField, passField, confirmPassField)) {
    let username = userField.input.val();
    let password = passField.input.val();

    let result = await User.newUser(username, password);

    if (result === "SUCCESS") {
      location = location.toString().replace("signup", "app");
    }
  }
};

//TODO: v implement this v
// Validation function
function validateForm(userField, passField, confirmPassField) {
  let args = [...arguments];
  let result = true;

  args.forEach((field) => {
    field.input.removeClass("invalid");
    field.feedback.text("");
  });

  if (!userField.input.val()) {
    userField.input.addClass("invalid");
    userField.feedback.text("Please Enter a Username.");
    result = false;
  }

  if (!passField.input.val()) {
    passField.input.addClass("invalid");
    passField.feedback.text("Please Enter a Password.");
    result = false;
  }

  if (!confirmPassField.input.val()) {
    confirmPassField.input.addClass("invalid");
    confirmPassField.feedback.text("Please Confirm Password.");
    result = false;
  }

  console.log(result);

  return result;
}

export { SignupForm };
