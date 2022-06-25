import { BackBtn } from "../../components/BackBtn.js";
import { Bills } from "../../utility/Bills.js";
import { Dropdowns } from "./components/dropdowns.js";

const MyBills = async () => {
  const APP = $("#app");
  APP.html(``);

  if (!sessionStorage.getItem("bills")) {
    await Bills.getBills();
  }

  const bills = Bills.parseBills();

  const heading = $(`<h1>Bills</h1>`);
  const dropdowns = Dropdowns(bills);

  const backBtn = BackBtn("#dashboard");

  APP.append(heading, dropdowns, backBtn);
};

export { MyBills };
