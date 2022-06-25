import { MyBills } from "../pages/myBills/index.js";
import { MyPayments } from "../pages/myPayments/index.js";

class Bills {
  // return totals object from current bills
  static getCatTotals(bills) {
    let cats = {};

    for (let bill of bills) {
      if (cats[bill.bill_type]) {
        cats[bill.bill_type].total_due += bill.bill_amt_due;
        if (bill.bill_amt_paid) {
          cats[bill.bill_type].total_paid += bill.bill_amt_paid;
        }
      } else {
        cats[bill.bill_type] = {
          total_due: bill.bill_amt_due,
          total_paid: bill.bill_amt_paid ? bill.bill_amt_due : 0,
        };
      }
    }

    return cats;
  }

  // return max of categories
  static getCatMax(totals) {
    let max = 0;
    for (let type in totals) {
      if (totals[type].total_due > max) {
        max = totals[type].total_due;
      }
    }
    return max;
  }

  // fetches bill from server and saves them in session storage for app use
  static async getBills() {
    try {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let endpoint = "../../server/bills/getBills.php";
      let payload = { req: JSON.stringify({ user: user }) };

      let result = await $.get(endpoint, payload);
      sessionStorage.setItem("bills", result);
    } catch (error) {
      console.error(error);
    }
  }

  static async getPayments() {
    try {
      let user = JSON.parse(sessionStorage.getItem("user"));
      let endpoint = "../../server/bills/getPayments.php";
      let payload = { req: JSON.stringify({ user: user }) };

      let result = await $.get(endpoint, payload);
      sessionStorage.setItem("payments", result);
    } catch (error) {
      console.error(error);
    }
  }

  static parseBills() {
    return JSON.parse(sessionStorage.getItem("bills"));
  }

  static parsePayments() {
    return JSON.parse(sessionStorage.getItem("payments"));
  }

  // grabs input from edit_bill_form and sends a request to create a new bill in the db
  static async newBill(bill) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let endpoint = "../../server/bills/newBill.php";
    let payload = { req: JSON.stringify({ user: user, bill: bill }) };

    let result = await $.post(endpoint, payload);
    await Bills.getBills();

    console.log(result);
  }

  // grabs input from edit_bill_form and sends a request to update bill in db
  static async editBill(bill_id, bill) {
    bill.bill_id = bill_id;

    let user = JSON.parse(sessionStorage.getItem("user"));
    let endpoint = "../../server/bills/editBill.php";
    let payload = { req: JSON.stringify({ user: user, bill: bill }) };

    let result = await $.post(endpoint, payload);
    await Bills.getBills();

    console.log(result);
  }

  // deletes entire row of specified bill
  static async deleteBill(bill) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let endpoint = "../../server/bills/deleteBill.php";
    let payload = { req: JSON.stringify({ user: user, bill: bill }) };

    let result = await $.post(endpoint, payload);
    await Bills.getBills();

    MyBills();

    console.log(result);
  }

  // grabs information from payment_form and sends a request update the date paid and amt paid of bill
  static async confirmPaid(bill) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let endpoint = "../../server/bills/confirmPaid.php";
    let payload = { req: JSON.stringify({ user: user, bill: bill }) };

    let result = await $.post(endpoint, payload);
    await Bills.getBills();
    await Bills.getPayments();

    MyPayments();

    console.log(result);
  }

  // sets the date paid and amt paid of bill to NULL
  static async deletePayment(bill) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let endpoint = "../../server/bills/deletePayment.php";
    let payload = { req: JSON.stringify({ user: user, bill: bill }) };

    let result = await $.post(endpoint, payload);
    await Bills.getBills();
    await Bills.getPayments();

    MyPayments();

    console.log(result);
  }
}

export { Bills };
