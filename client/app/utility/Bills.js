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

  // Returns totals of all categories for the current month
  static getMonthTotals(bills) {
    let monthProjected = Bills.projectMonthBills(bills);

    let date = new Date();
    let month = date.getMonth() + 1;

    console.log(month);

    let monthBills = [];

    // filter bills to only include month bills
    for (let bill of bills) {
      console.log(bill.bill_due_date);
      if (parseInt(bill.bill_due_date.split("-")[1]) === month) {
        monthBills.push(bill);
      }
    }

    console.log(monthBills);

    // run filterered bills through getCatTotals and return result
    return Bills.getCatTotals([...monthBills, ...monthProjected]);
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

  // advances the bill_date by one cycle and returns the new bill
  static advanceBill(bill) {
    let date = new Date(bill.bill_due_date);

    let newBill = { ...bill };

    if (newBill.bill_freq === "Monthly") {
      date.setMonth(date.getMonth() + 1);
      date.setDate(date.getDate() + 1);
    } else if (newBill.bill_freq === "Weekly") {
      date.setDate(date.getDate() + 8);
    } else if (newBill.bill_freq === "Annually") {
      date.setFullYear(date.getFullYear() + 1);
    }

    newBill.bill_due_date = date.toLocaleDateString("en-CA").split(",")[0];
    newBill.bill_date_paid = null;
    newBill.bill_amt_paid = null;

    return newBill;
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

    let newBill = Bills.advanceBill(bill);

    let query = await Bills.queryBill({
      bill_name: newBill.bill_name,
    });

    console.log(query);

    if (!(query[query.length - 1].bill_id > bill.bill_id)) {
      await Bills.newBill(newBill);
    }

    await Bills.getBills();
    await Bills.getPayments();

    MyPayments();

    console.log(result);
  }

  // grabs information from payment_form and sends a request update the date paid and amt paid of bill
  static async queryBill(bill) {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let queryBill = {
      bill_id: null,
      bill_name: null,
      bill_freq: null,
      bill_type: null,
      bill_amt_due: null,
      bill_due_date: null,
      bill_date_paid: null,
      bill_amt_paid: null,
    };
    Object.assign(queryBill, bill);
    let endpoint = "../../server/bills/queryBill.php";
    let payload = { req: JSON.stringify({ user: user, bill: queryBill }) };

    let result = await $.post(endpoint, payload);

    return JSON.parse(result);
  }

  static projectMonthBills(bills) {
    let date = new Date();
    let month = date.getMonth + 1;

    let projected = [];

    for (let bill of bills) {
      let nextBill = Bills.advanceBill(bill);
      let nextBillMonth = parseInt(nextBill.bill_due_date.split("-")[1]);

      while (nextBillMonth <= month) {
        projected.push(nextBill);

        nextBill = Bills.advanceBill(bill);
        nextBillMonth = parseInt(nextBill.bill_due_date.split("-")[1]);
      }
    }

    return projected;
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
