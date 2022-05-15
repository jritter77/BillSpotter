import { Alert } from "./Alert.js";
import { createBillDropdowns, testBills } from "./BillDropdown.js";
import { createCalendar, setCalendarBills, setMonthDates } from "./Calendar.js";
import { DueBill } from "./DueBill.js";
import { Graph } from "./Graph.js";
import { PrevBill } from "./PrevBill.js";

// initialize dashboard handlers and elements
function init_dashboard() {
  // Create calendar
  $("#calendar_container").append(createCalendar());
  setMonthDates();
  setCalendarBills(testBills);

  // set nextDue bills
  for (let bill of testBills) {
    if (!bill.datePaid) {
      $("#next_due_bills").append(DueBill(bill));
    }
  }
}

// initialize editBill handlers and elements
function init_editBill() {
  // set onclick handler of saveChanges button
  $("#save_changes_btn").click(() => {
    Alert(`Are you sure you would like to save these changes?`, () =>
      console.log("confirmed")
    );
  });
}

// initialize myBills handlers and elements
function init_myBills() {
  createBillDropdowns(testBills);
  $("#new_bill_btn").click(() => (location.hash = "edit_bill"));
}

// initialize payments handlers and elements
function init_payments() {
  for (let bill of testBills) {
    if (!bill.datePaid) {
      $("#due_payments").append(DueBill(bill));
    } else {
      $("#prev_payments").append(PrevBill(bill));
    }
  }
}

// initialize paymentDetails handlers and elements
function init_paymentDetails() {
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
}

// initialize summary handlers and elements
function init_summary() {
  Graph(testBills);
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
  init_editBill();
  init_payments();
  init_paymentDetails();
  init_summary();
}

// update editBill page
function updateEditBill(billName) {
  let bills = JSON.parse(sessionStorage.getItem("bills"));

  if (billName) {
    for (let bill of bills) {
      console.log(bill.billName, billName);

      if (bill.billName === billName.replace("_", " ")) {
        $("#bill_name").val(bill.billName);
        $("#bill_type")[0].value = bill.type;
        $("#bill_freq")[0].value = bill.freq;
        $("#bill_date_due").val(bill.nextDue);
        $("#bill_amt_due").val(bill.amtDue);
      }
    }
  }
}

// update paymentDetails page
function updatePaymentDetails(billName) {
  let bills = JSON.parse(sessionStorage.getItem("bills"));

  if (!billName) {
    location.hash = "#home";
  } else {
    for (let bill of bills) {
      if (bill.billName === billName) {
        $("#pay_bill_name").html(bill.billName);
        $("#pay_type").html(bill.type);
        $("#pay_date_due").html(bill.freq);
        $("#pay_amt_due").html(bill.nextDue);
        $("#bill_date_paid").html(bill.datePaid);
        $("#bill_amt_paid").html(bill.datePaid);
      }
    }
  }
}

// update summary page
function updateSummary() {
  Graph(testBills);
}

// update myBills page
function updateMyBills() {
  createBillDropdowns(testBills);
}

export {
  initAllPages,
  updateEditBill,
  updatePaymentDetails,
  updateSummary,
  updateMyBills,
};
