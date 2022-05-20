import { Alert } from "./Alert.js";
import { deletePayment } from "./requests.js";

function PrevBill(bill) {
  // previous bill element
  let prevBill = $(`
      <div class="prevBill">
        <p>${bill.bill_due_date}</p>
        <p>${bill.bill_name}</p>
      </div>
    `);

  // remove payment button
  let remove = $('<button class="remove_paid_btn">&#9746</button>');
  prevBill.append(remove);

  // remove payment handler
  remove.click(() => {
    Alert(`Are you sure you would like to remove this payment?`, () => {
      deletePayment(bill);
    });
  });

  return $("<div></div>").append(prevBill, "<hr>");
}

export { PrevBill };
