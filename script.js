/* ============================================================
   1) LOAD THEME (DARK/LIGHT)
============================================================ */
var body = document.getElementById("bodyTag");
var btn  = document.getElementById("themeToggle");

if (localStorage.getItem("theme") === "dark") {
    body.className = "dark";
    btn.innerHTML = "☀️";
}

btn.onclick = function () {

    if (body.className === "dark") {
        body.className = "";   
        btn.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
    } else {
        body.className = "dark";
        btn.innerHTML = "☀️";
        localStorage.setItem("theme", "dark");
    }
};

/* ============================================================
   2) THEME TOGGLE (ONLY HOME)
============================================================ */
var themeButton = document.getElementById("themeToggle");

if (themeButton) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.className = "dark";
        themeButton.textContent = "☀️";
    }

    themeButton.onclick = function () {

        if (document.body.className === "dark") {
            document.body.className = "";
            themeButton.textContent = "🌙";
            localStorage.setItem("theme", "light");
        } else {
            document.body.className = "dark";
            themeButton.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        }
    };
}
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

/* =====================================
   Evaluation Form Validation (Slides Style)
===================================== */

window.onload = function () {

    var evalForm = document.getElementById("evalForm");

    if (evalForm == null) return;  // الصفحة ليست evaluation

    evalForm.onsubmit = function (e) {

        e.preventDefault(); // نفس أسلوب السلايدات — منع الإرسال

        // تجميع القيم
        var service = document.getElementById("service").value;
        var rate = document.getElementById("ratingValue").value;
        var feedback = document.getElementById("feedback").value.trim();

        // التحقق (مثل السلايدات)
        if (service === "") {
            alert("Please select a service.");
            return;
        }

        if (rate === "" || rate === "0") {
            alert("Please choose a rating.");
            return;
        }

        if (feedback === "") {
            alert("Please write a comment.");
            return;
        }

        // الرسالة حسب التقييم (حسب طلبك)
        if (rate == 1 || rate == 2) {
            alert("We're sorry for the inconvenience. Thank you for your feedback.");
        } else {
            alert("Thank you for your positive evaluation!");
        }

        // الانتقال للداشبورد (مثل السلايدات)
        window.location.href = "customer-dashboard.html";
    };

};

// =============================
//  ADD NEW SERVICE PAGE LOGIC
// =============================

window.onload = function () {

    // نتحقق إذا الصفحة صفحة إضافة خدمة (عن طريق وجود الحقول)
    var addForm = document.getElementById("addServiceForm");

    if (addForm) {

        addForm.onsubmit = function (e) {

            var name = document.getElementById("name").value.trim();
            var price = document.getElementById("price").value.trim();
            var desc = document.getElementById("desc").value.trim();

            // 1) التحقق من الحقول الفارغة
            if (name === "" || price === "" || desc === "") {
                alert("Please fill all fields.");
                e.preventDefault();
                return;
            }

            // 2) الاسم يبدأ برقم (غير مسموح)
            if (!isNaN(name.charAt(0))) {
                alert("Service name cannot start with a number.");
                e.preventDefault();
                return;
            }

            // 3) السعر لازم يكون رقم
            if (isNaN(price)) {
                alert("Price must be a number.");
                e.preventDefault();
                return;
            }

            // ========= حفظ الخدمة في localStorage =========

            var oldServices = localStorage.getItem("services");

            if (oldServices === null) {
                oldServices = [];   
            } else {
                oldServices = JSON.parse(oldServices); 
            }

            // نصنع object
            var newService = {
                serviceName: name,
                servicePrice: price,
                serviceDesc: desc
            };

            // نضيفه للأراي
            oldServices.push(newService);

            // نرجّعه لتخزين محلي
            localStorage.setItem("services", JSON.stringify(oldServices));

            // رسالة باسم الخدمة
            alert("Service added: " + name);

            // تفريغ الفورم
            addForm.reset();

            // منع إعادة تحميل الصفحة
            e.preventDefault();
        };
    }

   
   // =============================
//  PROVIDER DASHBOARD PAGE LOGIC
// =============================

// نتأكد أننا في صفحة البروفايدر فقط
if (window.location.pathname.includes("provider-dashboard.html")) {

    var tableBody = document.querySelector("tbody");

    if (tableBody) {

        var saved = localStorage.getItem("services");

        if (saved !== null) {
            var servicesArray = JSON.parse(saved);

            for (var i = 0; i < servicesArray.length; i++) {

                var row = document.createElement("tr");

                row.innerHTML =
                    "<td>" + servicesArray[i].serviceName + "</td>" +
                    "<td>" + servicesArray[i].servicePrice + " SR</td>" +
                    "<td>Active</td>" +
                    "<td style='text-align:right;'><a href='#' class='action-btn'>Edit</a> <a href='#' class='action-btn'>Delete</a></td>";

                tableBody.appendChild(row);
            }
        }
    }
}
};

