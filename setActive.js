function initializeButtons() {
  function setActive(frag) {
    frag = document.getElementById(frag);
    frag.classList.add("active");
  }

  const buttons = document.getElementsByTagName("button");

  for (let btn of buttons) {
    console.log(btn);
    btn.onclick = () => setActive(btn.value);
  }
}

export { initializeButtons };
