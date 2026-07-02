/* ==========================================
   SMARTLEARN TASK V4
========================================== */

let tasks = [];

document.addEventListener("DOMContentLoaded", () => {

    tasks = getTasks();

    setMinDate();

    renderTasks();

});

/* ==========================================
   GIỚI HẠN DEADLINE
========================================== */

function setMinDate() {

    const input =
        document.getElementById(
            "taskDeadline"
        );

    if (!input) return;

    const today =
        new Date()
            .toISOString()
            .split("T")[0];

    input.min = today;

}

/* ==========================================
   THÊM NHIỆM VỤ
========================================== */

function addTask() {

    const title =
        document
            .getElementById(
                "taskTitle"
            )
            .value
            .trim();

    const member =
        document
            .getElementById(
                "taskMember"
            )
            .value;

    const deadline =
        document
            .getElementById(
                "taskDeadline"
            )
            .value;

    if (!title || !deadline) {

        alert(
            "Vui lòng nhập đầy đủ thông tin!"
        );

        return;

    }

    const task = {

        id: Date.now(),

        title,

        member,

        deadline,

        status: "todo",

        createdAt:
            new Date()
                .toLocaleString("vi-VN")

    };

    tasks.push(task);

    saveTasks(tasks);

    clearForm();

    renderTasks();

}

/* ==========================================
   HIỂN THỊ TASK
========================================== */

function renderTasks() {

    tasks = getTasks();

    const todoList =
        document.getElementById(
            "todoList"
        );

    const doingList =
        document.getElementById(
            "doingList"
        );

    const doneList =
        document.getElementById(
            "doneList"
        );

    todoList.innerHTML = "";
    doingList.innerHTML = "";
    doneList.innerHTML = "";

    let todo = 0;
    let doing = 0;
    let done = 0;

    tasks.forEach(task => {

        const card =
            createCard(task);

        if (task.status === "todo") {

            todo++;

            todoList.appendChild(card);

        }

        else if (
            task.status === "doing"
        ) {

            doing++;

            doingList.appendChild(card);

        }

        else {

            done++;

            doneList.appendChild(card);

        }

    });

    updateSummary(
        todo,
        doing,
        done
    );

}

/* ==========================================
   TẠO CARD
========================================== */

function createCard(task) {

    const div =
        document.createElement(
            "div"
        );

    div.className =
        "task-card";

    div.innerHTML = `

<h3>${task.title}</h3>

<p>👤 ${task.member}</p>

<p>📅 ${formatDate(task.deadline)}</p>

<div class="task-actions">

${
task.status !== "done"
?

`<button onclick="nextStatus(${task.id})">

➜

</button>`

:

""

}

<button onclick="deleteTask(${task.id})">

🗑

</button>

</div>

`;

    return div;

}

/* ==========================================
   CHUYỂN TRẠNG THÁI
========================================== */

function nextStatus(id) {

    const task =
        tasks.find(
            t => t.id === id
        );

    if (!task) return;

    if (
        task.status === "todo"
    ) {

        task.status = "doing";

    }

    else if (
        task.status === "doing"
    ) {

        task.status = "done";

    }

    saveTasks(tasks);

    renderTasks();

}

/* ==========================================
   XÓA TASK
========================================== */

function deleteTask(id) {

    if (
        !confirm(
            "Bạn có chắc muốn xóa nhiệm vụ này?"
        )
    ) return;

    tasks =
        tasks.filter(
            task =>
                task.id !== id
        );

    saveTasks(tasks);

    renderTasks();

}

/* ==========================================
   THỐNG KÊ
========================================== */

function updateSummary(
    todo,
    doing,
    done
) {

    document.getElementById(
        "todoCount"
    ).textContent = todo;

    document.getElementById(
        "doingCount"
    ).textContent = doing;

    document.getElementById(
        "doneCount"
    ).textContent = done;

    document.getElementById(
        "totalTask"
    ).textContent =
        tasks.length;

    document.getElementById(
        "totalDoing"
    ).textContent =
        doing;

    document.getElementById(
        "totalDone"
    ).textContent =
        done;

}

/* ==========================================
   FORMAT DATE
========================================== */

function formatDate(date) {

    if (!date)
        return "";

    const d =
        new Date(date);

    return d.toLocaleDateString(
        "vi-VN"
    );

}

/* ==========================================
   XÓA FORM
========================================== */

function clearForm() {

    document.getElementById(
        "taskTitle"
    ).value = "";

    document.getElementById(
        "taskDeadline"
    ).value = "";

    document.getElementById(
        "taskMember"
    ).selectedIndex = 0;

}