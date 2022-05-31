import { Login } from "./login.js";
import { initNav } from "./navigation.js";
import { initAllPages } from "./pageHandlers.js";
import { getBills, verifyUser } from "./requests.js";

let user = { user_id: 1, username: "admin", session_key: "1234" };

// Set window dimensions as constant to prevent soft keyboard from interfering with layout
setTimeout(() => {
  let viewHeight = window.visualViewport.height;
  let viewWidth = window.visualViewport.width;
  let viewport = document.querySelector("meta[name=viewport");
  viewport.setAttribute(
    "content",
    `height=${viewHeight}, width=${viewWidth}, initial-scale=1.0`
  );
}, 300);

async function startApp() {
  if (sessionStorage.getItem("user")) {
    await getBills();

    initNav();

    initAllPages();
  } else {
    $("#dashboard").hide();
    $("body").append(Login());
    initNav();
  }
}

startApp();
