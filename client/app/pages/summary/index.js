import { BackBtn } from "../../components/BackBtn.js";
import { Bubble } from "../../components/Bubble.js";
import { Graph } from "./components/graph.js";
import { Totals } from "./components/totals.js";

const Summary = () => {
  const APP = $("#app");
  APP.html(`<h1>Summary</h1>`);

  let date = new Date();
  let graphHeader =
    date.toLocaleString("default", { month: "long" }) +
    " - " +
    date.getFullYear();
  let graph = Graph();
  let totals = Totals();
  let backBtn = BackBtn("#dashboard");

  APP.append(Bubble(graphHeader, graph), totals, backBtn);
};

export { Summary };
