/* ==========================================
   SMARTLEARN CHECK-IN V2
========================================== */

let selectedMood = null;

document.addEventListener("DOMContentLoaded", () => {

    loadUser();

    setupMoodCards();

    loadTodayCheckins();

});

/* ==========================================
   HIỂN THỊ USER
========================================== */

function loadUser() {

    const user = getCurrentUser();

    if (user) {

        document.getElementById("userName").textContent =
            user.fullname;

    }

}

/* ==========================================
   CHỌN MOOD
========================================== */

function setupMoodCards() {

    const cards =
        document.querySelectorAll(".mood-card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            cards.forEach(c =>
                c.classList.remove("active")
            );

            card.classList.add("active");

            selectedMood =
                card.dataset.mood;

        });

    });

}

/* ==========================================
   LƯU CHECK-IN
========================================== */

function saveCheckin() {

    if (selectedMood === null) {

        alert("Vui lòng chọn tâm trạng!");

        return;

    }

    const note =
        document
            .getElementById("checkinNote")
            .value
            .trim();

    const user =
        getCurrentUser();

    if (!user) {

        alert("Bạn chưa đăng nhập!");

        window.location.href =
            "login.html";

        return;

    }

    let checkins =
        getCheckins();

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    // Mỗi người chỉ check-in 1 lần/ngày
    checkins =
        checkins.filter(item => !(

            item.user === user.fullname &&
            item.date === today

        ));

    checkins.push({

        user: user.fullname,

        email: user.email,

        mood: selectedMood,

        note,

        date: today,

        time:
            new Date()
                .toLocaleTimeString("vi-VN")

    });

    saveCheckins(checkins);

    alert("Check-in thành công!");

    document.getElementById(
        "checkinNote"
    ).value = "";

    selectedMood = null;

    document
        .querySelectorAll(".mood-card")
        .forEach(card =>
            card.classList.remove("active")
        );

    loadTodayCheckins();

}

/* ==========================================
   LOAD HÔM NAY
========================================== */

function loadTodayCheckins() {

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    const checkins =
        getCheckins().filter(

            item =>
                item.date === today

        );

    updateMembers(checkins);

    updateStats(checkins);

    updateHistory(checkins);

}

/* ==========================================
   THÀNH VIÊN
========================================== */

function updateMembers(checkins) {

    const memberBox =
        document.getElementById(
            "memberList"
        );

    if (!memberBox) return;

    memberBox.innerHTML = "";

    const members =
        [...new Set(

            getUsers().map(
                user => user.fullname
            )

        )];

    members.forEach(name => {

        const item =
            checkins.find(
                c => c.user === name
            );

        const div =
            document.createElement("div");

        div.className =
            "member";

        div.innerHTML = `

<div class="avatar">

${getInitial(name)}

</div>

<div class="info">

<h3>${name}</h3>

<small>

${item ? "Đã Check-in" : "Chưa Check-in"}

</small>

</div>

<span class="status ${item ? "checked" : "waiting"}">

${item ? moodText(item.mood) : "Chưa Check-in"}

</span>

`;

        memberBox.appendChild(div);

    });

}

/* ==========================================
   THỐNG KÊ
========================================== */

function updateStats(checkins) {

    const totalUsers =
        getUsers().length;

    const checkinCount =
        document.getElementById(
            "checkinCount"
        );

    const teamEnergy =
        document.getElementById(
            "teamEnergy"
        );

    const streakDay =
        document.getElementById(
            "streakDay"
        );

    if (checkinCount) {

        checkinCount.textContent =
            `${checkins.length}/${totalUsers}`;

    }

    if (teamEnergy) {

        teamEnergy.textContent =
            calculateEnergy() + "%";

    }

    if (streakDay) {

        streakDay.textContent =
            checkins.length;

    }

}

/* ==========================================
   LỊCH SỬ
========================================== */

function updateHistory(checkins) {

    const history =
        document.getElementById(
            "historyList"
        );

    if (!history) return;

    history.innerHTML = "";

    if (checkins.length === 0) {

        history.innerHTML = `

<div class="history-item">

<i class="fa-solid fa-circle-info"></i>

<p>Chưa có Check-in hôm nay.</p>

</div>

`;

        return;

    }

    checkins.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "history-item";

        div.innerHTML = `

<i class="fa-solid fa-clock"></i>

<p>

<strong>${item.user}</strong>

${moodEmoji(item.mood)}

(${item.time})

<br>

${item.note || "Không có ghi chú."}

</p>

`;

        history.appendChild(div);

    });

}

/* ==========================================
   HỖ TRỢ
========================================== */

function moodEmoji(mood) {

    switch (mood) {

        case "happy":
            return "😁";

        case "good":
            return "😊";

        case "normal":
            return "🙂";

        case "tired":
            return "😴";

        case "sad":
            return "😔";

        default:
            return "🙂";

    }

}

function moodText(mood) {

    switch (mood) {

        case "happy":
            return "😁 Rất tốt";

        case "good":
            return "😊 Vui vẻ";

        case "normal":
            return "🙂 Bình thường";

        case "tired":
            return "😴 Mệt";

        case "sad":
            return "😔 Căng thẳng";

        default:
            return "Đã Check-in";

    }

}

function getInitial(name) {

    return name

        .split(" ")

        .map(word => word[0])

        .join("")

        .toUpperCase();

}