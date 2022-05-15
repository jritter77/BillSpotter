import { Alert } from "./Alert";

function PrevBill(bill) {
  // previous bill element
  let prevBill = $(`
      <div class="prevBill">
        <p>${bill.nextDue}</p>
        <p>${bill.billName}</p>
      </div>
    `);

  // remove payment button
  let remove = $('<button class="remove_paid_btn">&#9746</button>');
  prevBill.append(remove);

  // remove payment handler
  remove.click(() => {
    Alert(`Are you sure you would like to remove this payment?`, () =>
      console.log("confirmed")
    );
  });

  return $("<div></div>").append(prevBill, "<hr>");
}

export { PrevBill };
