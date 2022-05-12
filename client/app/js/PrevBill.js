function PrevBill(bill) {
  let prevBill = $(`
      <div class="prevBill">
        <p>${bill.nextDue}</p>
        <p>${bill.billName}</p>
      </div>
    `);

  let remove = $('<button class="remove_paid_btn">&#9746</button>');

  prevBill.append(remove);

  remove.click(() => {
    $("#confirmation_alert p")[0].innerHTML = `
        Are you sure you would like to remove this payment?
      `;

    $("#alert_container").toggleClass("active");

    $("#alert_confirm")
      .off("click")
      .click(() => {
        $("#alert_container").toggleClass("active");
      });
  });

  return $("<div></div>").append(prevBill, "<hr>");
}

export { PrevBill };
