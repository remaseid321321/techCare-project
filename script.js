/* ============================================================
   1) FILTER — Search Services in Real Time
============================================================ */
function setupSearch() {
    const searchInput = document.getElementById("searchInput");
    const serviceItems = document.querySelectorAll(".service-item");

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            const query = searchInput.value.toLowerCase().trim();

            serviceItems.forEach(item => {
                const name = item.querySelector("h3").textContent.toLowerCase();

                item.style.display = name.includes(query)
                    ? "block"
                    : "none";
            });
        });
    }
}

/* ============================================================
   2) SORT — Sort Services by Price or Name
============================================================ */
function setupSort() {
    const sortSelect = document.getElementById("sortSelect");
    const servicesList = document.querySelector(".services-list");

    if (sortSelect && servicesList) {
        sortSelect.addEventListener("change", function () {
            const items = Array.from(servicesList.querySelectorAll(".service-item"));
            const selected = sortSelect.value;
            let sortedItems = [...items];

            switch (selected) {
                case "low-high":
                    sortedItems.sort((a, b) => extractPrice(a) - extractPrice(b));
                    break;

                case "high-low":
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

            /* إعادة ترتيب العناصر داخل الصفحة */
            sortedItems.forEach(item => servicesList.appendChild(item));
        });
    }
}

/* ============================================================
   3) Helper Functions — Price & Name
============================================================ */
function extractPrice(el) {
    const priceText = el.querySelector(".meta").textContent;
    return parseInt(priceText.replace(/\D/g, ""));
}

function extractName(el) {
    return el.querySelector("h3").textContent.trim().toLowerCase();
}

/* ============================================================
   4) DARK MODE — ONLY THIS CODE (remove everything else)
============================================================ */

document.getElementById("themeToggle").onclick = function () {
    document.body.classList.toggle("dark");
};
