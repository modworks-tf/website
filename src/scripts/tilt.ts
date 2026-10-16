/**
 * Turns [data-tilt] elements towards the pointer while it is over them: the
 * side under the pointer dips away, as if pressed. data-tilt="12" sets the
 * most it turns, in degrees (8 by default). The angles go into --tilt-x and
 * --tilt-y, which the element's transform reads (global.css). On leaving it
 * eases back to rest.
 */
function setupTilt() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!matchMedia("(hover: hover)").matches) return;

  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    if (el.dataset.tiltReady) return;
    el.dataset.tiltReady = "1";
    const max = Number(el.dataset.tilt) || 8;
    let frame = 0;
    let enteredAt = 0;

    // For a moment after the pointer arrives, the slow transition is kept, so
    // the element eases from its resting angle instead of snapping.
    el.addEventListener("pointerenter", () => {
      enteredAt = performance.now();
    });

    el.addEventListener("pointermove", (event) => {
      const box = el.getBoundingClientRect();
      // -0.5 at the left or top edge, 0.5 at the right or bottom.
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (performance.now() - enteredAt > 350) el.classList.add("is-tilting");
        el.style.setProperty("--tilt-y", `${(x * max * 2).toFixed(2)}deg`);
        el.style.setProperty("--tilt-x", `${(-y * max * 2).toFixed(2)}deg`);
      });
    });

    el.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      el.classList.remove("is-tilting");
      el.style.removeProperty("--tilt-x");
      el.style.removeProperty("--tilt-y");
    });
  });
}

document.addEventListener("astro:page-load", setupTilt);
