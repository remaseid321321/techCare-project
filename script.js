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
/* ============================================================
   STAFF POINTS SYSTEM — Add Points (Manage Staff Page)
============================================================ */

// يتحقق إذا صفحة manage-staff
document.addEventListener("DOMContentLoaded", function () {

    const addBtn = document.getElementById("addPointsBtn");
    const selectStaff = document.getElementById("staffPoints");
    const pointsInput = document.getElementById("pointsInput");

    // إذا العناصر غير موجودة يعني لسنا في صفحة manage staff
    if (!addBtn || !selectStaff || !pointsInput) return;

    addBtn.addEventListener("click", function () {

        const key = selectStaff.value;        // مثل: points-jood
        const amount = parseInt(pointsInput.value);

        if (!key) {
            alert("Please select a staff member.");
            return;
        }

        if (!amount || amount <= 0) {
            alert("Please enter a valid number of points.");
            return;
        }

        // جلب النقاط السابقة
        let current = localStorage.getItem(key);

        if (!current) current = 0;

        current = parseInt(current);

        // إضافة النقاط الجديدة
        const updated = current + amount;
       if(updated > 200) {
          updated=200;
       }

        // تخزينها
        localStorage.setItem(key, updated);

        alert("Points added successfully!");

        // تفريغ الخانات
        pointsInput.value = "";
        selectStaff.value = "";
    });
});


/* ============================================================
   STAFF POINTS SYSTEM — Display Points (Staff Profile Page)
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const rewardBox = document.querySelector(".reward-box");
    if (!rewardBox) return; // يعني مو صفحة بروفايل

    const key = rewardBox.dataset.key; // points-jood

    let points = localStorage.getItem(key);
    if (!points) points = 0;

    points = parseInt(points);

    // عناصر داخل صندوق المكافآت
    const pointsEl = rewardBox.querySelector(".reward-points");
    const fillEl = rewardBox.querySelector(".reward-fill");
    const tierEl = rewardBox.querySelector(".reward-tier");

    updateRewardBox(points, pointsEl, fillEl, tierEl);
});


/* ============================================================
   FUNCTION: Update reward UI
============================================================ */
function updateRewardBox(points, pointsEl, fillEl, tierEl) {

    const max = 200;
    const percent = (points / max) * 100;

    // تحديث النص
pointsEl.textContent = `Points: ${points} / ${max}`;
    // تحديث عرض الشريط
    fillEl.style.width = percent + "%";

    // تحديد المستوى
    if (points < 100) {
        tierEl.textContent = "(Bronze)";
    } else if (points < 150) {
        tierEl.textContent = "(Silver)";
    } else {
        tierEl.textContent = "(Gold)";
    }
}
/* ============================================================
   REQUEST SERVICE FORM — SLIDES STYLE
   (Used in request.html inside the shared script.js)
============================================================ */

/* ============================================================
   Request a Service Page – Validation (Same as slides)
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    if (!form) return;     // يعني مو في صفحة request

    const service = document.getElementById("service");
    const name = document.getElementById("name");
    const date = document.getElementById("date");
    const desc = document.getElementById("desc");

    form.addEventListener("submit", function (event) {

        /* منع الإرسال */
        event.preventDefault();

        /* ـــــــــــــ التحقق 1: اختيار الخدمة ـــــــــــــ */
        if (service.value === "") {
            alert("❌ Please select a service.");
            return;
        }

        /* ـــــــــــــ التحقق 2: الاسم ليس كامل أو فيه رموز ـــــــــــــ */
        // السلايدات تستخدم RegEx مثل: /^[A-Za-z ]+$/
        const fullNamePattern = /^[A-Za-z ]+$/;

        if (!fullNamePattern.test(name.value) || name.value.trim().indexOf(" ") === -1) {
            alert("❌ Enter full name without numbers or symbols.");
            return;
        }

        /* ـــــــــــــ التحقق 3: التاريخ قريب جدًا (قبل 3 أيام) ـــــــــــــ */
        const today = new Date();
        const selected = new Date(date.value);

        // فرق الأيام
        const diff = (selected - today) / (1000 * 60 * 60 * 24);

        if (diff < 3) {
            alert("❌ The due date is too soon.");
            return;
        }

        /* ـــــــــــــ التحقق 4: الوصف أقل من 100 حرف ـــــــــــــ */
        if (desc.value.trim().length < 100) {
            alert("❌ Description must be at least 100 characters.");
            return;
        }

        /* ============================================================
           إذا كل شيء صحيح → سلايدات JS تقول نستخدم confirm()
           (صفحة 28 في Introduction to JS)   [oai_citation:3‡Lecture9-ch21_Introduction to JS_.pdf](sediment://file_0000000085f071f5a7ca20b85e9fcc3e)
        ============================================================= */
        const userChoice = confirm(
            "Your request is valid.\n\nDo you want to stay on the page?"
        );

        if (userChoice) {
            /* ============================================================
               البقاء في الصفحة → تخزين الطلب داخل LocalStorage
               (مطابق لدرس LocalStorage)   [oai_citation:4‡Lecture10_LocalStorage_.pdf](sediment://file_00000000c81871f5a150cba055449bb4)
            ============================================================= */
            let list = localStorage.getItem("requests");

            if (!list) list = " ";
            list += "- " + service.value + " | " + name.value + " | " + date.value + "\n";

            localStorage.setItem("requests", list);

            alert("✔ Request saved. You can add more.");
        } else {
            /* الرجوع للداشبورد */
            window.location.href = "customer-dashboard.html";
        }
    });
});

/* ============================================================
   عرض الطلبات داخل نفس الصفحة (عند البقاء)
============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    const box = document.getElementById("savedRequests");
    if (!box) return;

    const data = localStorage.getItem("requests");

    if (data) {
        box.innerText = data;
    }
});
