// fetches bill from server and saves them in session storage for app use
async function getBills() {
  //TODO: send user and current API key in request

  let result = await $.get("../../server/test.php");
  sessionStorage.setItem("bills", result);
}

async function newBill(bill) {
  //TODO: Send POST request containing new bill, current user, and current API key.
  //TODO: Return 'SUCCESS' or 'FAILURE' depending on result
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

export { getBills };
