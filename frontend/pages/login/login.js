document.addEventListener("DOMContentLoaded", function () {
    // Load navbar and footer
    fetch("../../components/navbar.html")
        .then((res) => res.text())
        .then((html) => {
            document.getElementById("navbar").innerHTML = html;
            if (typeof initNavbar === 'function') initNavbar();
            if (typeof updateCartCount === 'function') updateCartCount();
            if (typeof updateUserUI === 'function') updateUserUI();
        });

    fetch("../../components/footer.html")
        .then((res) => res.text())
        .then((html) => {
            document.getElementById("footer").innerHTML = html;
            if (typeof updateUserUI === 'function') updateUserUI();
        });

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Toggle forms
    document.getElementById("showRegister").onclick = () => {
        loginForm.classList.remove("active");
        registerForm.classList.add("active");
    };

    document.getElementById("showLogin").onclick = () => {
        registerForm.classList.remove("active");
        loginForm.classList.add("active");
    };

    // Login
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = this.querySelector("input[type='email']").value;
            const password = this.querySelector("input[type='password']").value;

            if (!email || !password) {
                if (typeof showNotification === 'function') {
                    showNotification("Please enter email and password", "error");
                }
                return;
            }

            const user = {
                UserID: 1,
                FullName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                Email: email,
                Role: email.toLowerCase().includes('admin') ? 'Admin' : 'Customer',
                PhoneNumber: '1234567890'
            };

            saveUser(user);
            if (typeof showNotification === 'function') {
                showNotification(`Welcome ${user.FullName}!`, "success");
            }

            setTimeout(() => {
                if (user.Role === 'Admin') {
                    window.location.href = "../admin/admin.html";
                } else {
                    window.location.href = "../home/home.html";
                }
            }, 1000);
        });
    }

    // Register
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const fullName = this.querySelector("input[type='text']").value;
            const email = this.querySelector("input[type='email']").value;
            const password = this.querySelector("input[type='password']").value;

            if (!fullName || !email || !password) {
                if (typeof showNotification === 'function') {
                    showNotification("Please fill all fields", "error");
                }
                return;
            }

            const user = {
                UserID: Math.floor(Math.random() * 1000) + 2,
                FullName: fullName,
                Email: email,
                Role: 'Customer',
                PhoneNumber: '0123456789'
            };

            saveUser(user);
            if (typeof showNotification === 'function') {
                showNotification(`Registration successful! Welcome ${user.FullName}!`, "success");
            }

            setTimeout(() => {
                window.location.href = "../home/home.html";
            }, 1000);
        });
    }
});