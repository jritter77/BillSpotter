import { createBillDropdowns, testBills } from "./billDropdown.js";
import { createCalendar, setCalendarBills, setMonthDates } from "./Calendar.js";
import { DueBill } from "./DueBill.js";
import { initNav } from "./navigation.js";

// Initialize navigation

async function getBills() {
  sessionStorage.setItem("bills", JSON.stringify(testBills));
}

getBills();

initNav();

createBillDropdowns(testBills);

$("#new_bill_btn").click(() => (location.hash = "edit_bill"));

$("#save_changes_btn").click(() => {
  $("#alert_container").toggleClass("active");
});

$("#alert_container").click((e) => {
  if (e.target === $("#alert_container")[0]) {
    $("#alert_container").toggleClass("active");
  }
});

$("#alert_confirm").click(() => {
  alert("confirmed");
  $("#alert_container").toggleClass("active");
});

$("#alert_dismiss").click(() => {
  $("#alert_container").toggleClass("active");
});

$("#calendar_container").append(createCalendar());
setMonthDates();
setCalendarBills(testBills);

for (let bill of testBills) {
  if (!bill.datePaid) {
    $("#next_due_bills").append(DueBill(bill));
  }
}
