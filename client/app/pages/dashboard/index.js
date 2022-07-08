import { Bubble } from "../../components/Bubble.js";
import { Bills } from "../../utility/Bills.js";
import { Calendar } from "./components/calendar.js";
import { NextDue } from "./components/nextDue.js";
import { Shortcuts } from "./components/shortcuts.js";

const Dashboard = async () => {
  const APP = $("#app");
  APP.html("");

  if (!sessionStorage.getItem("bills")) {
    await Bills.getBills();
  }

  if (!sessionStorage.getItem("payments")) {
    await Bills.getPayments();
  }

  const bills = Bills.parseBills();
  const payments = Bills.parsePayments();

  const heading = $(`<h1>Dashboard</h1>`);
  const cal = Bubble("Calendar", Calendar([...bills, ...payments]));
  const shortcuts = Shortcuts();
  const nextDue = NextDue(bills);
  const west = $("<div></div>").append(cal, shortcuts);

  APP.append(heading, west, nextDue);
};

export { Dashboard };
