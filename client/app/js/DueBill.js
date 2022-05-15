function DueBill(bill) {
  // due bill element
  let dueBill = $(`
    <div class="dueBill">
      <p>${bill.nextDue}</p>
      <p>${bill.billName}</p>
    </div>
  `);

  // confirm payment button
  let confirm = $('<button class="confirm_paid_btn">&#9745</button>');
  dueBill.append(confirm);

  // set confirm handler
  confirm.click(() => {
    location.hash = "#payment_details?bill=" + bill.billName;
  });

  return $("<div></div>").append(dueBill, "<hr>");
}

export { DueBill };
