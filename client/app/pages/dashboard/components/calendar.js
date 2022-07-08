import { Tooltip } from "../../../components/Tooltip.js";

const testBill = {
  bill_name: "test",
  bill_due_date: "2022-06-20",
  bill_amt_paid: null,
};

// Creates and returns Calendar element
const Calendar = (bills) => {
  let cal = $(`<div style="${calStyle}"></div>`);

  let date = new Date();
  date.setDate(1);

  let days = createDays(cal);

  setDates(date, days);

  setBills(days, bills);

  return cal;
};

// Creates all day elements
function createDays(cal) {
  let days = [];

  for (let r = 0; r < 5; r++) {
    let row = $(`<div style="${rowStyle}"></div>`);

    for (let c = 0; c < 7; c++) {
      let day = $(`<p style="${dayStyle}"></p>`);
      days.push(day);
      row.append(day);
    }

    cal.append(row);
  }

  return days;
}

// Sets all day elements to proper date
function setDates(date, days) {
  for (let i = date.getDay(); i < days.length; i++) {
    days[i].text(date.getDate());
    date.setDate(date.getDate() + 1);

    if (date.getDate() === 1) {
      return;
    }
  }
}

function getHighlightStyle(status) {
  if (status === "paid") {
    return { background: "black", color: "white" };
  } else if (status === "pastDue") {
    return { background: "red", color: "white" };
  } else if (status === "due") {
    return { border: "2px solid black" };
  }
}

// Highlights all bills for current month
function setBills(days, bills) {
  for (let day of days) {
    let tooltipContent = $("<div></div>");
    let status;

    for (let bill of bills) {
      let fullDate = bill.bill_due_date.split("-");
      let year = fullDate[0];
      let month = fullDate[1];
      let date = fullDate[2];

      let d = new Date();

      if (
        parseInt(year) !== d.getFullYear() ||
        parseInt(month) !== d.getMonth() + 1
      ) {
        continue;
      }

      if (parseInt(day.text()) === parseInt(date)) {
        if (!bill.bill_amt_paid) {
          if (d.getDate() > parseInt(date)) {
            tooltipContent.append(
              $("<p></p>").html(
                bill.bill_name.replace(" ", "&nbsp;") +
                  "&nbsp;-&nbsp;Past&nbsp;Due"
              )
            );
            status = "pastDue";
          } else {
            tooltipContent.append(
              $("<p></p>").html(
                bill.bill_name.replace(" ", "&nbsp;") + "&nbsp;-&nbsp;Due"
              )
            );
            if (status !== "pastDue") {
              status = "due";
            }
          }
        } else {
          tooltipContent.append(
            $("<p></p>").html(
              bill.bill_name.replace(" ", "&nbsp;") + "&nbsp;-&nbsp;Paid"
            )
          );
          if (status !== "pastDue" && status !== "due") {
            status = "paid";
          }
        }
      }
    }

    if (status) {
      day.css(getHighlightStyle(status));
    }

    if (tooltipContent.html()) {
      day.append(Tooltip(day, tooltipContent));
    }
  }
}

const calStyle = `
    padding: 5%;
`;

const rowStyle = `
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 5% 0;
`;

const dayStyle = `
    flex: 1;
    text-align: center;
    margin: 0;
    padding: 0;
    position: relative;
    font-size: var(--md-font-size);
`;

export { Calendar };
