/* ============================================================
   1) LOAD THEME (DARK/LIGHT)
============================================================ */
document.addEventListener("DOMContentLoaded", function () {
    var savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");

        var themeSwitch = document.getElementById("themeSwitch");
        if (themeSwitch) {
            themeSwitch.checked = true;
        }
    }
});

/* ============================================================
   2) THEME TOGGLE (ONLY HOME)
============================================================ */
var themeButton = document.getElementById("themeToggle");

if (themeButton) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        themeButton.textContent = "☀️";
    }

    themeButton.onclick = function () {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            themeButton.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeButton.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    };
}

/* ============================================================
   3) BACK TO TOP (ONLY HOME)
============================================================ */
var topBtn = document.getElementById("backToTop");

if (topBtn) {

    window.onscroll = function () {
        if (window.scrollY > 400) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    };

    topBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

/* ============================================================
   4) CLOCK
============================================================ */
function updateClock() {
    var clockEl = document.getElementById("clock");
    if (!clockEl) return;

    var now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

/* ============================================================
   5) SERVICES PAGE — SEARCH + SORT + RANDOM
============================================================ */

var searchInput = document.getElementById("search");
var sortSelect = document.getElementById("sort");
var servicesList = document.querySelector(".services-list");

if (servicesList) {

    /* =============== 1) نجمع العناصر في Array =============== */
    var services = document.querySelectorAll(".service-item");
    var arr = [];

    for (var i = 0; i < services.length; i++) {
        arr.push(services[i]);
    }

    /* =============== 2) ترتيب عشوائي عند فتح الصفحة =============== */
    arr.sort(function () {
        return Math.random() - 0.5;
    });

    for (var i = 0; i < arr.length; i++) {
        servicesList.appendChild(arr[i]);
    }

    /* =============== 3) البحث =============== */
    if (searchInput) {
        searchInput.oninput = function () {

            var keyword = searchInput.value.toLowerCase();

            for (var i = 0; i < arr.length; i++) {

                var title = arr[i].querySelector("h3").textContent.toLowerCase();
                var desc = arr[i].querySelector("p").textContent.toLowerCase();

                if (title.indexOf(keyword) !== -1 || desc.indexOf(keyword) !== -1) {
                    arr[i].style.display = "block";
                } else {
                    arr[i].style.display = "none";
                }
            }
        };
    }

    /* =============== 4) الفرز (Sorting) =============== */
    if (sortSelect) {

        sortSelect.onchange = function () {

            if (sortSelect.value === "price-asc") {
                arr.sort(function (a, b) {
                    return extractPrice(a) - extractPrice(b);
                });
            }

            else if (sortSelect.value === "price-desc") {
                arr.sort(function (a, b) {
                   return extractPrice(b) - extractPrice(a);
                });
            }

            else if (sortSelect.value === "name-asc") {
                arr.sort(function (a, b) {
                    return extractName(a).localeCompare(extractName(b));
                });
            }

            else if (sortSelect.value === "name-desc") {
                arr.sort(function (a, b) {
                    return extractName(b).localeCompare(extractName(a));
                });
            }

            /* إعادة ترتيب الصفحة */
            for (var i = 0; i < arr.length; i++) {
                servicesList.appendChild(arr[i]);
            }
        };
    }
}

/* ============================================================
   6) Helper Functions
============================================================ */
function extractPrice(el) {
    var txt = el.querySelector(".meta").textContent;
    return parseInt(txt.replace(/\D/g, ""));
}

function extractName(el) {
    return el.querySelector("h3").textContent.toLowerCase();
}
// =============================
// Validation for About Us Page
// =============================

// تأكد إن الكود يشتغل فقط في صفحة AboutUs
if (window.location.pathname.includes("AboutUs")) {

    var form = document.querySelector("form");
    var nameInput = document.getElementById("jn-name");
    var photoInput = document.getElementById("jn-photo");
    var dobInput = document.getElementById("jn-dob");
    var emailInput = document.getElementById("jn-email");

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // empty fields
        if (
            nameInput.value === "" ||
            photoInput.value === "" ||
            dobInput.value === "" ||
            emailInput.value === ""
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        // name should not start with a number
        if (!isNaN(nameInput.value.charAt(0))) {
            alert(" The name must not start with a number.");
            return;
        }

        // must be image
        var photoType = photoInput.files[0].type;
        if (!(photoType === "image/png"  photoType === "image/jpeg"  photoType === "image/jpg")) {
            alert(" Please upload an image file (PNG or JPG).");
            return;
        }

        // date of birth before 2008
        var year = parseInt(dobInput.value.substring(0, 4));
        if (year >= 2008) {
            alert("Date of birth must be before 2008.");
            return;
        }

        // success
        alert(" Application submitted successfully, " + nameInput.value + "!");
        
        form.submit();
    });
}
