/* =====================================================
   GLOBAL — LOAD SAVED THEME
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    const themeSwitch = document.getElementById("themeSwitch");

    // Apply saved theme
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeSwitch) themeSwitch.checked = true;
    }

    // Theme Toggle
    if (themeSwitch) {
        themeSwitch.addEventListener("change", () => {
            if (themeSwitch.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        });
    }

    /* =====================================================
       BACK TO TOP BUTTON — HOME PAGE ONLY
    ===================================================== */
    const topBtn = document.getElementById("backToTop");

    if (topBtn) {
        window.addEventListener("scroll", () => {
            topBtn.style.display = window.scrollY > 400 ? "block" : "none";
        });

        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* =====================================================
       REAL-TIME CLOCK — HOME PAGE ONLY
    ===================================================== */
    const clock = document.getElementById("clock");

    if (clock) {
        function updateClock() {
            const now = new Date();
            clock.textContent = now.toLocaleTimeString();
        }
        setInterval(updateClock, 1000);
        updateClock();
    }

    /* =====================================================
       SERVICES PAGE — SEARCH + SORT
    ===================================================== */
    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    const servicesList = document.querySelector(".services-list");

    // إذا الصفحة فيها قائمة خدمات
    if (servicesList && searchInput) {

        const services = document.querySelectorAll(".service-item");

        /* ------- SEARCH ------- */
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

        /* ------- SORT ------- */
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

    /* ------- Helper Functions ------- */
    function extractPrice(element) {
      const priceText = element.querySelector(".meta").textContent;
        return parseInt(priceText.replace(/\D/g, ""));
    }

    function extractName(element) {
        return element.querySelector("h3").textContent.trim().toLowerCase();
    }

});
