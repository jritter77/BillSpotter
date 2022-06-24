import { Dialogue } from "../../../components/Dialogue.js";
import { createFields, Form, FormSubmit } from "../../../components/Form.js";
import { Toast } from "../../../components/Toast.js";

// Form Field definitions
const fields = [
  {
    label: "Date Paid",
    type: "radio",
    groupname: "datePaid",
    options: [
      { label: "Today", value: 0 },
      { label: "Other Date", value: 1 },
    ],
  },
  {
    label: "Amount Paid",
    type: "radio",
    groupname: "amtPaid",
    options: [
      { label: "Full Amount", value: 0 },
      { label: "Other Amount", value: 1 },
    ],
  },
  { label: "otherDate", type: "date" },
  { label: "otherAmt", type: "number" },
];

/** Payment Form
 *
 * @returns {Form}
 */

const PaymentForm = () => {
  const form = Form();

  // Create and destruct fields
  const {
    "Date Paid": datePaidField,
    "Amount Paid": amtPaidField,
    otherDate: otherDateField,
    otherAmt: otherAmtField,
  } = createFields(fields);

  // Set initial radio buttons as checked
  datePaidField.input["Today"].attr("checked", true);
  amtPaidField.input["Full Amount"].attr("checked", true);

  // Disable optional inputs
  otherDateField.input.prop("disabled", true);
  otherAmtField.input.prop("disabled", true);

  // Hide labels of optional inputs
  otherDateField.label.css("display", "none");
  otherAmtField.label.css("display", "none");

  // Only enable optional inputs on radio change
  datePaidField.group.find("input[type=radio]").on("change", () => {
    otherDateField.input.prop(
      "disabled",
      !otherDateField.input.prop("disabled")
    );

    otherDateField.input.focus();
  });

  amtPaidField.group.find("input[type=radio]").on("change", () => {
    otherAmtField.input.prop("disabled", !otherAmtField.input.prop("disabled"));

    otherAmtField.input.focus();
  });

  // Set submission handler
  const submitBtn = FormSubmit("Confirm Payment", submissionHandler);

  form.append(
    $('<div class="row"></div>').append(
      datePaidField.group.append(otherDateField.group),
      amtPaidField.group.append(otherAmtField.group)
    ),
    submitBtn
  );

  return form;
};

// Submission handler
const submissionHandler = () => {
  let confirm = Dialogue(
    "Mark this bill as paid with current information?",
    () => {
      Toast("Payment information saved!");
      confirm.remove();
      location.hash = "#payments";
    }
  );

  $("body").prepend(confirm);
};

//TODO: v implement this v
// Validation function
function validateForm(nameField, dateField, amtField) {
  let args = [...arguments];
  let result = true;

  args.forEach((field) => {
    field.input.removeClass("invalid");
    field.feedback.text("");
    result = false;
  });

  if (!nameField.input.val()) {
    nameField.input.addClass("invalid");
    nameField.feedback.text("Please Enter a Name for this Bill.");
    result = false;
  }

  if (!dateField.input.val()) {
    dateField.input.addClass("invalid");
    dateField.feedback.text("Please Select a Due Date.");
    result = false;
  }

  if (!amtField.input.val()) {
    amtField.input.addClass("invalid");
    amtField.feedback.text("Please Enter an Amount Due.");
    result = false;
  }

  return result;
}

export { PaymentForm };
