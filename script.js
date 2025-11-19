/* ================================
   🌙 Theme Switcher (Light / Dark)
   ================================ */

// نجلب زر القمر/الشمس
const themeToggle = document.getElementById("theme-toggle");

// إذا فيه ثيم محفوظ من قبل – طبقيه
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

// عند الضغط على زر الثيم
themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    // نحفظ الثيم المختار
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
    


/* ================================
   Back to Top Button
   ================================ */
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});



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
