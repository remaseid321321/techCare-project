/* ============================================================
   1) LOAD THEME (DARK/LIGHT) — يعمل في جميع الصفحات
============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");

        const themeSwitch = document.getElementById("themeSwitch");
        if (themeSwitch) themeSwitch.checked = true;
    }
});

/* ============================================================
   2) THEME TOGGLE — يعمل فقط في الصفحة الرئيسية
============================================================ */
// ===============================
// Theme Toggle (Dark / Light)
// ===============================

// زر التبديل
const themeButton = document.getElementById("themeToggle");

// إذا فيه ثيم محفوظ من قبل – طبّقيه
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeButton.textContent = "☀️";
}

// عند الضغط على الزر
themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    // إذا صار دارك
    if (document.body.classList.contains("dark")) {
        themeButton.textContent = "☀️";      // يطلع رمز الشمس
        localStorage.setItem("theme", "dark");
    } 
    else {
        themeButton.textContent = "🌙";       // يطلع رمز القمر
        localStorage.setItem("theme", "light");
    }
});

/* ============================================================
   3) BACK TO TOP BUTTON — (الصفحة الرئيسية فقط)
============================================================ */
const topBtn = document.getElementById("backToTop");

if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) topBtn.style.display = "block";
        else topBtn.style.display = "none";
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ============================================================
   4) REAL-TIME CLOCK — (الصفحة الرئيسية فقط)
============================================================ */
function updateClock() {
    const clockEl = document.getElementById("clock");
    if (!clockEl) return;

    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

/* ============================================================
   5) SERVICES PAGE — SEARCH + SORT  (يشتغل فقط عند وجود العناصر)
============================================================ */

const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const servicesList = document.querySelector(".services-list");

if (servicesList) {

    const services = Array.from(document.querySelectorAll(".service-item"));

    /* ---------- SEARCH ---------- */
    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const keyword = searchInput.value.toLowerCase();

            services.forEach(service => {
                const title = service.querySelector("h3").textContent.toLowerCase();
                const desc = service.querySelector("p").textContent.toLowerCase();

                service.style.display =
                    (title.includes(keyword) || desc.includes(keyword))
                        ? "block"
                        : "none";
            });
        });
    }

    /* ---------- SORT ---------- */
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {

            let sortedItems = [...services];

            switch (sortSelect.value) {

                case "price-asc":
                    sortedItems.sort((a, b) => extractPrice(a) - extractPrice(b));
                    break;

                case "price-desc":
                    sortedItems.sort((a, b) => extractPrice(b) - extractPrice(a));
                    break;

                case "name-asc":
                    sortedItems.sort((a, b) =>extractName(a).localeCompare(extractName(b))
                    );
                    break;

                case "name-desc":
                    sortedItems.sort((a, b) =>
                        extractName(b).localeCompare(extractName(a))
                    );
                    break;
            }

            /* إعادة ترتيب العناصر داخل الصفحة */
                                    sortedItems.forEach(item => servicesList.appendChild(item));
        });
    }
}

/* ============================================================
   6) Helper Functions — Price & Name
============================================================ */
function extractPrice(el) {
    const priceText = el.querySelector(".meta").textContent;
    return parseInt(priceText.replace(/\D/g, ""));
}

function extractName(el) {
    return el.querySelector("h3").textContent.trim().toLowerCase();
}
