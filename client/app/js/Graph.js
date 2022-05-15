// create graph and set summary values
const Graph = (bills) => {
  // grab necessary elements
  let yAxis = $('<div id="graph_y"></div>');
  let xAxis = $('<div id="graph_x"></div>');
  let graph = $("<div id='graph'></div>");
  let cols = $('<div id="column_container"></div>');

  // get bill stats
  let catTotals = getCatTotals(bills);
  let catMax = getCatMax(catTotals);
  let yMax = Math.ceil(catMax / 100) * 100;

  // display summary values
  displayCats(catTotals);
  displayTotals(catTotals);

  // set y-axis numbers
  yAxis.append($(`<p>${yMax}</p>`), $("<p>0</p>"));

  // create graph bars and labels
  for (let cat in catTotals) {
    let group = $(`<div class="col_group"></div>`);
    let due = $('<div class="graph_col_primary"></div>');
    let paid = $('<div class="graph_col_secondary"></div>');

    due.css("height", (catTotals[cat].total_due / yMax) * 100 + "%");
    paid.css("height", (catTotals[cat].total_paid / yMax) * 100 + "%");

    group.append(due, paid);

    cols.append(group);

    xAxis.append(`<p>${cat}</p>`);
  }

  // append bars to graph
  graph.append(cols);

  // set background bars
  for (let i = 0; i < 11; i++) {
    graph.append($("<hr>"));
  }

  // clear and append graph
  $("#graph_container > div").html("");
  $("#graph_container > div").append(
    yAxis,
    $("<div id='graph_east'></div>").append(graph, xAxis)
  );
};

// return totals object from current bills
function getCatTotals(bills) {
  let cats = {};

  for (let bill of bills) {
    if (cats[bill.type]) {
      cats[bill.type].total_due += bill.amtDue;
      if (bill.datePaid) {
        cats[bill.type].total_paid += bill.amtDue;
      }
    } else {
      cats[bill.type] = {
        total_due: bill.amtDue,
        total_paid: bill.datePaid ? bill.amtDue : 0,
      };
    }
  }

  return cats;
}

// return max of categories
function getCatMax(totals) {
  let max = 0;
  for (let type in totals) {
    if (totals[type].total_due > max) {
      max = totals[type].total_due;
    }
  }
  return max;
}

// display category breakdown
function displayCats(totals) {
  let cat_container = $("#categories_container > div");

  cat_container.html("");

  for (let cat in totals) {
    cat_container.append(`
      <p>${cat}: ${totals[cat].total_paid}/${totals[cat].total_due}</p>
    `);
  }
}

// display totals breakdown
function displayTotals(totals) {
  let due_container = $("#total_due > div");
  let paid_container = $("#total_paid > div");
  let totalDue = 0;
  let totalPaid = 0;

  for (let cat in totals) {
    totalDue += totals[cat].total_due;
    totalPaid += totals[cat].total_paid;
  }

  due_container.html(`<p>${totalDue}</p>`);
  paid_container.html(`<p>${totalPaid}</p>`);
}

export { Graph };
