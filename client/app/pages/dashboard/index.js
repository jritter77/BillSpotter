import { Bubble } from "../../components/Bubble.js";
import { Toast } from "../../components/Toast.js";
import { Calendar } from "./components/calendar.js";
import { NextDue } from "./components/nextDue.js";
import { Shortcuts } from "./components/shortcuts.js";

const Dashboard = () => {
  const APP = $("#app");
  APP.html("");

  const heading = $(`<h1>Dashboard</h1>`);
  const cal = Bubble("Calendar", Calendar());
  const shortcuts = Shortcuts();
  const nextDue = NextDue();
  APP.append(heading, cal, shortcuts, nextDue);
};

export { Dashboard };
