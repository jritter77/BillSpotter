import { Bubble } from "./Bubble.js";

/**
 * Dialog Component
 *
 * Alerts user when they are about to make changes and asks for confirmation before proceeding.
 *
 * @param {String} dialogueText - Text to be displayed in dialogue.
 * @param {Function} confirmHandler - Handler function upon approval
 * @returns {JQuery} - Dialogue Element
 */
const Dialogue = (dialogueText, confirmHandler) => {
  const container = $("<div><div>").css(containerStyle);
  const content = $("<div></div>").css(contentStyle);
  const text = $("<p></p>").text(dialogueText).css(textStyle);

  const confirmBtn = $("<button>&#9745;</button>").css(btnStyle);
  const dismissBtn = $("<button>&#9746;</button>").css(btnStyle);

  confirmBtn.click(confirmHandler);

  dismissBtn.click(() => container.remove());

  container.click(() => container.remove());

  content.append(
    text,
    $('<div class="row"></div>').append(confirmBtn, dismissBtn)
  );

  let dialogue = Bubble("Confirmation Alert", content).css(dialogueStyle);

  container.append(dialogue);

  return container;
};

const containerStyle = {
  background: "rgba(0, 0, 0, 0.384)",
  "min-width": "100vw",
  "min-height": "100vh",
  position: "fixed",
  display: "flex",
  "flex-direction": "column",
  "align-items": "center",
  "z-index": 1,
};

const dialogueStyle = {
  "margin-top": "40%",
};

const textStyle = {
  "text-align": "center",
};

const contentStyle = {
  display: "flex",
  "flex-direction": "column",
  "justify-content": "space-around",
  padding: "5%",
  "min-height": "30vh",
};

const btnStyle = {
  padding: 0,
  margin: 0,
  width: "20%",
  "font-size": "10vw",
  "font-weight": "bold",
  background: "black",
  color: "white",
  "border-radius": "25%",
};

export { Dialogue };
