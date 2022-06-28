const PlaceHolder = (text) => {
  return $("<p></p>").html(text).css(placeHolderStyle);
};

const placeHolderStyle = {
  "font-size": "5vw",
  padding: "10%",
  "text-align": "center",
};

export { PlaceHolder };
