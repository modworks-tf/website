document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("fade-in");
  const launchBtn = document.getElementById("launch-btn");
  if (launchBtn) {
    launchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      document.body.classList.remove("fade-in");
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location.href = this.href;
      }, 500); // match the transition duration
    });
  }
});