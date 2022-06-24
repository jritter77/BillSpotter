/**
 * Bubble Component
 *
 * Floating container for most page elements.
 *
 * @param {String} heading - The heading text for Bubble
 * @param {JQuery} content - a JQuery element which holds the content of the bubble
 * @returns {JQuery} - Bubble Element
 */
const Bubble = (heading, content) => {
  let container = $(`<div style="${containerStyle}"></div>`);
  let head = $(`<h1 style="${headingStyle}">${heading}</h1>`);
  let cont = $(`<div style="${contentStyle}"></div>`);

  container.append(head, cont.append(content));

  return container;
};

const containerStyle = `
    width: 80%;
    background: black;
    padding: 5%;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    border-radius: 10%;
`;

const headingStyle = `
    color: white;
    font-size: 5vw;
    margin: 5%;
`;

const contentStyle = `
    background: white;
    font-size: 5vw;
    border-radius: 0 0 10% 10%;
`;

export { Bubble };
