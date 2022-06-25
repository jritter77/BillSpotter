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

  const bills = Bills.parseBills();

  const heading = $(`<h1>Dashboard</h1>`);
  const cal = Bubble("Calendar", Calendar());
  const shortcuts = Shortcuts();
  const nextDue = NextDue(bills);
  APP.append(heading, cal, shortcuts, nextDue);
};

export { Dashboard };
