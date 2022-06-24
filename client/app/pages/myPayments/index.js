import { BackBtn } from "../../components/BackBtn.js";
import { DuePayments } from "./components/DuePayments.js";
import { PreviousPayments } from "./components/PreviousPayments.js";

const MyPayments = () => {
  const APP = $("#app");

  APP.html(`
          <h1>My Payments</h1>
  `);

  const duePayments = DuePayments();
  const previousPayments = PreviousPayments();
  const backBtn = BackBtn("#dashboard");

  APP.append(duePayments, previousPayments, backBtn);
};

export { MyPayments };
