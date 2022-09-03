import { Bubble } from "../../app/components/Bubble.js";

const Features = () => {
  const feats = [
    "Easily keep track of your bills and payments",
    "Month Sumary and Calendar",
    "No linking of accounts required",
    "Sign up is easy and anonymous",
  ];

  const list = $(`<ul></ul>`).css(listStyle);

  for (let f of feats) {
    let li = $("<li></li>").text(f).css(itemStyle);
    list.append(li);
  }

  const container = Bubble("Features", list).css(containerStyle);

  return container;
};

const containerStyle = { "text-align": "left" };
const listStyle = { margin: "5%" };
const itemStyle = { "margin-bottom": "2vh" };

export { Features };
