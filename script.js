/* ================= THEME SWITCH ================= */

const themeSwitch = document.getElementById("themeSwitch");

// Apply saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeSwitch.checked = true;
}

// Toggle theme
themeSwitch.addEventListener("change", () => {
  if (themeSwitch.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});


/* ================= BACK TO TOP BUTTON ================= */

const topBtn = document.getElementById("backToTop");

// Show button after scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

// Scroll to top
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


/* ================= REAL-TIME CLOCK ================= */

function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();
