const PlaceHolder = (text) => {
  return $("<p></p>").html(text).css(placeHolderStyle);
};

const placeHolderStyle = {
  "font-size": "var(--md-font-size)",
  padding: "10%",
  "text-align": "center",
};

export { PlaceHolder };
