function collectEditBill() {
  let inputs = $("#edit_bill_form input");
  let selects = $("#edit_bill_form select");
  let elements = [...inputs, ...selects];

  let bill = {};

  for (let el of elements) {
    bill[el.id] = el.value ? el.value : null;
  }

  return bill;
}

function collectPaymentDetails() {
  let bill = {};

  let date = new Date();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  let today = `${date.getFullYear()}-${month}-${day}`;

  if ($("#radio_today").is(":checked")) {
    bill.bill_date_paid = today;
  } else {
    bill.bill_date_paid = $("#other_date").val();
  }

  if ($("#radio_full_amt").is(":checked")) {
    bill.bill_amt_paid = parseInt($("#pay_amt_due").text());
  } else {
    bill.bill_amt_due = parseInt($("#other_amt").val());
  }

  return bill;
}

export { collectEditBill, collectPaymentDetails };
