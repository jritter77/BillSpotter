// create blank calendar structure
function createCalendar() {
  let calendar = $('<div id="calendar"></div>');

  for (let r = 0; r < 5; r++) {
    let row = $('<div class="row"></div>');

    for (let c = 0; c < 7; c++) {
      row.append(
        $(`
        <div class="tooltip">
          <p class="calendar_day">
          </p>
          <span class="tooltip_text">This is a tooltip</span>
        </div>
      `)
      );
    }

    calendar.append(row);
  }

  return calendar;
}

// Set dates for the current month
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

// highlight all bills on calendar
function setCalendarBills(bills) {
  let days = $(".calendar_day");
  let date = new Date();

  for (let day of days) {
    let highlight;
    let tooltip = day.nextElementSibling;

    tooltip.innerHTML = "";

    for (let bill of bills) {
      if (day.innerHTML == parseInt(bill.nextDue.split("-")[2])) {
        if (bill.datePaid) {
          $(tooltip).append(`<p>${bill.billName}&nbsp;-&nbsp;Paid</p>`);
          if (!highlight) {
            highlight = "paid";
          }
          if ($(day).offset().left > window.innerWidth / 2) {
            tooltip.style.right = "30px";
          }
        } else {
          if (date.getDate() < parseInt(bill.nextDue.split("-")[2])) {
            if (highlight !== "pastDue") {
              highlight = "due";
            }
            $(tooltip).append(`<p>${bill.billName}&nbsp;-&nbsp;Due</p>`);
            if ($(day).offset().left > window.innerWidth / 2) {
              tooltip.style.right = "30px";
            }
          } else {
            highlight = "pastDue";
            $(tooltip).append(`<p>${bill.billName}&nbsp;-&nbsp;Past Due</p>`);
            if ($(day).offset().left > window.innerWidth / 2) {
              tooltip.style.right = "30px";
            }
          }
        }
      }
    }

    day.classList.add(highlight);
  }
}

export { createCalendar, setMonthDates, setCalendarBills };
