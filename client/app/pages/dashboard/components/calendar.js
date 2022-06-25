const testBill = {
  bill_name: "test",
  bill_due_date: "2022-06-20",
  bill_amt_paid: null,
};

// Creates and returns Calendar element
const Calendar = () => {
  let cal = $(`<div style="${calStyle}"></div>`);

  let date = new Date();
  date.setDate(1);

  let days = createDays(cal);

  setDates(date, days);

  highlightBills(days);

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

// Highlights all bills for current month
//! Only deals with bills for the current month held in session storage!
function highlightBills(days) {
  let bills = [testBill];

  for (let day of days) {
    for (let bill of bills) {
      let date = bill.bill_due_date.split("-")[2];

      if (parseInt(day.text()) === parseInt(date)) {
        if (!bill.bill_amt_paid) {
          day.css("border", "2px solid black");
        } else {
          day.css({ background: "black", color: "white" });
        }
      }
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
`;

export { Calendar };
