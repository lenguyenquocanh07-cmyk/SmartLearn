// ======================================
// SMARTLEARN - REGISTER JAVASCRIPT
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const btn =
        document.querySelector(".register-btn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const inputs =
            document.querySelectorAll("input");

        const fullname =
            inputs[0].value.trim();

        const birthday =
            document
                .getElementById("birthday")
                .value
                .trim();

        const phone =
            inputs[2].value.trim();

        const university =
            inputs[3].value.trim();

        const faculty =
            inputs[4].value.trim();

        const className =
            inputs[5].value.trim();

        const email =
            document
                .querySelector(
                    "input[type='email']"
                )
                .value
                .trim();

        const password =
            document
                .getElementById("password")
                .value
                .trim();

        const confirmPassword =
            document
                .getElementById(
                    "confirmPassword"
                )
                .value
                .trim();

        const gender =
            document
                .querySelector("select")
                .value;

        const agree =
            document
                .querySelector(
                    ".agree input"
                );

        // ==========================
        // VALIDATE
        // ==========================

        if (

            !fullname ||
            !birthday ||
            !phone ||
            !university ||
            !faculty ||
            !className ||
            !email ||
            !password ||
            !confirmPassword

        ) {

            alert(
                "Vui lòng nhập đầy đủ thông tin!"
            );

            return;

        }

        if (!agree.checked) {

            alert(
                "Bạn phải đồng ý điều khoản sử dụng!"
            );

            return;

        }

        if (

            password !==
            confirmPassword

        ) {

            alert(
                "Mật khẩu xác nhận không khớp!"
            );

            return;

        }

        let users =
            JSON.parse(
                localStorage.getItem(
                    "users"
                )
            ) || [];

        const existed =
            users.find(

                u =>
                    u.email === email

            );

        if (existed) {

            alert(
                "Email đã tồn tại!"
            );

            return;

        }

        // ==========================
        // TẠO USER
        // ==========================

        const user = {

            id: Date.now(),

            fullname,

            birthday,

            gender,

            phone,

            university,

            faculty,

            className,

            email,

            password

        };

        users.push(user);

        localStorage.setItem(

            "users",

            JSON.stringify(users)

        );

        alert(

            "Đăng ký thành công!"

        );

        window.location.href =

            "login.html";

    });

});