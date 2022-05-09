function DueBill(bill) {
  return `
    <div class="dueBill">
        <p>${bill.nextDue}</p>
        <p>${bill.billName}</p>
        <button class="confirm_paid_btn">&#9745</button>
    </div>
    <hr>
    `;
}

export { DueBill };
