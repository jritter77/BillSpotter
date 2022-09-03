import { About } from "./components/About.js";
import { Features } from "./components/Features.js";
import { SignUpBtn } from "./components/SignUpBtn.js";

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

  const features = Features();
  const about = About();
  const signUpBtn = SignUpBtn();
  const west = $("<div></div>").append(features, signUpBtn).css(westStyle);

  APP.append(west, about);
});

const westStyle = {
  margin: "5% 2%",
  "text-align": "center",
};
