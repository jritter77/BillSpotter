import { Bubble } from "../../app/components/Bubble.js";

const About = () => {
  let info = `
    Bill Spotter is a simple and easy to use 
    web-app designed to make keeping track of bills a breeze!
    <br>
    <br>
    Bill Spotter works like a smart-checklist,
    allowing you to enter your bills once and 
    then, upon confirming a bill has been a paid, 
    a new bill will automatically be generated for 
    the next occurrence!
    <br>
    <br>
    Bill Spotter was designed with ease of use 
    and anonymity in mind. Therefore it does not 
    require any sensitive information or linking of 
    other accounts, a username and password 
    is all that is needed to start!
    <br>
    <br>
    What are you waiting for? Start keeping track 
    of your bills today!
  `;

  let p = $("<p></p>").html(info).css(pStyle);

  let container = Bubble("About", p).css(containerStyle);

  return container;
};

const containerStyle = { margin: "5%" };
const pStyle = { margin: "5%" };

export { About };
