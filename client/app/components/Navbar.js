/** Navbar Component
 *
 * Main navigation component used across all pages
 *
 * @returns {JQuery} - Navbar Element
 */
const Navbar = () => {
  const bar = $(`<nav style="${barStyle}"></nav>`);

  const logo = $(
    `<img style="${logoStyle}" src="../images/logo.svg" alt="Binoculars">`
  );

  const heading = $(`
    <a href="#dashboard" style="${headingStyle}">
      <span style="${spanStyle}">Bill</span>Spotter
    </a>
  `);

  const dropdownBtn = $(`
    <button style="${dropdownBtnStyle}">&#9776</button>
  `);

  const dropdownMenu = $(`
    <div style="${dropdownMenuStyle}" class="collapsible">
      <hr>
      <a style="${dropdownItemStyle}" href="#dashboard">Home</a>
      <a style="${dropdownItemStyle}" href="#bills">My&nbsp;Bills</a>
      <a style="${dropdownItemStyle}" href="#payments">My&nbsp;Payments</a>
      <a style="${dropdownItemStyle}" href="#summary">Month&nbsp;Summary</a>
      <hr>
      <a style="${dropdownItemStyle}" href="#faq">FAQ</a>
      <a style="${dropdownItemStyle}" href="#support">Support</a>
      <hr>
      <a style="${dropdownItemStyle}" href="#">Logout</a>
      <hr>
    </div>
  `);

  // set dropdown menu behavior
  dropdownBtn.click(() => {
    dropdownMenu.toggleClass("active");
  });

  $(window).on("hashchange", () => {
    dropdownMenu.removeClass("active");
  });

  dropdownMenu.find("a").click(() => dropdownMenu.removeClass("active"));

  // assemble components into bar
  bar.append(logo, heading, dropdownBtn, dropdownMenu);

  return bar;
};

const barStyle = `
  background: black;
  display: flex;
  padding: 2%;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;

const logoStyle = `
  width: 15vw;
`;

const headingStyle = `
  display: block;
  font-size: 10vw;
  color: white;
  text-align: center;
  text-decoration: underline;
`;

const spanStyle = `
  color: var(--main-bg-color);
  text-decoration: none;
`;

const dropdownBtnStyle = `
  border: 1vw solid white;
  border-radius: 15%;
  font-size: 7vw;
  min-width: 10vw;
  padding: 0 2%;
  color: white;
  background: black;
  
`;

const dropdownMenuStyle = `
  position: absolute;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 100%;
  right: 0;
  font-size: 7vw;
  padding: 0 16px;
`;

const dropdownItemStyle = `
  margin: 5%;
  color: black;
  text-decoration: none;
`;

export { Navbar };
