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
}

export { Bills };
