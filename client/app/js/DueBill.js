function DueBill(bill) {
  let dueBill = $(`
    <div class="dueBill">
      <p>${bill.nextDue}</p>
      <p>${bill.billName}</p>
    </div>
  `);

  let confirm = $('<button class="confirm_paid_btn">&#9745</button>');

  dueBill.append(confirm);

  confirm.click(() => {
    location.hash = "#payment_details?bill=" + bill.billName;
  });

  return $("<div></div>").append(dueBill, "<hr>");
}

export { DueBill };
