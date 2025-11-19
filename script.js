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
/* ===============================
   Load Theme from LocalStorage
================================ */
document.addEventListener("DOMContentLoaded", function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});


/* ===============================
   SERVICES PAGE — Search + Sort
   (يشتغل فقط لو الصفحة فيها العناصر)
================================ */

const searchInput = document.getElementById("search");
const servicesList = document.querySelector(".services-list");
const sortSelect = document.getElementById("sort");

// ↪ نتحقق إن الصفحة هي صفحة services
if (servicesList && searchInput) {

    const services = document.querySelectorAll(".service-item");

    /* -------- Search -------- */
    searchInput.addEventListener("input", function () {
        const keyword = searchInput.value.toLowerCase();

        services.forEach(service => {
            const title = service.querySelector("h3").textContent.toLowerCase();
            const description = service.querySelector("p").textContent.toLowerCase();

            service.style.display =
                (title.includes(keyword) || description.includes(keyword))
                    ? "block"
                    : "none";
        });
    });

    /* -------- Sort -------- */
    if (sortSelect) {
        sortSelect.addEventListener("change", function () {
            let sortedItems = Array.from(services);

            switch (sortSelect.value) {
                case "price-asc":
                    sortedItems.sort((a, b) => extractPrice(a) - extractPrice(b));
                    break;

                case "price-desc":
                    sortedItems.sort((a, b) => extractPrice(b) - extractPrice(a));
                    break;

                case "name-asc":
                    sortedItems.sort((a, b) =>
                        extractName(a).localeCompare(extractName(b))
                    );
                    break;

                case "name-desc":
                    sortedItems.sort((a, b) =>
                        extractName(b).localeCompare(extractName(a))
                    );
                    break;
            }

            sortedItems.forEach(item => servicesList.appendChild(item));
        });
    }
}

/* -------- Helper Functions -------- */
function extractPrice(element) {
    const priceText = element.querySelector(".meta").textContent;
    return parseInt(priceText.replace(/\D/g, ""));
}

function extractName(element) {
    return element.querySelector("h3").textContent.trim().toLowerCase();
}
