import { collectEditBill, collectPaymentDetails } from "./formCollection.js";
import { updateMyBills, updatePayments } from "./pageHandlers.js";

// fetches bill from server and saves them in session storage for app use
async function getBills() {
  try {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let endpoint = "../../server/bills/getBills.php";
    let payload = { req: JSON.stringify({ user: user }) };

    let result = await $.get(endpoint, payload);
    sessionStorage.setItem("bills", result);
  } catch (error) {
    console.error(error);
  }
}

// grabs input from edit_bill_form and sends a request to create a new bill in the db
async function newBill() {
  let bill = collectEditBill();

  let user = JSON.parse(sessionStorage.getItem("user"));
  let endpoint = "../../server/bills/newBill.php";
  let payload = { req: JSON.stringify({ user: user, bill: bill }) };

  let result = await $.post(endpoint, payload);
  await getBills();

  history.back();

  console.log(result);
}

// grabs input from edit_bill_form and sends a request to update bill in db
async function editBill(bill_id) {
  let bill = collectEditBill();

  bill.bill_id = bill_id;

  let user = JSON.parse(sessionStorage.getItem("user"));
  let endpoint = "../../server/bills/editBill.php";
  let payload = { req: JSON.stringify({ user: user, bill: bill }) };

  let result = await $.post(endpoint, payload);
  await getBills();

  history.back();

  console.log(result);
}

// grabs information from payment_form and sends a request update the date paid and amt paid of bill
async function confirmPaid(bill_id) {
  let bill = collectPaymentDetails();

  bill.bill_id = bill_id;

  let user = JSON.parse(sessionStorage.getItem("user"));
  let endpoint = "../../server/bills/confirmPaid.php";
  let payload = { req: JSON.stringify({ user: user, bill: bill }) };

  let result = await $.post(endpoint, payload);
  await getBills();

  console.log(location);

  history.back();

  console.log(result);
}

// deletes entire row of specified bill
async function deleteBill(bill) {
  let user = JSON.parse(sessionStorage.getItem("user"));
  let endpoint = "../../server/bills/deleteBill.php";
  let payload = { req: JSON.stringify({ user: user, bill: bill }) };

  let result = await $.post(endpoint, payload);
  await getBills();

  updateMyBills();

  console.log(result);
}

// sets the date paid and amt paid of bill to NULL
async function deletePayment(bill) {
  let user = JSON.parse(sessionStorage.getItem("user"));
  let endpoint = "../../server/bills/deletePayment.php";
  let payload = { req: JSON.stringify({ user: user, bill: bill }) };

  let result = await $.post(endpoint, payload);
  await getBills();

  updatePayments();

  console.log(result);
}

export { getBills, newBill, editBill, confirmPaid, deleteBill, deletePayment };
