const Shortcuts = () => {
  const container = $(`<div style="${containerStyle}"></div>`);

  container.append(billsBtn());
  container.append(paymentsBtn());
  container.append(summaryBtn());

  return container;
};

const billsBtn = () => {
  const btn = $(`<button style="${btnStyle}"></button>`);
  const img = $(`<img src="../images/bills_icon.svg" style="${imgStyle}">`);
  const text = $(`<p style="${textStyle}">Bills</p>`);

  btn.append(img, text);

  btn.click(() => (location.hash = "#bills"));

  return btn;
};

const paymentsBtn = () => {
  const btn = $(`<button style="${btnStyle}"></button>`);
  const img = $(`<img src="../images/payments_icon.svg" style="${imgStyle}">`);
  const text = $(`<p style="${textStyle}">Payments</p>`);

  btn.append(img, text);

  btn.click(() => (location.hash = "#payments"));

  return btn;
};

const summaryBtn = () => {
  const btn = $(`<button style="${btnStyle}"></button>`);
  const img = $(`<img src="../images/summary_icon.svg" style="${imgStyle}">`);
  const text = $(`<p style="${textStyle}">Summary</p>`);

  btn.append(img, text);

  btn.click(() => (location.hash = "#summary"));

  return btn;
};

const containerStyle = `
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 640px;
    margin: 5% 0;
`;

const btnStyle = `
    background: black;
    color: white;
    font-size: var(--sm-font-size);
    border-radius: 25%;
    width: 25vw;
    max-width: 180px;
    height: 25vw;
    max-height: 180px;
    padding: 2%;
`;

const imgStyle = `
    width: 80%;
`;

const textStyle = `
  margin: 0;
  font-size: var(--sm-font-size);
`;

export { Shortcuts };