// =============================================
//  MANAGE STAFF PAGE LOGIC  (for manage-staff.html only)
// =============================================

if (window.location.pathname.includes("manage-staff.html")) {

    // ===== 1) STAFF ARRAY (Array of Objects) =====
    var staffMembers = [
        { name: "Jood Alkhneem", photo: "images/staff1.jpg" },
        { name: "Remas Almutairi", photo: "images/staff2.jpg" },
        { name: "Lujain Almajhul", photo: "images/staff3.jpg" },
        { name: "Jwana Alothman", photo: "images/staff4.jpg" }
    ];

    // ===== 2) PRINT STAFF IN TABLE WITH CHECKBOXES =====
    function loadStaff() {

        var tbody = document.querySelector(".staff-table tbody");
        if (!tbody) return;

        tbody.innerHTML = "";

        for (var i = 0; i < staffMembers.length; i++) {
            var row = document.createElement("tr");

            row.innerHTML =
                "<td><img src='" + staffMembers[i].photo + "'></td>" +
                "<td>" + staffMembers[i].name + "</td>" +
                "<td><input type='checkbox' class='staffCheck' data-index='" + i + "'></td>";

            tbody.appendChild(row);
        }
    }

    loadStaff();

    // ===== 3) DELETE SELECTED STAFF =====
    var deleteBtn = document.querySelector(".btn-black");

    deleteBtn.onclick = function () {

        var checks = document.querySelectorAll(".staffCheck");
        var selected = [];

        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                selected.push(i);
            }
        }

        // لا يوجد عضو محدد
        if (selected.length === 0) {
            alert("Please select at least one offer");
            return;
        }

        // تأكيد الحذف
        var ok = confirm("Are you sure you want to delete selected members?");
        if (!ok) return;

        // حذف من array (من النهاية للأول)
        for (var j = selected.length - 1; j >= 0; j--) {
            staffMembers.splice(selected[j], 1);
        }

        loadStaff();
    };

    // ===== 4) ADD NEW STAFF MEMBER =====

   var currentStaff= document.querySelector(".staff-form");
    currentStaff.onsubmit = function (e) {
        e.preventDefault();

        var name = document.getElementById("staff-name").value.trim();
        var photo = document.getElementById("photo").value;
        var dob = document.getElementById("dob").value.trim();
        var email = document.getElementById("email").value.trim();
        var expertise = document.getElementById("expertise").value.trim();
        var skills = document.getElementById("skills").value.trim();
        var education = document.getElementById("education").value.trim();

        // التحقق من الحقول الفارغة
        if (name === "" || photo === "" || dob === "" || email === "" || expertise === "" || skills === "" || education === "") {

            alert("Please fill all required fields.");
            return;
        }

        // إضافة العضو الجديد إلى Array of Objects
        staffMembers.push({
            name: name,
            photo: "images/default.jpg" // لأن السلايد ما طلب رفع فعلي للملفات
        });

        alert("New staff member added!");

        currentStaff.reset();
        loadStaff();
    };

}
