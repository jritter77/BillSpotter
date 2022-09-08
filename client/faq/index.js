import { FaqEntry } from "./components/FaqEntry";


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

  const APP = $("#app");

  const faq = FaqEntry('Is this an FAQ?', 'Yes<br>it<br>is!');
  const faq2 = FaqEntry('Is this a super long title or what?', 'Yes<br>it<br>is!');

  APP.append(faq, faq2);
});


