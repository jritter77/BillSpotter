import { Bubble } from "../../../components/Bubble.js";
import { Dialogue } from "../../../components/Dialogue.js";
import { Toast } from "../../../components/Toast.js";
import { Bills } from "../../../utility/Bills.js";

const testBill = { bill_due_date: "01/01/01", bill_name: "test" };

/** Previos Payments Component
 *
 * @returns {Bubble} - Previous Payments component
 */

const PreviousPayments = (bills) => {
  const container = $(`<div></div>`);

  for (let bill of bills) {
    container.append(paidBill(bill));
  }

  return Bubble("Previous Payments", container).css(bubbleStyle);
};

/** Paid Bill Component
 *
 * @param {Object} bill - bill for component
 * @returns {JQuery} - Paid Bill element
 */

const paidBill = (bill) => {
  const row = $(`<div></div>`).css(paidBillStyle);
  const date = $(`<p></p>`).text(bill.bill_due_date);
  const title = $(`<p></p>`).text(bill.bill_name).css(titleStyle);
  const removeBtn = $(`<button>&#9746;</button>`).css(paidBtnStyle);

  removeBtn.click(() => {
    let confirmDialoge = Dialogue(
      "Are you sure you would like to remove this payment?",
      async () => {
        await Bills.deletePayment(bill);
        Toast("Payment Deleted!");
        console.log("confirmed");
        confirmDialoge.remove();
      }
    );
    $("body").prepend(confirmDialoge);
  });

  row.append(date, title, removeBtn);

  return row;
};

const bubbleStyle = {
  "margin-top": "5%",
};

const paidBillStyle = {
  display: "flex",
  "justify-content": "space-between",
  "align-items": "center",
  padding: "5%",
  "font-size": "5vw",
};

const titleStyle = {
  overflow: "hidden",
  "white-space": "nowrap",
  "text-overflow": "ellipsis",
  "max-width": "40%",
};

const paidBtnStyle = {
  padding: 0,
  margin: 0,
  width: "20%",
  "font-size": "10vw",
  "font-weight": "bold",
  background: "red",
  color: "white",
  "border-radius": "25%",
};

export { PreviousPayments };
