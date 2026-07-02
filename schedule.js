/* ==========================================
   SMARTLEARN SCHEDULE V2
========================================== */

let schedules = [];

document.addEventListener("DOMContentLoaded", () => {

    loadSchedules();

});

/* ==========================================
   LOAD
========================================== */

function loadSchedules() {

    schedules = getSchedules();

    renderSchedules();

}

/* ==========================================
   SAVE
========================================== */

function updateStorage() {

    saveSchedules(schedules);

}

/* ==========================================
   ADD
========================================== */

function addSchedule() {

    const date =
        document.getElementById("scheduleDate").value;

    const start =
        document.getElementById("startTime").value;

    const end =
        document.getElementById("endTime").value;

    const note =
        document
            .getElementById("scheduleNote")
            .value
            .trim();

    if (!date || !start || !end) {

        alert("Vui lòng nhập đầy đủ thông tin!");

        return;

    }

    if (start >= end) {

        alert("Giờ kết thúc phải lớn hơn giờ bắt đầu!");

        return;

    }

    const currentUser = getCurrentUser();

    if (!currentUser) {

        alert("Vui lòng đăng nhập!");

        window.location.href = "login.html";

        return;

    }

    const schedule = {

        id: Date.now(),

        fullname: currentUser.fullname,

        email: currentUser.email,

        role: currentUser.role || "member",

        date,

        start,

        end,

        note,

        createdAt: new Date().toLocaleString("vi-VN")

    };

    schedules.unshift(schedule);

    updateStorage();

    clearForm();

    renderSchedules();

}

/* ==========================================
   RENDER
========================================== */

function renderSchedules() {

    const container =
        document.getElementById("scheduleContainer");

    container.innerHTML = "";

    if (schedules.length === 0) {

        container.innerHTML = `

        <div class="schedule-card">

            <p style="text-align:center">

                Chưa có lịch rảnh nào.

            </p>

        </div>

        `;

        updateStats();

        return;

    }

    schedules.forEach(item => {

        container.innerHTML += `

<div class="schedule-card">

<div class="schedule-header">

<div class="user">

<div class="avatar">

${getInitial(item.fullname)}

</div>

<div class="user-info">

<h3>${item.fullname}</h3>

<span>${item.createdAt}</span>

</div>

</div>

<div class="time-badge">

${item.start} - ${item.end}

</div>

</div>

<div class="schedule-body">

<p>

<strong>📅 Ngày:</strong>

${formatDate(item.date)}

</p>

<p>

<strong>📝 Ghi chú:</strong>

${item.note || "Không có"}

</p>

</div>

<div class="schedule-actions">

${renderDeleteButton(item)}

</div>

</div>

`;

    });

    updateStats();

}

/* ==========================================
   DELETE
========================================== */

function deleteSchedule(id) {

    if (!confirm("Bạn muốn xóa lịch này?"))

        return;

    schedules =
        schedules.filter(
            s => s.id !== id
        );

    updateStorage();

    renderSchedules();

}

/* ==========================================
   PERMISSION
========================================== */

function renderDeleteButton(item) {

    const current =
        getCurrentUser();

    if (!current)

        return "";

    if (

        current.email === item.email ||

        current.role === "leader"

    ) {

        return `

<button
class="delete-btn"
onclick="deleteSchedule(${item.id})">

<i class="fa-solid fa-trash"></i>

Xóa

</button>

`;

    }

    return "";

}

/* ==========================================
   STATS
========================================== */

function updateStats() {

    const totalElement =
        document.getElementById("totalSchedules");

    const memberElement =
        document.getElementById("memberSchedules");

    const todayElement =
        document.getElementById("todaySchedules");

    if (totalElement) {

        totalElement.textContent =
            schedules.length;

    }

    const members =
        new Set(
            schedules.map(
                s => s.email
            )
        );

    if (memberElement) {

        memberElement.textContent =
            members.size;

    }

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    if (todayElement) {

        todayElement.textContent =

            schedules.filter(

                s => s.date === today

            ).length;

    }

}

/* ==========================================
   UTIL
========================================== */

function clearForm() {

    document.getElementById("scheduleDate").value = "";

    document.getElementById("startTime").value = "";

    document.getElementById("endTime").value = "";

    document.getElementById("scheduleNote").value = "";

}

function formatDate(date) {

    const d = new Date(date);

    return d.toLocaleDateString("vi-VN");

}

function getInitial(name) {

    return name

        .split(" ")

        .map(

            word => word.charAt(0)

        )

        .join("")

        .toUpperCase();

}