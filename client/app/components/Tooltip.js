const Tooltip = (triggerElement, content) => {
  const tooltip = $("<div></div>").append(content).css(tooltipStyle);

  triggerElement.hover(() => {
    tooltip.toggle();

    if (triggerElement.position().left > $(window).width() / 2) {
      tooltip.css({ right: 0 });
    } else {
      tooltip.css({ left: 0 });
    }
  });

  tooltip.hide();

  return tooltip;
};

const tooltipStyle = {
  position: "absolute",
  top: "100%",
  color: "black",
  background: "white",
  border: "2px solid black",
  padding: "2vw",
  "z-index": 1,
  "font-size": "var(--sm-font-size)",
};

export { Tooltip };
