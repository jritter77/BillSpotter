$(window).ready(() => {
  // set dropdown menu behavior
  $(".navDropdownBtn").click(() => {
    $(".navDropdownMenu").toggleClass("active");
  });

  $(window).on("hashchange", () => {
    $(".navDropdownMenu").removeClass("active");
  });

  $(".navDropdownMenu")
    .find("a")
    .click(() => $(".navDropdownMenu").removeClass("active"));
});
