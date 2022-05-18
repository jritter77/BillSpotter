import { collectEditBill } from "./formCollection";

// fetches bill from server and saves them in session storage for app use
async function getBills() {
  let user = JSON.parse(sessionStorage.getItem("user"));
  let endpoint = "../../server/bills/getBills.php";
  let payload = { req: JSON.stringify({ user: user }) };

  let result = await $.get(endpoint, payload);
  sessionStorage.setItem("bills", result);
}

async function newBill() {
  //TODO: Send POST request containing new bill, current user, and current API key.
  //TODO: Return 'SUCCESS' or 'FAILURE' depending on result

  let bill = collectEditBill();

  let user = JSON.parse(sessionStorage.getItem("user"));
  let endpoint = "../../server/bills/newBill.php";
  let payload = { req: JSON.stringify({ user: user, bill: bill }) };

  let result = await $.post(endpoint, payload);
  console.log(result);
}

async function editBill(bill) {
  //TODO: Send POST request containing edited bill, current user, and current API key.
  //TODO: Return 'SUCCESS' or 'FAILURE' depending on result
}

async function confirmPaid(bill) {
  //TODO: Send POST request containing paid date, paid amt, current user, and current API key.
  //TODO: Return 'SUCCESS' or 'FAILURE' depending on result
}

async function deleteBill(bill) {
  //TODO: Send POST request containing bill_id, current user, and current API key.
  //TODO: Return 'SUCCESS' or 'FAILURE' depending on result
}

async function deletePayment(bill) {
  //TODO: Send POST request containing bill_id, current user, and current API key.
  //TODO: Return 'SUCCESS' or 'FAILURE' depending on result
}

export { getBills, newBill, editBill, confirmPaid, deleteBill, deletePayment };
