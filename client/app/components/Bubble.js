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
    width: 80vw;
    max-width: 512px;
    background: black;
    padding: var(--md-font-size);
    padding-top: 0;
    display: flex;
    flex-direction: column;
    border-radius: var(--md-font-size);
    margin-bottom: 5%;
`;

const headingStyle = `
    color: white;
    font-size: var(--md-font-size);
    margin: 5%;
`;

const contentStyle = `
    background: white;
    font-size: var(--md-font-size);
    border-radius: 0 0 var(--md-font-size) var(--md-font-size);
`;

export { Bubble };
