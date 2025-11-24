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
   SERVICES PAGE (RANDOM + SEARCH + SORT) 
============================================================ */

var searchInput = document.getElementById("search");
var sortSelect = document.getElementById("sort");
var servicesList = document.querySelector(".services-list");

if (servicesList) {

    var services = document.querySelectorAll(".service-item");
    var arr = [];

    for (var i = 0; i < services.length; i++) {
        arr.push(services[i]);
    }

    arr.sort(function () {
        return Math.random() - 0.5;
    });

    for (var i = 0; i < arr.length; i++) {
        servicesList.appendChild(arr[i]);
    }

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

var staffForm = document.getElementById("joinForm");

if (staffForm) {

    staffForm.onsubmit = function () {

        var name   = document.getElementById("jn-name").value.trim();
        var birth  = document.getElementById("jn-dob").value;
        var email  = document.getElementById("jn-email").value.trim();
        var exp    = document.getElementById("jn-expertise").value.trim();
        var skills = document.getElementById("jn-skills").value.trim();
        var edu    = document.getElementById("jn-edu").value.trim();
        var msg    = document.getElementById("jn-msg").value.trim();
        var photo  = document.getElementById("jn-photo").value;

        if (!name || !birth || !email || !exp || !skills || !edu || !msg || !photo) {
            alert("Please fill in all fields.");
            return false; 
        }

        if (/^[0-9]/.test(name)) {
            alert("Name cannot start with a number.");
            return false;
        }

        if (!photo.match(/\.(jpg|jpeg|png|gif)$/i)) {
            alert("Please upload a valid image file.");
            return false;
        }

        var year = new Date(birth).getFullYear();
        if (year >= 2008) {
            alert("Birth year must be before 2008.");
            return false;
        }

        alert("Application submitted successfully! Welcome " + name + "!");
        return true; 
    };
}


/* ============================================================
   STAFF POINTS SYSTEM — Add Points (Manage Staff Page)
============================================================ */

window.addEventListener("load", function () {

    var addBtn = document.getElementById("addPointsBtn");
    var selectStaff = document.getElementById("staffPoints");
    var pointsInput = document.getElementById("pointsInput");

    if (!addBtn || !selectStaff || !pointsInput) {
        return;
    }
   
    addBtn.onclick = function () {

        var key = selectStaff.value;      
        var amount = parseInt(pointsInput.value);

        if (!key) {
            alert("Please select a staff member.");
            return;
        }

        if (!amount || amount <= 0) {
            alert("Please enter a valid number of points.");
            return;
        }

        var current = localStorage.getItem(key);

        if (!current) {
            current = 0;
        }

        current = parseInt(current);

        var updated = current + amount;

        if (updated > 200) {
            updated = 200;
        }

        localStorage.setItem(key, updated);

        alert("Points added successfully!");

        pointsInput.value = "";
        selectStaff.value = "";
    };
});



/* ============================================================
   STAFF POINTS SYSTEM — Display Points (Staff Profile Page)
============================================================ */

window.addEventListener("load", function () {

    var rewardBox = document.querySelector(".reward-box");
    if (!rewardBox) return; 

    var key = rewardBox.dataset.key; 

    var points = localStorage.getItem(key);
    if (!points) points = 0;

    points = parseInt(points);

    var pointsEl = rewardBox.querySelector(".reward-points");
    var fillEl   = rewardBox.querySelector(".reward-fill");
    var tierEl   = rewardBox.querySelector(".reward-tier");

    updateRewardBox(points, pointsEl, fillEl, tierEl);
});
/* =====================================
   Evaluation Form Validation (Slides Style)
===================================== */

window.addEventListener("load", function () {

    var evalForm = document.getElementById("evalForm");

    if (evalForm == null) return;  

    evalForm.onsubmit = function () {

        var service = document.getElementById("service").value;
        var rate = document.getElementById("ratingValue").value;
        var feedback = document.getElementById("feedback").value.trim();

        if (service === "") {
            alert("Please select a service.");
            return false;
        }

        if (rate === "" || rate === "0") {
            alert("Please choose a rating.");
            return false;
        }

        if (feedback === "") {
            alert("Please write a comment.");
            return false;
        }

        if (rate == 1 || rate == 2) {
            alert("We're sorry for the inconvenience. Thank you for your feedback.");
        } else {
            alert("Thank you for your positive evaluation!");
        }

        window.location.href = "customer-dashboard.html";
    };

});
// =============================
//  ADD NEW SERVICE PAGE LOGIC
// =============================

window.addEventListener("load", function () {

    var addForm = document.getElementById("addServiceForm");

    if (addForm) {

        addForm.onsubmit = function (e) {

            var name = document.getElementById("name").value.trim();
            var price = document.getElementById("price").value.trim();
            var desc = document.getElementById("desc").value.trim();

            if (name === "" || price === "" || desc === "") {
                alert("Please fill all fields.");
                return false;
            }

            if (!isNaN(name.charAt(0))) {
                alert("Service name cannot start with a number.");
                return false;
            }

            if (isNaN(price)) {
                alert("Price must be a number.");
                return false;
            }

            var oldServices = localStorage.getItem("services");

            if (oldServices === null) {
                oldServices = [];   
            } else {
                oldServices = JSON.parse(oldServices); 
            }

            var newService = {
                serviceName: name,
                servicePrice: price,
                serviceDesc: desc
            };

            oldServices.push(newService);

            localStorage.setItem("services", JSON.stringify(oldServices));

            alert("Service added: " + name);

            addForm.name.value = "";
            addForm.price.value = "";
            addForm.desc.value = ""; 

            e.preventDefault();
        };
    }
});
// =============================
//  PROVIDER DASHBOARD PAGE LOGIC
// =============================

window.addEventListener("load", function () {

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

});
// =============================================
//  MANAGE STAFF PAGE LOGIC  (for manage-staff.html only)
// =============================================

window.addEventListener("load", function () {

    if (window.location.pathname.includes("manage-staff.html")) {

        // ===== 1) STAFF ARRAY (Array of Objects) =====
        var staffMembers = [
            { name: "Jood Alkhneen", photo: "images/staff1.jpg" },
            { name: "Remas Almutairi", photo: "images/staff2.jpg" },
            { name: "Lujain Almajyul", photo: "images/staff3.jpg" },
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

            if (selected.length === 0) {
                alert("Please select at least one offer");
                return;
            }

            var ok = confirm("Are you sure you want to delete selected members?");
            if (!ok) return;

            for (var j = selected.length - 1; j >= 0; j--) {
                staffMembers.splice(selected[j], 1);
            }

            loadStaff();
        };

        // ===== 4) ADD NEW STAFF MEMBER =====
        var currentStaff = document.querySelector(".staff-form");

        currentStaff.onsubmit = function () {

            var name = document.getElementById("staff-name").value.trim();
            var photo = document.getElementById("photo").value;
            var dob = document.getElementById("dob").value.trim();
            var email = document.getElementById("email").value.trim();
            var expertise = document.getElementById("expertise").value.trim();
            var skills = document.getElementById("skills").value.trim();
            var education = document.getElementById("education").value.trim();

            if (name === "" || photo === "" || dob === "" || email === "" ||
                expertise === "" || skills === "" || education === "") {

                alert("Please fill all required fields.");
                return false;
            }

            staffMembers.push({
                name: name,
                photo: "images/default.jpg"
            });

            alert("New staff member added!");
            loadStaff();
        };

    }

});
