import { Bubble } from "../../../components/Bubble.js";
import { Dialogue } from "../../../components/Dialogue.js";
import { PlaceHolder } from "../../../components/PlaceHolder.js";
import { Toast } from "../../../components/Toast.js";
import { Bills } from "../../../utility/Bills.js";

const testBill = {
  bill_id: 1,
  bill_name: "test",
  bill_due_date: "2022-06-20",
  bill_amt_due: 100,
  bill_freq: "Monthly",
  bill_type: "Home",
};

/** Dropdowns Component
 *
 * @returns {JQuery} - Dropdowns element
 */
const Dropdowns = (bills) => {
  let dropdowns = $("<div></div>").css(dropdownContainerStyle);

  dropdowns.append(newBillBtn());

  if (!bills.length) {
    dropdowns.append(
      Bubble(
        "My Bills",
        PlaceHolder(
          `You do not currently have any bills to display.<br><br>Create a new bill using the "New Bill" button above.`
        )
      )
    );
  } else {
    for (let bill of bills) {
      dropdowns.append(dropdown(bill));
    }
  }

  return dropdowns;
};

const newBillBtn = () => {
  const btn = $("<div></div>").css(dropdownStyle).css("margin-bottom", "10%");
  const heading = $("<h1>New Bill</h1>").css(dueBillHeadingStyle);

  btn.click(() => {
    location.hash = "#editBill";
  });

  return btn.append(heading);
};

/** Dropdown Component
 *
 * @param {Object} bill - Bill for dropdown
 * @returns {JQuery} - dropdown element
 */
const dropdown = ({
  bill_id,
  bill_name,
  bill_due_date,
  bill_amt_due,
  bill_freq,
  bill_type,
}) => {
  let container = $("<div></div>").css(dropdownStyle);

  let heading = $("<h1></h1>").text(bill_name).css(dueBillHeadingStyle);
  let symbol = $("<p></p>").text("+").css(symbolStyle);
  let headerGroup = $("<div></div>").css(headerGroupStyle);

  let collapsible = $(`<div class='collapsible'></div>`).css(collapsibleStyle);

  let dueDateGroup = $("<div></div>").css(groupStyle);
  let dueDateHeader = $("<p>Next Due Date</p>").css(headerStyle);
  let dueDate = $("<p></p>").text(bill_due_date);

  let amtDueGroup = $("<div></div>").css(groupStyle);
  let amtDueHeader = $("<p>Amount Due</p>").css(headerStyle);
  let amtDue = $("<p class='dollar'></p>").text(bill_amt_due);

  let statusGroup = $("<div></div>").css(groupStyle);
  let statusHeader = $("<p>Status</p>").css(headerStyle);
  let status = $("<p></p>").text("Current");

  let freqGroup = $("<div></div>").css(groupStyle);
  let freqHeader = $("<p>Frequency</p>").css(headerStyle);
  let freq = $("<p></p>").text(bill_freq);

  let typeGroup = $("<div></div>").css(groupStyle);
  let typeHeader = $("<p>Type</p>").css(headerStyle);
  let type = $("<p></p>").text(bill_type);

  let editBtn = $("<button>Edit Bill</button>").css(btnStyle);
  let deleteBtn = $("<button>Delete Bill</button>").css(btnStyle);

  container.append(
    headerGroup.append(heading, symbol),
    collapsible.append(
      $('<div class="row"></div>').append(
        dueDateGroup.append(dueDateHeader, dueDate),
        amtDueGroup.append(amtDueHeader, amtDue)
      ),
      $('<div class="row"></div>').append(
        statusGroup.append(statusHeader, status),
        freqGroup.append(freqHeader, freq),
        typeGroup.append(typeHeader, type)
      ),
      $('<div class="row"></div>').append(editBtn, deleteBtn)
    )
  );

  headerGroup.click((e) => {
    collapsible.toggleClass("active");

    symbol.text(symbol.text() === "+" ? "-" : "+");

    for (let c of [...$(".collapsible.active")]) {
      if (c !== collapsible[0]) {
        $(c).removeClass("active").trigger("compress_dropdown");
      }
    }
  });

  editBtn.click(() => {
    location.hash = "#editBill/" + bill_id;
  });

  deleteBtn.click(() => {
    const confirm = Dialogue(
      "Are you sure you want to delete this bill?",
      async () => {
        await Bills.deleteBill({ bill_id: bill_id });
        Toast("Bill Deleted!");
        confirm.remove();
      }
    );
    $("body").prepend(confirm);
  });

  container.on("compress_dropdown", () => {
    symbol.text("+");
  });

  return container;
};

const dropdownContainerStyle = {
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
};

const dropdownStyle = {
  border: "4px solid black",
  "border-radius": "var(--md-font-size)",
  overflow: "hidden",
  background: "black",
  width: "80vw",
  "max-width": "720px",
  margin: "2%",
};

const dueBillHeadingStyle = {
  background: "black",
  color: "white",
  margin: 0,
  padding: "5%",
  "font-size": "var(--xl-font-size)",
};

const collapsibleStyle = {
  background: "white",
  "font-size": "var(--md-font-size)",
};

const btnStyle = {
  "font-size": "var(--md-font-size)",
  padding: "5%",
  margin: "5%",
  background: "black",
  color: "white",
  "border-radius": "var(--md-font-size)",
};

const groupStyle = {
  "text-align": "center",
  flex: 1,
};

const headerGroupStyle = {
  display: "flex",
  "justify-content": "space-between",
};

const headerStyle = {
  "text-decoration": "underline",
};

const symbolStyle = {
  "font-size": "var(--xxl-font-size)",
  color: "white",
  margin: 0,
  padding: "5%",
};

export { Dropdowns };
