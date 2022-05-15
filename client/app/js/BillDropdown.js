import { Alert } from "./Alert.js";

const testBills = [
  {
    billName: "Rent",
    nextDue: "2022-02-01",
    amtDue: 635,
    status: "current",
    freq: "monthly",
    type: "home",
    datePaid: null,
  },
  {
    billName: "PG&E",
    nextDue: "2022-02-24",
    amtDue: 85,
    status: "current",
    freq: "monthly",
    type: "home",
    datePaid: "2022-02-24",
  },
  {
    billName: "Car Payment",
    nextDue: "2022-02-13",
    amtDue: 100,
    status: "current",
    freq: "weekly",
    type: "auto",
    datePaid: null,
  },
];

// create billDropdown element
const BillDropdown = ({ billName, nextDue, amtDue, status, freq, type }) => {
  return $(`
    <div class="dropdown">
    <h2>${billName}</h2>
    <div class="contents">
      <div class="row">
        <div class="col">
          <h3>Next Due Date</h3>
          <p>${nextDue}</p>
        </div>
        <div class="col">
          <h3>Amount Due</h3>
          <p>$${amtDue}.00</p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h3>Status</h3>
          <p>${status}</p>
        </div>
        <div class="col">
          <h3>Frequency</h3>
          <p>${freq}</p>
        </div>
        <div class="col">
          <h3>Type</h3>
          <p>${type}</p>
        </div>
      </div>
      <div class="row">
        <button class="editBillBtn">Edit Bill</button>
        <button class="deleteBillBtn">Delete Bill</button>
      </div>
    </div>
  </div>`);
};

// edit bill handler
const editBill = (billName) => {
  location.hash = "edit_bill?bill=" + billName.replace(" ", "_");
};

// delete bill handler
const deleteBill = () => {
  Alert(`Are you sure you would like to delete this bill?`, () =>
    console.log("confirmed")
  );
};

// dropdown collapse toggle handler
const toggleCollapse = (dropdown) => {
  for (let el of document.getElementsByClassName("contents")) {
    if (el !== dropdown[0].children[1]) {
      el.classList.remove("active");
    }
  }
  dropdown[0].children[1].classList.toggle("active");
};

// create and append all dropdowns for current bills
const createBillDropdowns = (billArr) => {
  let bill_dropdowns = $("#bill_dropdowns");
  bill_dropdowns.html("");

  for (let bill of billArr) {
    let dropdown = BillDropdown(bill);
    dropdown[0].children[0].onclick = () => toggleCollapse(dropdown);
    dropdown.find(".editBillBtn").click(() => editBill(bill.billName));
    dropdown.find(".deleteBillBtn").click(deleteBill);
    bill_dropdowns.append(dropdown);
  }
};

export { BillDropdown, createBillDropdowns, testBills };