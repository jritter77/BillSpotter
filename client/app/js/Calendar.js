function createCalendar() {
  let calendar = $('<div id="calendar"></div>');

  for (let r = 0; r < 5; r++) {
    let row = $('<div class="row"></div>');

    for (let c = 0; c < 7; c++) {
      row.append($('<p class="calendar_day"></p>'));
    }

    calendar.append(row);
  }

  return calendar;
}

function setMonthDates() {
  let date = new Date();
  date.setDate(1);

  let days = $(".calendar_day");

  for (let i = date.getDay(); i < days.length; i++) {
    days[i].innerHTML = date.getDate();
    date.setDate(date.getDate() + 1);

    if (date.getDate() === 1) {
      break;
    }
  }
}

function setCalendarBills(bills) {
  let days = $(".calendar_day");
  let date = new Date();

  for (let day of days) {
    for (let bill of bills) {
      if (day.innerHTML == parseInt(bill.nextDue.split("-")[2])) {
        if (bill.datePaid) {
          day.classList.add("paid");
        } else {
          if (date.getDate() < parseInt(bill.nextDue.split("-")[2])) {
            day.classList.add("due");
          } else {
            day.classList.add("pastDue");
          }
        }
      }
    }
  }
}

export { createCalendar, setMonthDates, setCalendarBills };
