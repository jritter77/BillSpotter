import { BackBtn } from "../../components/BackBtn.js";
import { Bubble } from "../../components/Bubble.js";
import { Bills } from "../../utility/Bills.js";
import { BillForm } from "./components/billForm.js";

const EditBill = async () => {
  const APP = $("#app");
  APP.html(``);

  if (!sessionStorage.getItem("bills")) {
    await Bills.getBills();
  }

  const bills = Bills.parseBills();
  let bill;

  let bill_id = location.hash.split("/")[1];
  if (bill_id) {
    for (let b of bills) {
      if (b.bill_id === parseInt(bill_id)) {
        bill = b;
        break;
      }
    }
  }

  const heading = $(`<h1>Edit Bill</h1>`);
  const billForm = Bubble("Edit Bill", BillForm(bill));
  const backBtn = BackBtn("#bills");

  APP.append(heading, billForm, backBtn);
};

export { EditBill };
