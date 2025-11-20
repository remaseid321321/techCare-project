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
/* ============================================================
   7) ABOUT PAGE — JOIN OUR STAFF FORM VALIDATION
============================================================ */

const staffForm = document.getElementById("joinForm");

if (staffForm) {

    staffForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("jn-name").value.trim();
        const birth = document.getElementById("jn-dob").value;
        const email = document.getElementById("jn-email").value.trim();
        const exp = document.getElementById("jn-expertise").value.trim();
        const skills = document.getElementById("jn-skills").value.trim();
        const edu = document.getElementById("jn-edu").value.trim();
        const msg = document.getElementById("jn-msg").value.trim();
        const photo = document.getElementById("jn-photo").value;

        // 1) No empty fields
        if (!name || !birth || !email || !exp || !skills || !edu || !msg || !photo) {
            alert("Please fill in all fields.");
            return;
        }

        // 2) Name must NOT start with a number
        if (/^[0-9]/.test(name)) {
            alert("Name cannot start with a number.");
            return;
        }

        // 3) Image file only
        if (!photo.match(/\.(jpg|jpeg|png|gif)$/i)) {
            alert("Please upload an image file (JPG, PNG, GIF).");
            return;
        }

        // 4) Birth year must be before 2008
        const year = new Date(birth).getFullYear();
        if (year >= 2008) {
            alert("Birth year must be before 2008.");
            return;
        }

        // SUCCESS — English alert
        alert("Application submitted successfully! Welcome " + name );
    });
}
/* ============================================================
   6) STAFF POINTS SYSTEM (Profile Page)
============================================================ */
/* ===============================
   STAFF POINTS (Based on Slides)
   =============================== */

var pointsEl = document.getElementById("pointsValue");
var barEl = document.getElementById("pointsBar");
var addBtn = document.getElementById("addPointsBtn");
var staffKey = document.body.getAttribute("data-staff");  
// "jood" – or any staff page

// Load saved points
var currentPoints = localStorage.getItem(staffKey + "_points");

if (currentPoints === null) {
    currentPoints = 0;
} else {
    currentPoints = parseInt(currentPoints);
}

// Show points when page loads
pointsEl.innerHTML = currentPoints;

// Update Progress Bar
function updateBar() {
    var percent = (currentPoints / 200) * 100;

    if (percent > 100) {
        percent = 100;
    }

    barEl.style.width = percent + "%";
}

updateBar();

// When user clicks "Add Points"
addBtn.onclick = function () {

    var add = prompt("Enter points to add:");

    if (add === null) {
        return;
    }

    if (isNaN(add)) {
        alert("Please enter numbers only.");
        return;
    }

    add = parseInt(add);

    currentPoints = currentPoints + add;

    localStorage.setItem(staffKey + "_points", currentPoints);

    pointsEl.innerHTML = currentPoints;
    updateBar();

    alert("Points updated successfully!");
};
/* ============================================================
   STAFF POINTS — Add points from Manage Staff
============================================================ */

const addBtn = document.getElementById("addPointsBtn");

if (addBtn) {
    addBtn.addEventListener("click", function () {

        const staffKey = document.getElementById("staffSelect").value;
        const amount = parseInt(document.getElementById("pointsInput").value);

        if (!staffKey) {
            alert("Please choose a staff member.");
            return;
        }

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid number.");
            return;
        }

        let oldPoints = localStorage.getItem(staffKey);

        if (!oldPoints) oldPoints = 0;

        const newPoints = parseInt(oldPoints) + amount;

        localStorage.setItem(staffKey, newPoints);

        alert("Points updated successfully!");
    });
}
