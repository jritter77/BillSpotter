import { BackBtn } from "../../components/BackBtn.js";
import { Dropdowns } from "./components/dropdowns.js";

const MyBills = () => {
  const APP = $("#app");
  APP.html(``);

  const heading = $(`<h1>Bills</h1>`);
  const dropdowns = Dropdowns();

  const backBtn = BackBtn("#dashboard");

  APP.append(heading, dropdowns, backBtn);
};

export { MyBills };
