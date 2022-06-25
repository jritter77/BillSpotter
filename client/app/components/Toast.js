/** Toast Component
 *
 * Used to dispay non-invasive feedback
 *
 * @param {String} message - Message o be displayed in toast
 */
const Toast = (message) => {
  const toast = $(`
        <p style="${toastStyle}">${message}</p>
    `);

  toast.insertAfter($("header"));

  setTimeout(() => {
    toast.slideUp("slow", () => toast.remove());
  }, 3000);
};

const toastStyle = `
    background: black;
    color: white;
    margin: 0;
    font-size: 5vw;
    width: 100vw;
    position: sticky;
    top: 0;
`;

export { Toast };
