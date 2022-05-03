const testBills = [
  {
    billName: "Rent",
    nextDue: "02/14/22",
    amtDue: 635,
    status: "Current",
    freq: "Monthly",
    type: "Home",
  },
  {
    billName: "PG&E",
    nextDue: "02/17/22",
    amtDue: 85,
    status: "Current",
    freq: "Monthly",
    type: "Home",
  },
  {
    billName: "Internet",
    nextDue: "02/23/22",
    amtDue: 100,
    status: "Current",
    freq: "Monthly",
    type: "Home",
  },
];

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
        <button>Delete Bill</button>
      </div>
    </div>
  </div>`);
};

const editBill = () => {
  location.hash = "edit_bill";
};

const toggleCollapse = (dropdown) => {
  for (let el of document.getElementsByClassName("contents")) {
    if (el !== dropdown[0].children[1]) {
      el.classList.remove("active");
    }
  }
  dropdown[0].children[1].classList.toggle("active");
};

const createBillDropdowns = (billArr) => {
  let bill_dropdowns = $("#bill_dropdowns");
  bill_dropdowns.html("");

  for (let bill of billArr) {
    let dropdown = BillDropdown(bill);
    dropdown[0].children[0].onclick = () => toggleCollapse(dropdown);
    dropdown.find(".editBillBtn").click(editBill);
    bill_dropdowns.append(dropdown);
  }
};

export { BillDropdown, createBillDropdowns, testBills };
