import { Bubble } from "../../../components/Bubble.js";
import { PlaceHolder } from "../../../components/PlaceHolder.js";

const testBill = { bill_due_date: "01/01/01", bill_name: "test" };

// Creates and returns extDue element
const NextDue = (bills) => {
  const container = $(`<div></div>`);

  let date = new Date();

  bills = bills.filter(
    (bill) => parseInt(bill.bill_due_date.split("-")[1]) === date.getMonth() + 1
  );

  if (!bills.length) {
    container.append(
      PlaceHolder(
        `You do not currently have any due payments to display for the current month.`
      )
    );
  }
  for (let bill of bills) {
    container.append(dueBill(bill));
  }

  return Bubble("Payments Due This Month", container).css(bubbleStyle);
};

// Creates and returns a dueBill element
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

const bubbleStyle = {};

const dueBillStyle = {
  display: "flex",
  "justify-content": "space-between",
  "align-items": "center",
  padding: "5%",
  "font-size": "var(--md-font-size)",
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
  "font-size": "var(--mg-font-size)",
  "font-weight": "bold",
  background: "black",
  color: "white",
  "border-radius": "25%",
};

export { NextDue };
