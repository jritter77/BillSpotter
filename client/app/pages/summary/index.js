import { BackBtn } from "../../components/BackBtn.js";
import { Bubble } from "../../components/Bubble.js";
import { Bills } from "../../utility/Bills.js";
import { Graph } from "./components/graph.js";
import { Totals } from "./components/totals.js";

const Summary = async () => {
  const APP = $("#app");
  APP.html(`<h1>Summary</h1>`);

  if (!sessionStorage.getItem("bills")) {
    await Bills.getBills();
  }

  if (!sessionStorage.getItem("payments")) {
    await Bills.getPayments();
  }

  const bills = Bills.parseBills();
  const payments = Bills.parsePayments();

  let date = new Date();
  let graphHeader =
    date.toLocaleString("default", { month: "long" }) +
    " - " +
    date.getFullYear();
  let graph = Graph(bills, payments);
  let totals = Totals(bills, payments);
  let backBtn = BackBtn("#dashboard");

  APP.append(Bubble(graphHeader, graph), totals, backBtn);
};

export { Summary };
