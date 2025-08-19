// Modal functionality
document.addEventListener("astro:page-load", () => {
  // ...your existing code (tabs, toggles, indicator)...

  // ===== Modal logic (supports multiple modals) =====
  const openButtons = document.querySelectorAll("[data-open-modal]");
  const overlays = document.querySelectorAll("[data-modal-overlay]");

  function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return; // safe guard
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeModal(overlay) {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // Buttons that open modals
  openButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-open-modal");
      if (targetId) openModal(targetId);
    });
  });

  // Close on X and on backdrop click
  overlays.forEach(overlay => {
    // Close button
    const closeBtn = overlay.querySelector("[data-modal-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal(overlay));
    }
    // Click outside the modal container
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-overlay.is-open").forEach(closeModal);
    }
  });
});
