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
  $("#confirmation_alert p")[0].innerHTML = `
    Are you sure you would like to save these changes?
  `;

  $("#alert_container").toggleClass("active");

  $("#alert_confirm")
    .off("click")
    .click(() => {
      $("#alert_container").toggleClass("active");
    });
});

$("#alert_container").click((e) => {
  if (e.target === $("#alert_container")[0]) {
    $("#alert_container").toggleClass("active");
  }
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

$("#back_button").click(() => {
  history.back();
});

$('input[name="pay_date_paid"]').on("change", () => {
  $("#other_date").prop("disabled", !$("#other_date").prop("disabled"));
});

$('input[name="pay_amt_paid"]').on("change", () => {
  $("#other_amt").prop("disabled", !$("#other_amt").prop("disabled"));
});

$("#confirm_payment_btn").click((e) => {
  e.preventDefault();
  $("#toast").html("Payment Confirmed!").toggleClass("active");
  setTimeout(() => {
    $("#toast").toggleClass("active");
  }, 3000);
  history.back();
});
