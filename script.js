document.addEventListener("DOMContentLoaded", function () {

    /* ==================== THEME SWITCH ==================== */
    const themeSwitch = document.getElementById("themeSwitch");

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeSwitch) themeSwitch.checked = true;
    }

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


    /* ==================== BACK TO TOP ==================== */
    const topBtn = document.getElementById("backToTop");

    if (topBtn) {
        window.addEventListener("scroll", () => {
            topBtn.style.display = (window.scrollY > 400) ? "block" : "none";
        });

        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    /* ==================== CLOCK ==================== */
    const clock = document.getElementById("clock");

    if (clock) {
        function updateClock() {
            clock.textContent = new Date().toLocaleTimeString();
        }
        setInterval(updateClock, 1000);
        updateClock();
    }


    /* ==================== SERVICES PAGE — SEARCH + SORT ==================== */

    const searchInput = document.getElementById("search");
    const sortSelect = document.getElementById("sort");
    const servicesList = document.querySelector(".services-list");

    if (servicesList && searchInput) {

        const services = document.querySelectorAll(".service-item");

        /* ---- SEARCH ---- */
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

        /* ---- SORT ---- */
        if (sortSelect) {
            sortSelect.addEventListener("change", function () {
                let sorted = Array.from(services);

                switch (sortSelect.value) {
                    case "price-asc":
                        sorted.sort((a, b) => extractPrice(a) - extractPrice(b));
                        break;

                    case "price-desc":
                        sorted.sort((a, b) => extractPrice(b) - extractPrice(a));
                        break;

                    case "name-asc":
                        sorted.sort((a, b) => extractName(a).localeCompare(extractName(b)));
                        break;

                    case "name-desc":
                        sorted.sort((a, b) => extractName(b).localeCompare(extractName(a)));
                        break;
                }

                sorted.forEach(item => servicesList.appendChild(item));
            });
        }
    }

    function extractPrice(element) {
        return parseInt(element.querySelector(".meta").textContent.replace(/\D/g, ""));
    }

    function extractName(element) {
        return element.querySelector("h3").textContent.trim().toLowerCase();
    }

});
