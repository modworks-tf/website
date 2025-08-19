document.addEventListener("astro:page-load", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".tab-content");
  const activeIndicator = document.querySelector(".tab-indicator");

  // ========= Helper: activate a tab =========
  function activateTab(tabName) {
    // skip Return (not a real tab)
    if (tabName === "Return") return;

    const targetTab = Array.from(tabs).find(t => t.dataset.tab === tabName);
    if (!targetTab) return;

    tabs.forEach(t => t.classList.remove("active"));
    targetTab.classList.add("active");

    contents.forEach(c => {
      c.classList.remove("active");
      if (c.dataset.tab === tabName) c.classList.add("active");
    });

    if (activeIndicator) {
      const index = Array.from(tabs).indexOf(targetTab);
      moveIndicator(index);
    }

    // save & update hash (except Return)
    localStorage.setItem("lastTab", tabName);
    history.replaceState(null, "", `#${tabName}`);
  }

  // ========= Indicator movement =========
  function moveIndicator(index) {
    if (!activeIndicator) return;
    activeIndicator.style.width = `calc((100% / ${tabs.length}) - 10px)`;
    activeIndicator.style.left = `calc(5px + (${index} * 100% / ${tabs.length}))`;
  }

  // ========= Tab click handlers =========
  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      if (tab.dataset.tab !== "Return") {
        activateTab(tab.dataset.tab);
      }
      // let Return behave like a normal link, no save/no hash
    });

    if (tab.classList.contains("active") && tab.dataset.tab !== "Return") {
      moveIndicator(i);
    }
  });

  // ========= Initial tab selection =========
  const hashTab = window.location.hash.substring(1);
  const savedTab = localStorage.getItem("lastTab");

  if (hashTab && hashTab !== "Return") {
    activateTab(hashTab);
  } else if (savedTab && savedTab !== "Return") {
    activateTab(savedTab);
  } else {
    activateTab("Info"); // default fallback
  }
});
