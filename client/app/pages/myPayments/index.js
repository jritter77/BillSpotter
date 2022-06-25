import { BackBtn } from "../../components/BackBtn.js";
import { Bills } from "../../utility/Bills.js";
import { DuePayments } from "./components/DuePayments.js";
import { PreviousPayments } from "./components/PreviousPayments.js";

const MyPayments = async () => {
  const APP = $("#app");

  APP.html(`
          <h1>My Payments</h1>
  `);

  if (!sessionStorage.getItem("bills")) {
    await Bills.getBills();
  }

  if (!sessionStorage.getItem("payments")) {
    await Bills.getPayments();
  }

  const bills = Bills.parseBills();
  const payments = Bills.parsePayments();

  const duePayments = DuePayments(bills);
  const previousPayments = PreviousPayments(payments);
  const backBtn = BackBtn("#dashboard");

  APP.append(duePayments, previousPayments, backBtn);
};

export { MyPayments };
