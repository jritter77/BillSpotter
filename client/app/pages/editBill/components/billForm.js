import { Dialogue } from "../../../components/Dialogue.js";
import { createFields, Form, FormSubmit } from "../../../components/Form.js";
import { Toast } from "../../../components/Toast.js";
import { Bills } from "../../../utility/Bills.js";

// Form Field definitions
const fields = [
  { label: "Bill Name", type: "text" },
  { label: "Type", type: "select", options: ["Home", "Auto", "Medical"] },
  {
    label: "Frequency",
    type: "select",
    options: ["Monthly", "Weekly", "Yearly"],
  },
  { label: "Date Due", type: "date" },
  { label: "Amount Due", type: "number" },
];

/** Bill Form Componenet
 *
 * @returns {Form}
 */

const BillForm = (bill) => {
  const form = Form();

  const {
    "Bill Name": nameField,
    Type: typeField,
    Frequency: freqField,
    "Date Due": dateField,
    "Amount Due": amtField,
  } = createFields(fields);

  if (bill) {
    nameField.input.val(bill.bill_name);
    typeField.input[0].value = bill.bill_type;
    freqField.input[0].value = bill.bill_freq;
    dateField.input.val(bill.bill_due_date);
    amtField.input.val(bill.bill_amt_due);
  }

  const submitBtn = FormSubmit("Save Changes", () => {
    let result = validateForm(nameField, dateField, amtField);
    if (result) {
      let dialogue = Dialogue(
        "Are you sure you would like to ave these changes?",
        async () => {
          if (bill) {
            bill.bill_name = nameField.input.val();
            bill.bill_type = typeField.input.val();
            bill.bill_freq = freqField.input.val();
            bill.bill_due_date = dateField.input.val();
            bill.bill_amt_due = amtField.input.val();
            await Bills.editBill(bill.bill_id, bill);
          } else {
            let newBill = {
              bill_name: nameField.input.val(),
              bill_freq: freqField.input.val(),
              bill_type: typeField.input.val(),
              bill_amt_due: amtField.input.val(),
              bill_due_date: dateField.input.val(),
            };
            await Bills.newBill(newBill);
          }

          Toast("Bill changes saved successfully!");
          dialogue.remove();
          location.hash = "#bills";
        }
      );
      $("body").prepend(dialogue);
    }
    //TODO: Make call to post new bill if pass validation
  });

  form.append(
    $('<div class="row"></div>').append(nameField.group),
    $('<div class="row"></div>').append(typeField.group, freqField.group),
    $('<div class="row"></div>').append(dateField.group, amtField.group),
    submitBtn
  );

  return form;
};

/** Validate Form Function
 *
 * @param {Object} nameField
 * @param {Object} dateField
 * @param {Object} amtField
 * @returns {Boolean}
 */

function validateForm(nameField, dateField, amtField) {
  let args = [...arguments];
  let result = true;

  args.forEach((field) => {
    field.input.removeClass("invalid");
    field.feedback.text("");
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

export { BillForm };
