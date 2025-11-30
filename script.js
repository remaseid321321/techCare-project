
   // LOAD THEME (DARK/LIGHT) 

document.addEventListener("DOMContentLoaded", function () {

    var body = document.getElementById("bodyTag");
    var btn  = document.getElementById("themeToggle");

    if (localStorage.getItem("theme") === "dark") {
        body.className = "dark";
        if (btn) btn.innerHTML = "☀️";
    } else {
        body.className = "";
        if (btn) btn.innerHTML = "🌙";
    }

    if (btn) {
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
    }

});


   // BACK TO TOP 
var topBtn = document.getElementById("backToTop");

if (topBtn) {

    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    });

    topBtn.onclick = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}

   // CLOCK

function updateClock() {
    var clockEl = document.getElementById("clock");
    if (!clockEl) return;

    var now = new Date();
    clockEl.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

    // SERVICES PAGE — SEARCH + SORT + RANDOM

document.addEventListener("DOMContentLoaded", function () {

    var searchInput  = document.getElementById("search");
    var sortSelect   = document.getElementById("sort");
    var servicesList = document.querySelector(".services-list");

    if (!servicesList) return;

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
                var desc  = arr[i].querySelector("p").textContent.toLowerCase();

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

});

function extractPrice(el) {
    var txt = el.querySelector(".meta").textContent;
    return parseInt(txt.replace(/\D/g, ""));
}

function extractName(el) {
    return el.querySelector("h3").textContent.toLowerCase();
}
   // ABOUT PAGE 

document.addEventListener("DOMContentLoaded", function () {

    var staffForm = document.getElementById("joinForm");

    if (!staffForm) return;

    staffForm.addEventListener("submit", function (e) {

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
            e.preventDefault();
            return;
        }

        if (/^[0-9]/.test(name)) {
            alert("Name cannot start with a number.");
            e.preventDefault();
            return;
        }

        if (!photo.match(/\.(jpg|jpeg|png|gif)/i)) {
            alert("Please upload an image file.");
            e.preventDefault();
            return;
        }

        var year = new Date(birth).getFullYear();
        if (year >= 2008) {
            alert("Birth year must be before 2008.");
            e.preventDefault();
            return;
        }

        alert("Application submitted successfully! Welcome " + name);
    });
});

   // STAFF POINTS SYSTEM — FUNCTION (Add Points)

function addStaffPoints() {

    var selectStaff = document.getElementById("staffPoints");
    var pointsInput = document.getElementById("pointsInput");

    var key    = selectStaff.value;
    var amount = parseInt(pointsInput.value);

    if (!key) {
        alert("Please select a staff member.");
        return false;
    }

    if (!amount || amount <= 0) {
        alert("Please enter a valid number of points.");
        return false;
    }

    var current = localStorage.getItem(key);
    if (!current) current = 0;

    current = parseInt(current);

    var updated = current + amount;
    if (updated > 200) updated = 200;

    localStorage.setItem(key, updated);

    alert("Points added successfully!");

    pointsInput.value = "";
    selectStaff.value = "";

    return true;
}

  // STAFF POINTS SYSTEM 

document.addEventListener("DOMContentLoaded", function () {

    var addBtn = document.getElementById("addPointsBtn");

    if (addBtn) {
        addBtn.addEventListener("click", addStaffPoints);
    }

});

  // STAFF POINTS SYSTEM — (Staff Profile Page)

