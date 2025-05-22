// NEEDS to be deffered

const tooltip = document.createElement("div");
tooltip.id = "tooltip";
tooltip.innerHTML = "this is a tooltip";
tooltip.classList.add("big-screen-only");

const offset_px = 12;

// Attatch the tooltip
document.body.appendChild(tooltip);

// Listen to mouse move events
document.addEventListener(
  "mousemove",
  (event) => {
    tooltip.style.top = `${event.clientY + offset_px}px`;
    tooltip.style.left = `${event.clientX + offset_px}px`;

    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target && target.getAttribute("data-tooltip")) {
      tooltip.style.opacity = 1;

      if (target.getAttribute("data-tooltip")) {
        tooltip.innerHTML = target.getAttribute("data-tooltip");
      } else {
        tooltip.innerHTML =
          "This element does not have the <code>data-tooltip</code> attribute";
      }
    } else {
      tooltip.style.opacity = 0;
    }
  },
  { passive: true }
);
