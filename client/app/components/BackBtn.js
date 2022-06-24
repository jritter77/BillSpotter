/**
 * Back Button Component
 *
 * Navigates user back one app level
 *
 * @param {String} loc - The hash location to navigate to.
 * @returns {Jquery} - The Back Button element
 */

const BackBtn = (loc) => {
  const btn = $("<button>Back</button>").css(btnStyle);

  btn.click((e) => {
    location.hash = loc;
  });

  return btn;
};

const btnStyle = {
  background: "black",
  "font-size": "8vw",
  color: "white",
  "border-radius": "25%",
  position: "fixed",
  bottom: "5vh",
  right: "5vw",
  padding: "5%",
  opacity: 0.5,
};

export { BackBtn };
