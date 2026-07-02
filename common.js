/* ==========================================
   SMARTLEARN COMMON.JS
   Dùng chung cho toàn bộ website
========================================== */

/* ========= STORAGE KEYS ========= */

const STORAGE = {

    USER: "currentUser",

    USERS: "users",

    TASKS: "tasks",

    CHECKINS: "checkins",

    FEEDBACK: "feedback",

    SCHEDULE: "schedule",

    CLASS_CODE: "classCode"

};

/* ==========================================
   STORAGE
========================================== */

function getData(key) {

    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) || [];

    } catch {

        return [];

    }

}

function saveData(key, data) {

    localStorage.setItem(

        key,

        JSON.stringify(data)

    );

}

/* ==========================================
   USER
========================================== */

function getCurrentUser() {

    return JSON.parse(

        localStorage.getItem(
            STORAGE.USER
        )

    );

}

function setCurrentUser(user) {

    localStorage.setItem(

        STORAGE.USER,

        JSON.stringify(user)

    );

}

function getUsers() {

    return getData(
        STORAGE.USERS
    );

}

function saveUsers(users) {

    saveData(
        STORAGE.USERS,
        users
    );

}

/* ==========================================
   TASK
========================================== */

function getTasks() {

    return getData(
        STORAGE.TASKS
    );

}

function saveTasks(tasks) {

    saveData(
        STORAGE.TASKS,
        tasks
    );

}

/* ==========================================
   FEEDBACK
========================================== */

function getFeedback() {

    return getData(
        STORAGE.FEEDBACK
    );

}

function saveFeedback(posts) {

    saveData(
        STORAGE.FEEDBACK,
        posts
    );

}

/* ==========================================
   CHECK-IN
========================================== */

function getCheckins() {

    return getData(
        STORAGE.CHECKINS
    );

}

function saveCheckins(checkins) {

    saveData(
        STORAGE.CHECKINS,
        checkins
    );

}

/* ==========================================
   SCHEDULE
========================================== */

function getSchedules() {

    return getData(
        STORAGE.SCHEDULE
    );

}

function saveSchedules(schedule) {

    saveData(
        STORAGE.SCHEDULE,
        schedule
    );

}

/* ==========================================
   CLASS
========================================== */

function getClassCode() {

    return localStorage.getItem(
        STORAGE.CLASS_CODE
    );

}

function setClassCode(code) {

    localStorage.setItem(

        STORAGE.CLASS_CODE,

        code

    );

}

/* ==========================================
   THỐNG KÊ
========================================== */

function countMembers() {

    return getUsers().length;

}

function countTasks() {

    return getTasks().length;

}

function countFeedback() {

    return getFeedback().length;

}

function completedTasks() {

    return getTasks().filter(

        t => t.status === "done"

    ).length;

}

function pendingTasks() {

    return getTasks().filter(

        t => t.status !== "done"

    ).length;

}

function progressPercent() {

    const tasks =
        getTasks();

    if (tasks.length === 0)

        return 0;

    return Math.round(

        completedTasks()
        / tasks.length * 100

    );

}

/* ==========================================
   TEAM ENERGY
========================================== */

function calculateEnergy() {

    const checkins =
        getCheckins();

    if (checkins.length === 0)

        return 0;

    let total = 0;

    checkins.forEach(c => {

        switch (c.mood) {

            case "happy":

                total += 100;

                break;

            case "good":

                total += 90;

                break;

            case "normal":

                total += 70;

                break;

            case "tired":

                total += 50;

                break;

            case "sad":

                total += 30;

                break;

            default:

                total += 70;

        }

    });

    return Math.round(

        total / checkins.length

    );

}

/* ==========================================
   CHECK-IN HÔM NAY
========================================== */

function todayCheckins() {

    const today =
        new Date()
        .toISOString()
        .split("T")[0];

    return getCheckins().filter(

        c => c.date === today

    ).length;

}

/* ==========================================
   FEEDBACK GẦN NHẤT
========================================== */

function latestFeedback() {

    const posts =
        getFeedback();

    if (posts.length === 0)

        return null;

    return posts[0];

}

/* ==========================================
   CHECK-IN GẦN NHẤT
========================================== */

function latestCheckin() {

    const list =
        getCheckins();

    if (list.length === 0)

        return null;

    return list[
        list.length - 1
    ];

}

/* ==========================================
   DEADLINE GẦN NHẤT
========================================== */

function nearestDeadline() {

    const tasks =
        getTasks();

    if (tasks.length === 0)

        return null;

    const sorted = [...tasks];

    sorted.sort(

        (a, b) =>

            new Date(a.deadline)
            -
            new Date(b.deadline)

    );

    return sorted[0];

}