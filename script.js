/* ===========================================================
   REAL-TIME CLOCK IN FOOTER
=========================================================== */
function updateClock() {
  const now = new Date();
  const formatted =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0") +
    " " +
    now.toLocaleTimeString();

  const clockSpan = document.getElementById("clock");
  if (clockSpan) clockSpan.textContent = " | " + formatted;
}

setInterval(updateClock, 1000);
updateClock();

/* ===========================================================
   BACK TO TOP BUTTON
=========================================================== */
const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
  if (window.scrollY > 300) topBtn.style.display = "block";
  else topBtn.style.display = "none";
};

topBtn.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ===========================================================
   THEME SWITCHER (SUN / MOON)
=========================================================== */
const lightIcon = document.getElementById("lightIcon");
const darkIcon = document.getElementById("darkIcon");

function applyTheme(theme) {
  document.body.className = theme;
  localStorage.setItem("theme", theme);
}

lightIcon.onclick = () => applyTheme("light");
darkIcon.onclick = () => applyTheme("dark");

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);
