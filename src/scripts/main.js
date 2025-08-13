document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
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
  // Fade out on quit/return tab
  const quitTab = document.querySelector('.tab[data-tab="Return"]');
  if (quitTab) {
    quitTab.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector('.app').classList.add('fade-out');
      setTimeout(() => {
        window.location.href = quitTab.href;
      }, 250); // match the transition duration
    });
  }
});
