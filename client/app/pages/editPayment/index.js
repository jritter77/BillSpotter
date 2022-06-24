import { BackBtn } from "../../components/BackBtn.js";
import { Bubble } from "../../components/Bubble.js";
import { PaymentForm } from "./components/paymentForm.js";

const testBill = {
  bill_id: 1,
  bill_name: "test",
  bill_due_date: "2022-06-20",
  bill_amt_due: 100,
  bill_freq: "Monthly",
  bill_type: "Home",
};

/** Edit Payment Component
 *
 */
const EditPayment = () => {
  const APP = $("#app");

  APP.html(`
          <h1>Edit Payment</h1>
  `);

  let form = PaymentForm();

  let billNameGroup = $("<div></div>").css(groupStyle);
  let billNameHeader = $("<p>Date Due</p>").css(headerStyle);
  let billName = $("<p></p>").text(testBill.bill_name);

  let typeGroup = $("<div></div>").css(groupStyle);
  let typeHeader = $("<p>Type</p>").css(headerStyle);
  let type = $("<p></p>").text(testBill.bill_type);

  let dueDateGroup = $("<div></div>").css(groupStyle);
  let dueDateHeader = $("<p>Date Due</p>").css(headerStyle);
  let dueDate = $("<p></p>").text(testBill.bill_due_date);

  let amtDueGroup = $("<div></div>").css(groupStyle);
  let amtDueHeader = $("<p>Date Due</p>").css(headerStyle);
  let amtDue = $("<p></p>").text(testBill.bill_amt_due);

  let content = $("<div></div>").append(
    $('<div class="row"></div>').append(
      billNameGroup.append(billNameHeader, billName),
      typeGroup.append(typeHeader, type)
    ),
    $('<div class="row"></div>').append(
      dueDateGroup.append(dueDateHeader, dueDate),
      amtDueGroup.append(amtDueHeader, amtDue)
    ),
    form
  );

  APP.append(Bubble("Edit Payment", content), BackBtn("#payments"));
};

const groupStyle = {
  "text-align": "center",
  flex: 1,
};

const headerStyle = {
  "text-decoration": "underline",
};

export { EditPayment };
