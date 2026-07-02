// ======================================
// SMARTLEARN - LOGIN JAVASCRIPT
// ======================================

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

const loginBtn = document.querySelector(".login-btn");

const emailInput =
    document.querySelector("input[type='email']");

// ===============================
// HIỆN / ẨN MẬT KHẨU
// ===============================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

// ===============================
// KIỂM TRA EMAIL
// ===============================

function isValidEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

}

// ===============================
// ĐĂNG NHẬP
// ===============================

loginBtn.addEventListener("click", () => {

    const email =
        emailInput.value.trim();

    const passwordValue =
        password.value.trim();

    if (email === "") {

        alert("Vui lòng nhập Email!");

        emailInput.focus();

        return;

    }

    if (!isValidEmail(email)) {

        alert("Email không đúng định dạng!");

        emailInput.focus();

        return;

    }

    if (passwordValue === "") {

        alert("Vui lòng nhập mật khẩu!");

        password.focus();

        return;

    }

    loginBtn.innerHTML =
        "Đang đăng nhập...";

    loginBtn.disabled = true;

    setTimeout(() => {

        const users =
            JSON.parse(
                localStorage.getItem("users")
            ) || [];

        const user =
            users.find(

                u =>

                    u.email === email &&
                    u.password === passwordValue

            );

        if (!user) {

            alert(
                "Sai email hoặc mật khẩu!"
            );

            loginBtn.innerHTML =
                "Đăng nhập";

            loginBtn.disabled = false;

            return;

        }

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        alert(
            "Đăng nhập thành công!"
        );

        window.location.href =
            "profile.html";

    }, 1000);

});

// ===============================
// ENTER ĐỂ ĐĂNG NHẬP
// ===============================

document.addEventListener(
    "keydown",
    (e) => {

        if (e.key === "Enter") {

            loginBtn.click();

        }

    }
);