import { BackBtn } from "../../components/BackBtn.js";
import { Bubble } from "../../components/Bubble.js";
import { Bills } from "../../utility/Bills.js";
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
const EditPayment = async () => {
  const APP = $("#app");

  APP.html(`
          <h1>Edit Payment</h1>
  `);

  if (!sessionStorage.getItem("bills")) {
    await Bills.getBills();
  }

  const bills = Bills.parseBills();

  let bill;

  let bill_id = location.hash.split("/")[1];
  if (bill_id) {
    for (let b of bills) {
      if (b.bill_id === parseInt(bill_id)) {
        bill = b;
        break;
      }
    }
  }

  let form = PaymentForm(bill);

  let billNameGroup = $("<div></div>").css(groupStyle);
  let billNameHeader = $("<p>Bill Name</p>").css(headerStyle);
  let billName = $("<p></p>").text(bill.bill_name);

  let typeGroup = $("<div></div>").css(groupStyle);
  let typeHeader = $("<p>Type</p>").css(headerStyle);
  let type = $("<p></p>").text(bill.bill_type);

  let dueDateGroup = $("<div></div>").css(groupStyle);
  let dueDateHeader = $("<p>Date Due</p>").css(headerStyle);
  let dueDate = $("<p></p>").text(bill.bill_due_date);

  let amtDueGroup = $("<div></div>").css(groupStyle);
  let amtDueHeader = $("<p>Amount Due</p>").css(headerStyle);
  let amtDue = $("<p class='dollar'></p>").text(bill.bill_amt_due);

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
