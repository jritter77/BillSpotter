const SignUpBtn = () => {
  const btn = $("<a href='../signup/'>Sign Up</a>").css(btnStyle);

  return btn;
};

const btnStyle = {
  display: "block",
  "text-decoration": "none",
  "font-size": "var(--lg-font-size)",
  padding: "5%",
  margin: "0% 10%",
  "margin-top": "10%",
  background: "black",
  color: "white",
  "border-radius": "var(--md-font-size)",
};

export { SignUpBtn };