document.addEventListener("DOMContentLoaded", function () {

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

  // FUNCTION: Update reward 

function updateRewardBox(points, pointsEl, fillEl, tierEl) {

    var max = 200;
    var percent = (points / max) * 100;

    pointsEl.textContent = `Points: ${points} / ${max}`;
    fillEl.style.width   = percent + "%";

    if (points < 100) {
        tierEl.textContent = "(Bronze)";
    } 
    else if (points < 150) {
        tierEl.textContent = "(Silver)";
    } 
    else {
        tierEl.textContent = "(Gold)";
    }
}

  // Evaluation Form Validation 

document.addEventListener("DOMContentLoaded", function () {

    var evalForm = document.getElementById("evalForm");

    if (!evalForm) return;

    evalForm.onsubmit = function (e) {

        e.preventDefault();

        var service  = document.getElementById("service").value;
        var rate     = document.getElementById("ratingValue").value;
        var feedback = document.getElementById("feedback").value.trim();

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

        if (rate == 1 || rate == 2) {
            alert("We're sorry for the inconvenience. Thank you for your feedback.");
        } else {
            alert("Thank you for your positive evaluation!");
        }

        window.location.href = "customer-dashboard.html";
    };
});

//  ADD NEW SERVICE PAGE 

document.addEventListener("DOMContentLoaded", function () {

    var addForm = document.getElementById("addServiceForm");
    if (!addForm) return;

    addForm.onsubmit = function (e) {

        e.preventDefault();

        var name = document.getElementById("name").value.trim();
        var price = document.getElementById("price").value.trim();
        var desc = document.getElementById("desc").value.trim();
        var photo = document.getElementById("photo").value;


        if (name === "") {
        alert("Please enter the service name.");
        return;
    }

    if (price === "") {
        alert("Please enter the service price.");
        return;
    }

    if (desc === "") {
        alert("Please enter the service description.");
        return;
    }

    if (photo === "") {
        alert("Please upload a file.");
        return;
    }

        if (!isNaN(name.charAt(0))) {
            alert("Service name cannot start with a number.");
            return;
        }

        if (isNaN(price)) {
            alert("Price must be a number.");
            return;
        }
       if (!photo.match(/\.(jpg|jpeg|png|gif)/i)) {
            alert("Please upload an image file.");
            return;
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

document.getElementById("name").value = "";
document.getElementById("price").value = "";
document.getElementById("photo").value = "";
document.getElementById("desc").value = "";    };
});

//  PROVIDER DASHBOARD PAGE 

document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("provider-dashboard.html")) return;

    var tableBody = document.querySelector("tbody");
    if (!tableBody) return;

    var saved = localStorage.getItem("services");

    if (saved !== null) {
        var servicesArray = JSON.parse(saved);

        for (var i = 0; i < servicesArray.length; i++) {

            var row = document.createElement("tr");

            row.innerHTML =
                "<td>" + servicesArray[i].serviceName + "</td>" +
                "<td>" + servicesArray[i].servicePrice + " SR</td>" +
                "<td>Active</td>" +
                "<td style='text-align:right;'><a href='#' class='editBtn action-btn'>Edit</a> <a href='#' class='deleteBtn action-btn'>Delete</a></td>";

            tableBody.appendChild(row);
        }
    }
});
// edit and delete btn
document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("provider-dashboard.html")) return;

    var tableBody = document.getElementById("serviceTableBody");

    function loadServices() {
        tableBody.innerHTML = "";

        var saved = localStorage.getItem("services");
        if (!saved) return;

        var arr = JSON.parse(saved);

        for (var i = 0; i < arr.length; i++) {

            var row = document.createElement("tr");

            row.innerHTML =
                "<td>" + arr[i].serviceName + "</td>" +
                "<td>" + arr[i].servicePrice + " SR</td>" +
                "<td>Active</td>" +
                "<td style='text-align:right;'>" +
                "<a href='#' class='editBtn' data-i='" + i + "'>Edit</a> " +
                "<a href='#' class='deleteBtn' data-i='" + i + "'>Delete</a>" +
                "</td>";

            tableBody.appendChild(row);
        }

        attachEvents();
    }

    loadServices();


    function attachEvents() {

        // DELETE
        document.querySelectorAll(".deleteBtn").forEach(function (btn) {

            btn.onclick = function () {
                var index = this.dataset.i;

                var ok = confirm("Are you sure you want to delete this service?");
                if (!ok) return;

                var arr = JSON.parse(localStorage.getItem("services"));
                arr.splice(index, 1);

                localStorage.setItem("services", JSON.stringify(arr));

                loadServices();
            };
        });

        // EDIT
        document.querySelectorAll(".editBtn").forEach(function (btn) {

            btn.onclick = function () {
                var index = this.dataset.i;

                var arr = JSON.parse(localStorage.getItem("services"));
                var item = arr[index];

                var newName = prompt("Enter new service name:", item.serviceName);
                if (!newName) return;

                var newPrice = prompt("Enter new price:", item.servicePrice);
                if (!newPrice || isNaN(newPrice)) {
                    alert("Price must be a number.");
                    return;
                }

                var newDesc = prompt("Enter new description:", item.serviceDesc);
                if (!newDesc) return;

                arr[index].serviceName = newName.trim();
                arr[index].servicePrice = newPrice.trim();
                arr[index].serviceDesc = newDesc.trim();

                localStorage.setItem("services", JSON.stringify(arr));

                loadServices();
            };
        });
    }

});

//  MANAGE STAFF PAGE 

document.addEventListener("DOMContentLoaded", function () {

    if (!window.location.pathname.includes("manage-staff.html")) return;

    var staffMembers = [
        { name: "Jood Alkhneen", photo: "images/staff1.jpg" },
        { name: "Remas Almutairi", photo: "images/staff2.jpg" },
        { name: "Lujain Almajyul", photo: "images/staff3.jpg" },
        { name: "Jwana Alothman", photo: "images/staff4.jpg" }
    ];

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

    var deleteBtn = document.querySelector(".btn-black");

    if (deleteBtn) {

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
    }

    // ADD NEW STAFF MEMBER 

    var currentStaff = document.querySelector(".staff-form");

    if (currentStaff) {

        currentStaff.onsubmit = function (e) {

            e.preventDefault();

            var name = document.getElementById("staff-name").value.trim();
            var photo = document.getElementById("photo").value;
            var dob = document.getElementById("dob").value.trim();
            var email = document.getElementById("email").value.trim();
            var expertise = document.getElementById("expertise").value.trim();
            var skills = document.getElementById("skills").value.trim();
            var education = document.getElementById("education").value.trim();

            if (name === "" || photo === "" || dob === "" || email === "" || expertise === "" || skills === "" || education === "") {
                alert("Please fill all required fields.");
                return;
            }

             if (/^[0-9]/.test(name)) {
            alert("Name cannot start with a number.");
            return;
        }

        if (!photo.match(/\.(jpg|jpeg|png|gif)/i)) {
            alert("Please upload an image file.");
            return;
        }
       

            staffMembers.push({
                name: name,
                photo: "images/default.jpg"
            });

            alert("New staff member added!");

            document.getElementById("staff-name").value = "";
            document.getElementById("photo").value = "";
            document.getElementById("dob").value = "";
            document.getElementById("email").value = "";
            document.getElementById("expertise").value = "";
            document.getElementById("skills").value = "";
            document.getElementById("education").value = "";

            loadStaff();
        };
    }
});


