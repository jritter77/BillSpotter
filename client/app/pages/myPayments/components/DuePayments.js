import { Bubble } from "../../../components/Bubble";

const testBill = { bill_due_date: "01/01/01", bill_name: "test" };

/** Due Payments Component
 *
 * @returns {Bubble} - DuePayments Component
 */

const DuePayments = (bills) => {
  const container = $(`<div></div>`);

  for (let bill of bills) {
    container.append(dueBill(bill));
  }

  return Bubble("Next Due Payments", container).css(bubbleStyle);
};

/** Due Bill Component
 *
 * @param {Object} bill - bill for component
 * @returns {JQuery} - due bill element
 */

const dueBill = (bill) => {
  const row = $(`<div></div>`).css(dueBillStyle);
  const date = $(`<p></p>`).text(bill.bill_due_date);
  const title = $(`<p></p>`).text(bill.bill_name).css(titleStyle);
  const paidBtn = $(`<button>&#9745;</button>`).css(paidBtnStyle);

  paidBtn.click(() => {
    location.hash = "#editPayment/" + bill.bill_id;
  });

  row.append(date, title, paidBtn);

  return row;
};

const bubbleStyle = {
  "margin-top": "5%",
};

const dueBillStyle = {
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
  background: "black",
  color: "white",
  "border-radius": "25%",
};

export { DuePayments };
