function DueBill(bill) {
  // due bill element
  let dueBill = $(`
    <div class="dueBill">
      <p>${bill.bill_due_date}</p>
      <p>${bill.bill_name}</p>
    </div>
  `);

  // confirm payment button
  let confirm = $('<button class="confirm_paid_btn">&#9745</button>');
  dueBill.append(confirm);

  // set confirm handler
  confirm.click(() => {
    location.hash = "#payment_details?bill=" + bill.bill_id;
  });

  return $("<div></div>").append(dueBill, "<hr>");
}

export { DueBill };
