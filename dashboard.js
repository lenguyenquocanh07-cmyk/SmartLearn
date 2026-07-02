/* ==========================================
   SMARTLEARN DASHBOARD V4
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initDashboard();

});

function initDashboard() {

    loadUser();

    loadStatistics();

    loadProgress();

    loadDeadline();

    loadClassInfo();

    loadEnergy();

    loadMembers();

    loadClock();

    loadRecentActivity();

    setInterval(loadClock, 1000);

}

/* ==========================================
   USER
========================================== */

function loadUser() {

    const user = getCurrentUser();

    if (!user) return;

    const elements =
        document.querySelectorAll(".showUser");

    elements.forEach(item => {

        item.textContent =
            user.fullname;

    });

}

/* ==========================================
   STATISTICS
========================================== */

function loadStatistics() {

    const tasks =
        getTasks();

    const feedback =
        getFeedback();

    const users =
        getUsers();

    const energy =
        calculateEnergy();

    setText(
        "taskCount",
        tasks.length
    );

    setText(
        "memberCount",
        users.length
    );

    setText(
        "postCount",
        feedback.length
    );

    setText(
        "teamEnergy",
        energy + "%"
    );

    setText(
        "energyText",
        energy + "%"
    );

}

/* ==========================================
   MEMBERS
========================================== */

function loadMembers() {

    const users =
        getUsers();

    const memberList =
        document.getElementById(
            "memberList"
        );

    const leaderboard =
        document.getElementById(
            "leaderboard"
        );

    if (!memberList || !leaderboard)
        return;

    memberList.innerHTML = "";

    leaderboard.innerHTML = `

<tr>
    <th>Thành viên</th>
    <th>Đóng góp</th>
</tr>

`;

    users.forEach((user, index) => {

        // Member List
        memberList.innerHTML += `

<div class="member">

    <img src="images/avatar-default.png">

    <div>

        <h4>${user.fullname}</h4>

        <small>

            ${user.role === "leader"
                ? "👑 Nhóm trưởng"
                : "💻 Thành viên"}

        </small>

    </div>

    <span class="online"></span>

</div>

`;

        // Leaderboard
        const medal =

            index === 0 ? "🥇" :

            index === 1 ? "🥈" :

            index === 2 ? "🥉" :

            "🎖";

        const score =
            95 - index * 5;

        leaderboard.innerHTML += `

<tr>

    <td>

        ${medal}
        ${user.fullname}

    </td>

    <td>

        ${score}%

    </td>

</tr>

`;

    });

}

/* ==========================================
   PROGRESS
========================================== */

function loadProgress() {

    const tasks =
        getTasks();

    const done =
        tasks.filter(

            t => t.status === "done"

        ).length;

    let percent = 0;

    if (tasks.length !== 0) {

        percent = Math.round(

            done / tasks.length * 100

        );

    }

    const bar =
        document.getElementById(
            "progressBar"
        );

    if (bar) {

        bar.style.width =
            percent + "%";

    }

    setText(

        "progressText",

        percent + "%"

    );

}

/* ==========================================
   DEADLINE
========================================== */

function loadDeadline() {

    const box =
        document.getElementById(
            "deadlineBox"
        );

    if (!box) return;

    const task =
        nearestDeadline();

    if (task === null) {

        box.innerHTML = `

<h3>

🎉 Không có deadline

</h3>

<p>

Nhóm chưa tạo nhiệm vụ.

</p>

`;

        return;

    }

    const today =
        new Date();

    const deadline =
        new Date(task.deadline);

    const diff = Math.ceil(

        (deadline - today)

        /

        (1000 * 60 * 60 * 24)

    );

    let color = "#2563eb";

    let status = "";

    if (diff <= 1) {

        color = "#ef4444";

        status = "Khẩn cấp";

    }

    else if (diff <= 3) {

        color = "#f59e0b";

        status = "Sắp đến hạn";

    }

    else {

        status = "Đúng tiến độ";

    }

    box.innerHTML = `

<div
style="border-left:5px solid ${color};
padding-left:15px">

<h3>

${task.title}

</h3>

<p>

📅 ${formatDate(task.deadline)}

</p>

<p>

⏰ Còn ${diff} ngày

</p>

<strong style="color:${color}">

${status}

</strong>

</div>

`;

}

/* ==========================================
   ENERGY
========================================== */

function loadEnergy() {

    const energy =
        calculateEnergy();

    setText(
        "teamEnergy",
        energy + "%"
    );

    setText(
        "energyText",
        energy + "%"
    );

}

/* ==========================================
   CLOCK
========================================== */

function loadClock() {

    const now =
        new Date();

    const hour =
        now.getHours();

    const minute =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const second =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    setText(

        "currentTime",

        `${hour}:${minute}:${second}`

    );

}

/* ==========================================
   RECENT ACTIVITY
========================================== */

function loadRecentActivity() {

    const container =
        document.getElementById(
            "recentActivity"
        );

    if (!container)
        return;

    let activities = [];

    getTasks().forEach(task => {

        activities.push({

            icon: "📋",

            text: task.title

        });

    });

    getFeedback().forEach(feed => {

        activities.push({

            icon: "💬",

            text:
                feed.title ||
                "Bài viết mới"

        });

    });

    container.innerHTML = "";

    if (activities.length === 0) {

        container.innerHTML = `

<p>

Chưa có hoạt động.

</p>

`;

        return;

    }

    activities.slice(0, 5)

        .forEach(item => {

            container.innerHTML += `

<div class="activity-item">

<span>

${item.icon}

</span>

<p>

${item.text}

</p>

</div>

`;

        });

}

/* ==========================================
   UTIL
========================================== */

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}

function formatDate(date) {

    if (!date)
        return "--";

    return new Date(date)

        .toLocaleDateString(
            "vi-VN"
        );

}

/* ==========================================
   REFRESH
========================================== */

function refreshDashboard() {

    loadStatistics();

    loadProgress();

    loadDeadline();

    loadEnergy();

    loadMembers();

    loadClassInfo();

    loadRecentActivity();

}

window.addEventListener(

    "storage",

    refreshDashboard

);

setInterval(

    refreshDashboard,

    5000

);
/* ==========================================
   CLASS INFO
========================================== */

function loadClassInfo() {

    const user = getCurrentUser();

    if (!user) return;

    setText(
        "dashboardClassName",
        user.className || "Chưa cập nhật"
    );

    setText(
        "dashboardClassCode",
        user.classCode || "Chưa có mã lớp"
    );

    setText(
        "dashboardRole",
        user.role === "leader"
            ? "👑 Nhóm trưởng"
            : "💻 Thành viên"
    );

}
function loadClassInfo() {

    const user = getCurrentUser();

    if (!user) return;

    setText(
        "dashboardClassName",
        user.className || "Chưa cập nhật"
    );

    setText(
        "dashboardClassCode",
        user.classCode || "Chưa có mã lớp"
    );

    setText(
        "dashboardRole",
        user.role === "leader"
            ? "👑 Nhóm trưởng"
            : "💻 Thành viên"
    );

}