import { Dialogue } from "../../../components/Dialogue.js";
import { Toast } from "../../../components/Toast.js";

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
const Dropdowns = () => {
  let bills = [testBill, testBill, testBill];
  let dropdowns = $("<div></div>").css(dropdownContainerStyle);

  for (let bill of bills) {
    dropdowns.append(dropdown(bill));
  }

  return dropdowns;
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

  let collapsible = $(`<div class='collapsible'></div>`).css(collapsibleStyle);

  let dueDateGroup = $("<div></div>").css(groupStyle);
  let dueDateHeader = $("<p>Next Due Date</p>").css(headerStyle);
  let dueDate = $("<p></p>").text(bill_due_date);

  let amtDueGroup = $("<div></div>").css(groupStyle);
  let amtDueHeader = $("<p>Amount Due</p>").css(headerStyle);
  let amtDue = $("<p></p>").text(bill_amt_due);

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
    heading,
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

  heading.click((e) => {
    collapsible.toggleClass("active");

    for (let c of [...$(".collapsible.active")]) {
      if (c !== collapsible[0]) {
        $(c).removeClass("active");
      }
    }
  });

  editBtn.click(() => {
    location.hash = "#editBill/" + bill_id;
  });

  deleteBtn.click(() => {
    const confirm = Dialogue(
      "Are you sure you want to delete this bill?",
      () => {
        //TODO: add call to delete bill
        Toast("Bill Deleted!");
        confirm.remove();
      }
    );
    $("body").prepend(confirm);
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
  "border-radius": "5vw",
  overflow: "hidden",

  background: "black",
  width: "80vw",
  margin: "2%",
};

const dueBillHeadingStyle = {
  background: "black",
  color: "white",
  margin: 0,
  padding: "5%",
  "font-size": "8vw",
};

const collapsibleStyle = {
  background: "white",
  "font-size": "5vw",
};

const btnStyle = {
  "font-size": "5vw",
  padding: "5%",
  margin: "5%",
  background: "black",
  color: "white",
  "border-radius": "10%",
};

const groupStyle = {
  "text-align": "center",
  flex: 1,
};

const headerStyle = {
  "text-decoration": "underline",
};

export { Dropdowns };
