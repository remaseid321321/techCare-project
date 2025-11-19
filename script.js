// ===================== Theme Toggle =====================
const themeBtn = document.getElementById("themeToggle");
const body = document.body;

// اقرأ الثيم من الذاكرة
let savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    themeBtn.textContent = "☀️";
} else {
    body.classList.remove("dark-mode");
    themeBtn.textContent = "🌙";
}

themeBtn.onclick = function () {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
};

// ===================== Back to Top =====================
const topBtn = document.getElementById("backToTop");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

topBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
};

/* ================================
   Real-Time Clock in Footer
   ================================ */

function updateClock() {
    const clock = document.getElementById("clock");

    const now = new Date();
    const timeString = now.toLocaleTimeString();

    clock.textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); 
