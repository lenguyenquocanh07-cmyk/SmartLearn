/* ==========================================
   SMARTLEARN PROFILE
========================================== */

const leaderRadio =
    document.querySelector(
        "input[value='leader']"
    );

const memberRadio =
    document.querySelector(
        "input[value='member']"
    );

const leaderBox =
    document.getElementById(
        "leaderBox"
    );

const memberBox =
    document.getElementById(
        "memberBox"
    );

const createBtn =
    document.querySelector(
        ".create-btn"
    );

const classCode =
    document.getElementById(
        "classCode"
    );

const nextBtn =
    document.querySelector(
        ".next-btn"
    );

/* ==========================================
   LOAD USER
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const user =
            getCurrentUser();

        if (!user) return;

        const inputs =
            document.querySelectorAll(
                ".input-group input"
            );

        // Họ tên
        if (inputs[0]) {

            inputs[0].value =
                user.fullname || "";

        }

        // Email
        if (inputs[1]) {

            inputs[1].value =
                user.email || "";

        }

        // Trường
        if (inputs[2]) {

            inputs[2].value =
                user.school || "";

        }

        // Lớp
        if (inputs[3]) {

            inputs[3].value =
                user.className || "";

        }

        // Vai trò
        if (user.role === "leader") {

            leaderRadio.checked = true;

            leaderBox.classList.remove(
                "hidden"
            );

            memberBox.classList.add(
                "hidden"
            );

            classCode.innerText =
                user.classCode ||
                "------";

        }

        else {

            memberRadio.checked = true;

            leaderBox.classList.add(
                "hidden"
            );

            memberBox.classList.remove(
                "hidden"
            );

            const joinInput =
                document.querySelector(
                    "#memberBox input"
                );

            if (joinInput) {

                joinInput.value =
                    user.classCode || "";

            }

        }

    }
);

/* ==========================================
   ROLE CHANGE
========================================== */

leaderRadio.addEventListener(
    "change",
    () => {

        leaderBox.classList.remove(
            "hidden"
        );

        memberBox.classList.add(
            "hidden"
        );

    }
);

memberRadio.addEventListener(
    "change",
    () => {

        leaderBox.classList.add(
            "hidden"
        );

        memberBox.classList.remove(
            "hidden"
        );

    }
);

/* ==========================================
   GENERATE CLASS CODE
========================================== */

function generateCode() {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "SL-";

    for (let i = 0; i < 6; i++) {

        code += chars.charAt(

            Math.floor(
                Math.random()
                * chars.length
            )

        );

    }

    return code;

}

createBtn.addEventListener(
    "click",
    () => {

        const code =
            generateCode();

        classCode.innerText =
            code;

    }
);

/* ==========================================
   SAVE PROFILE
========================================== */

nextBtn.addEventListener(
    "click",
    () => {

        const inputs =
            document.querySelectorAll(
                ".input-group input"
            );

        const school =
            inputs[2]?.value.trim();

        const className =
            inputs[3]?.value.trim();

        if (!school) {

            alert(
                "Vui lòng nhập trường!"
            );

            return;

        }

        if (!className) {

            alert(
                "Vui lòng nhập lớp!"
            );

            return;

        }

        const user =
            getCurrentUser();

        if (!user) return;

        user.school =
            school;

        user.className =
            className;

        user.role =
            leaderRadio.checked
                ? "leader"
                : "member";

        if (
            user.role === "leader"
        ) {

            if (
                classCode.innerText ===
                "------"
            ) {

                alert(
                    "Hãy tạo mã lớp!"
                );

                return;

            }

            user.classCode =
                classCode.innerText;

        }

        else {

            const joinInput =
                document.querySelector(
                    "#memberBox input"
                );

            if (!joinInput.value.trim()) {

                alert(
                    "Vui lòng nhập mã lớp!"
                );

                return;

            }

            user.classCode =
                joinInput.value.trim();

        }

        setCurrentUser(user);

        const users =
            getUsers();

        const index =
            users.findIndex(

                u =>
                u.email ===
                user.email

            );

        if (index !== -1) {

            users[index] =
                user;

            saveUsers(users);

        }

        alert(
            "Lưu hồ sơ thành công!"
        );

        window.location.href =
            "dashboard.html";

    }
);