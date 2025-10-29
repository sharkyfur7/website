// NEEDS to be deffered

const tooltip = document.createElement("div");
tooltip.id = "tooltip";
tooltip.innerHTML = "this is a tooltip";
tooltip.classList.add("big-screen-only");

const offset_px = 12;

function update(event) {
  // Always update position
  tooltip.style.setProperty("--tx", `${event.clientX + offset_px}px`);
  tooltip.style.setProperty("--ty", `${event.clientY + offset_px}px`);

  const target = document.elementFromPoint(event.clientX, event.clientY);
  let show_tooltip = false;

  if (target && target.getAttribute("data-tooltip")) {
    show_tooltip = true;
  } else {
    show_tooltip = false;
  }

  if (show_tooltip) {
    // No need for checking if attribute exists because
    // show_tooltip is only true when it does
    tooltip.innerHTML = target.getAttribute("data-tooltip");

    tooltip.style.opacity = 1;
  } else {
    tooltip.style.opacity = 0;
  }
}

// Attatch the tooltip
document.body.appendChild(tooltip);

// Listen to mouse move events
document.addEventListener("scroll", () => {
  tooltip.style.opacity = 0;
});

let ticking = false;
document.addEventListener("mousemove", (e) => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      update(e);
      ticking = false;
    });
    ticking = true;
  }
});
