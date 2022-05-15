const Alert = (text, confirmHandler) => {
  $("#confirmation_alert p")[0].innerHTML = text;

  $("#alert_container").toggleClass("active");

  $("#alert_confirm")
    .off("click")
    .click(() => {
      confirmHandler();
      $("#alert_container").toggleClass("active");
    });
};

export { Alert };
