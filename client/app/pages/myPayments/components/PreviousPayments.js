import { Bubble } from "../../../components/Bubble";
import { Dialogue } from "../../../components/Dialogue";

const testBill = { bill_due_date: "01/01/01", bill_name: "test" };

/** Previos Payments Component
 *
 * @returns {Bubble} - Previous Payments component
 */

const PreviousPayments = () => {
  const container = $(`<div></div>`);

  for (let i = 0; i < 3; i++) {
    container.append(paidBill(testBill));
  }

  return Bubble("Next Due Payments", container).css(bubbleStyle);
};

/** Paid Bill Component
 *
 * @param {Object} bill - bill for component
 * @returns {JQuery} - Paid Bill element
 */

const paidBill = ({ bill_due_date, bill_name }) => {
  const row = $(`<div></div>`).css(paidBillStyle);
  const date = $(`<p></p>`).text(bill_due_date);
  const title = $(`<p></p>`).text(bill_name);
  const removeBtn = $(`<button>&#9746;</button>`).css(paidBtnStyle);

  removeBtn.click(() => {
    let confirmDialoge = Dialogue(
      "Are you sure you would like to remove this payment?",
      () => {
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
