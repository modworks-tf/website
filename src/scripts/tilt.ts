/**
 * Turns [data-tilt] elements a little towards the pointer while it is over
 * them, around their resting angle, the way laby.net's client page does.
 * data-tilt sets how far it turns sideways from rest, in degrees (it leans
 * back and forth two thirds of that). The offsets go into --tilt-dx and
 * --tilt-dy, which the element's transform adds to its resting --tilt-x and
 * --tilt-y (global.css); on leaving they ease back to nothing.
 *
 * The movement is small and only follows the pointer, so it plays with
 * reduced motion too; it is skipped on touch screens, which have no pointer
 * to follow.
 */
function setupTilt() {
  if (!matchMedia("(hover: hover)").matches) return;

  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
    if (el.dataset.tiltReady) return;
    el.dataset.tiltReady = "1";
    const range = Number(el.dataset.tilt) || 2;
    let frame = 0;

    el.addEventListener("pointermove", (event) => {
      const box = el.getBoundingClientRect();
      // -0.5 at the left or top edge, 0.5 at the right or bottom.
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--tilt-dy", `${(x * range * 2).toFixed(2)}deg`);
        el.style.setProperty("--tilt-dx", `${(-y * range * 1.4).toFixed(2)}deg`);
      });
    });

    el.addEventListener("pointerleave", () => {
      cancelAnimationFrame(frame);
      el.style.removeProperty("--tilt-dx");
      el.style.removeProperty("--tilt-dy");
    });
  });
}

document.addEventListener("astro:page-load", setupTilt);
