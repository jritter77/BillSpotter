import { Bills } from "../../../utility/Bills.js";

const testBill = {
  bill_id: 1,
  bill_name: "test",
  bill_due_date: "2022-06-20",
  bill_amt_due: 100,
  bill_freq: "Monthly",
  bill_type: "Home",
  bill_amt_paid: 70,
  bill_date_paid: null,
};

// Graph component
const Graph = (bills, payments) => {
  const container = $("<div></div>").css(containerStyle);
  const graph = $("<div></div>").css(graphStyle);
  const barContainer = $("<div></div>").css(barContainerStyle);
  const yAxis = $("<div></div>").css(yAxisStyle);
  const xAxis = $("<div></div>").css(xAxisStyle);
  const north = $('<div class="row"></div>').css(northStyle);

  const catTotals = Bills.getMonthTotals([...bills, ...payments]);

  const min = $("<p class='dollar'></p>").text(0).css({ margin: 0 });
  const max = $("<p class='dollar'></p>")
    .text(Math.ceil((Bills.getCatMax(catTotals) * 1.1) / 100) * 100)
    .css({ margin: 0 });

  container.append(
    north.append(yAxis.append(max, min), graph.append(barContainer)),
    xAxis
  );

  // Set up graph with scale bars
  for (let i = 0; i < 11; i++) {
    let scale = $("<hr>").css(scaleStyle);
    graph.append(scale);
  }

  for (let cat in catTotals) {
    xAxis.append($("<span></span>").text(cat).css(labelStyle));
    barContainer.append(
      barGroup([
        (catTotals[cat].total_due / max.text()) * 100,
        catTotals[cat].total_paid
          ? (catTotals[cat].total_paid / max.text()) * 100
          : 0,
      ])
    );
  }

  return container;
};

// values: [a,b,c,..]
const barGroup = (values) => {
  const barGroup = $("<div></div>").css(barGroupStyle);
  let color = "black";

  for (let val of values) {
    barGroup.append(bar(val).css("background", color));
    color = "red";
  }

  return barGroup;
};

const bar = (height) => {
  const bar = $("<div></div>").css(barStyle);

  bar.css("height", height + "%");

  return bar;
};

const containerStyle = {
  width: "100%",
  display: "flex",
  "flex-direction": "column",
  "justify-content": "space-between",
  "padding-top": "5%",
  margin: "0px 2%",
};
const graphStyle = {
  width: "100%",
  height: "30vh",
  display: "flex",
  "flex-direction": "column",
  "justify-content": "space-between",
  position: "relative",
  padding: "0 5%",
};
const yAxisStyle = {
  "font-size": "var(--sm-font-size)",
  "text-align": "center",
  display: "flex",
  "flex-direction": "column",
  "justify-content": "space-between",
  margin: "0 2%",
  "text-align": "right",
};
const xAxisStyle = {
  "margin-left": "10%",
  display: "flex",
  width: "90%",
  "justify-content": "space-around",
};
const barContainerStyle = {
  position: "absolute",
  width: "95%",
  height: "30vh",
  top: 0,
  left: 0,
  display: "flex",
  "padding-left": "2%",
};
const barGroupStyle = {
  display: "flex",
  flex: 1,
  height: "100%",
  "justify-content": "center",
  "align-items": "flex-end",
};
const barStyle = {
  background: "black",
  width: "20%",
  height: "50%",
};
const scaleStyle = {
  margin: 0,
  padding: 0,
  width: "100%",
};
const northStyle = {
  height: "100%",
};
const labelStyle = {
  "font-size": "var(--sm-font-size)",
  overflow: "hidden",
  "white-space": "nowrap",
  "text-overflow": "ellipsis",
  padding: "5%",
};

export { Graph };
