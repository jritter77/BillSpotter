import { Bubble } from "../app/components/Bubble";
import { SignupForm } from "./components/signupForm";

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

  $("#app").append(Bubble("Register New User", SignupForm()));
});
