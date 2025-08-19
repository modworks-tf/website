document.addEventListener("astro:page-load", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  const toggles = document.querySelectorAll(".switch input");

  // Load saved toggle states from localStorage
  const savedStates = JSON.parse(localStorage.getItem("toggleStates")) || {};

  // Apply saved states
  toggles.forEach(toggle => {
    if (savedStates[toggle.dataset.id]) {
      toggle.checked = true;
    }
    toggle.addEventListener("change", () => {
      savedStates[toggle.dataset.id] = toggle.checked;
      localStorage.setItem("toggleStates", JSON.stringify(savedStates));
    });
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      contents.forEach(content => {
        content.classList.remove("active");
        if (content.dataset.tab === tab.dataset.tab) {
          content.classList.add("active");
        }
      });
    });
  });

  // Tab animation
  const activeIndicator = document.querySelector(".tab-indicator");
  if (activeIndicator && tabs.length > 0) {
    function moveIndicator(index) {
        activeIndicator.style.width = `calc((100% / ${tabs.length}) - 10px)`;
        activeIndicator.style.left = `calc(5px + (${index} * 100% / ${tabs.length}))`;
    }
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => moveIndicator(i));
      if (tab.classList.contains("active")) moveIndicator(i);
    });
  }
});

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
