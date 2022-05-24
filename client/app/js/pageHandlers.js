import { Alert } from "./Alert.js";
import { createBillDropdowns } from "./BillDropdown.js";
import { createCalendar, setCalendarBills, setMonthDates } from "./Calendar.js";
import { DueBill } from "./DueBill.js";
import { Graph } from "./Graph.js";
import { PrevBill } from "./PrevBill.js";
import { confirmPaid, editBill, newBill } from "./requests.js";

// initialize dashboard handlers and elements
function init_dashboard() {
  try {
    let bills = JSON.parse(sessionStorage.getItem("bills"));

    // Create calendar
    $("#calendar_container").append(createCalendar());
    setMonthDates();

    setCalendarBills(bills);
  } catch (error) {
    console.error(error);
  }
}

// initialize myBills handlers and elements
function init_myBills() {
  createBillDropdowns(JSON.parse(sessionStorage.getItem("bills")));
  $("#new_bill_btn").click(() => (location.hash = "edit_bill"));
}

// initialize paymentDetails handlers and elements
function init_paymentDetails() {
  $('input[name="pay_date_paid"]').on("change", () => {
    $("#other_date").prop("disabled", !$("#other_date").prop("disabled"));
  });

  $('input[name="pay_amt_paid"]').on("change", () => {
    $("#other_amt").prop("disabled", !$("#other_amt").prop("disabled"));
  });
}

// initialize summary handlers and elements
function init_summary() {
  Graph(JSON.parse(sessionStorage.getItem("bills")));
}

// initialize common handlers and elements
function init_common() {
  $("#alert_container").click((e) => {
    if (e.target === $("#alert_container")[0]) {
      $("#alert_container").toggleClass("active");
    }
  });

  $("#alert_dismiss").click(() => {
    $("#alert_container").toggleClass("active");
  });

  $("#back_button").click(() => {
    history.back();
  });
}

// initialize all pages
function initAllPages() {
  init_common();
  init_dashboard();
  init_myBills();
  init_paymentDetails();
  init_summary();
}

// update editBill page
function updateEditBill(bill_id) {
  let bills = JSON.parse(sessionStorage.getItem("bills"));

  if (bill_id) {
    for (let bill of bills) {
      if (bill.bill_id === parseInt(bill_id)) {
        $("#bill_name").val(bill.bill_name);
        $("#bill_type")[0].value = bill.bill_type;
        $("#bill_freq")[0].value = bill.bill_freq;
        $("#bill_due_date").val(bill.bill_due_date);
        $("#bill_amt_due").val(bill.bill_amt_due);
      }
    }

    $("#save_changes_btn")
      .off()
      .click(() => {
        Alert(`Are you sure you would like to save these changes?`, () =>
          editBill(bill_id)
        );
      });
  } else {
    $("#save_changes_btn")
      .off()
      .click(() => {
        Alert(`Create new bill?`, newBill);
      });
  }
}

// update paymentDetails page
function updatePaymentDetails(bill_id) {
  let bills = JSON.parse(sessionStorage.getItem("bills"));

  if (!bill_id) {
    location.hash = "#home";
  } else {
    for (let bill of bills) {
      if (bill.bill_id === parseInt(bill_id)) {
        $("#pay_bill_name").html(bill.bill_name);
        $("#pay_type").html(bill.bill_type);
        $("#pay_date_due").html(bill.bill_due_date);
        $("#pay_amt_due").html(bill.bill_amt_due);
      }
    }

    $("#confirm_payment_btn")
      .off()
      .click((e) => {
        e.preventDefault();
        Alert(`Confirm this bill as paid?`, () => {
          confirmPaid(bill_id);

          $("#toast").html("Payment Confirmed!").toggleClass("active");
          setTimeout(() => {
            $("#toast").toggleClass("active");
          }, 3000);
        });
      });
  }
}

// update dashboard page
function updateDashboard() {
  let bills = JSON.parse(sessionStorage.getItem("bills"));

  setCalendarBills(bills);

  $("#next_due_bills").html("");

  // set nextDue bills
  for (let bill of bills) {
    if (!bill.bill_date_paid) {
      $("#next_due_bills").append(DueBill(bill));
    }
  }
}

// update summary page
function updateSummary() {
  Graph(JSON.parse(sessionStorage.getItem("bills")));
}

// update myBills page
function updateMyBills() {
  createBillDropdowns(JSON.parse(sessionStorage.getItem("bills")));
}

// initialize payments handlers and elements
function updatePayments() {
  let bills = JSON.parse(sessionStorage.getItem("bills"));

  $("#due_payments").html("");
  $("#prev_payments").html("");

  for (let bill of bills) {
    if (!bill.bill_date_paid) {
      $("#due_payments").append(DueBill(bill));
    } else {
      $("#prev_payments").append(PrevBill(bill));
    }
  }
}

function updateAllPages() {
  updateDashboard();
  updateSummary();
  updateMyBills();
  updatePayments();
}

export {
  initAllPages,
  updateEditBill,
  updatePaymentDetails,
  updateDashboard,
  updateSummary,
  updateMyBills,
  updatePayments,
  updateAllPages,
};
