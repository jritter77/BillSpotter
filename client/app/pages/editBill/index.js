import { BackBtn } from "../../components/BackBtn.js";
import { Bubble } from "../../components/Bubble.js";
import { BillForm } from "./components/billForm.js";

const EditBill = () => {
  const APP = $("#app");
  APP.html(``);

  const heading = $(`<h1>Edit Bill</h1>`);
  const billForm = Bubble("Edit Bill", BillForm());
  const backBtn = BackBtn("#bills");

  APP.append(heading, billForm, backBtn);
};

export { EditBill };
