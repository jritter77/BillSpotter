function collectEditBill() {
  let inputs = $("#edit_bill_form input");
  let selects = $("#edit_bill_form select");
  let elements = [...inputs, ...selects];

  let bill = {};

  for (let el of elements) {
    bill[el.id] = el.value;
  }

  return bill;
}

export { collectEditBill };
