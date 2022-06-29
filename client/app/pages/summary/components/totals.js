import { Bubble } from "../../../components/Bubble.js";
import { Bills } from "../../../utility/Bills.js";

const testBill = {
  bill_id: 1,
  bill_name: "test",
  bill_due_date: "2022-06-20",
  bill_amt_due: 100,
  bill_freq: "Monthly",
  bill_type: "Home",
  bill_amt_paid: 70,
  bill_date_paid: null,
};

const Totals = (bills, payments) => {
  const container = $("<div></div>");

  const catTotals = Bills.getMonthTotals([...bills, ...payments]);

  let totalDue = 0;
  let toatalPaid = 0;

  container.append(
    catRow("Category", "Due", "Paid").css("font-weight", "bold")
  );

  for (let cat in catTotals) {
    container.append(
      catRow(cat, catTotals[cat].total_due, catTotals[cat].total_paid)
    );
    totalDue += catTotals[cat].total_due;
    toatalPaid += catTotals[cat].total_paid;
  }
  container.append($("<hr>"));

  container.append(
    catRow("TOTAL", totalDue, toatalPaid).css("font-weight", "bold")
  );

  return Bubble("Category Totals", container).css("margin-top", "5%");
};

const catRow = (catName, due, paid) => {
  const row = $('<div class="row"></div>').css(catRowStyle);

  row.append(catCol(catName), catCol(due), catCol(paid));

  return row;
};

const catCol = (text) => {
  return $("<p></p>").text(text).css(catColStyle);
};

const catRowStyle = {};
const catColStyle = {
  flex: 1,
  "text-align": "center",
};

export { Totals };
