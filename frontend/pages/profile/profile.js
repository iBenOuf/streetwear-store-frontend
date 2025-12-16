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

    // Check if user is logged in
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "../login/login.html";
        return;
    }

    // If admin, redirect to admin page
    if (user.Role === 'Admin') {
        window.location.href = "../admin/admin.html";
        return;
    }

    // Populate profile info
    const avatar = document.getElementById('profile-avatar');
    const name = document.getElementById('profile-name');
    const email = document.getElementById('profile-email');
    const role = document.getElementById('profile-role');

    if (avatar) avatar.textContent = user.FullName.charAt(0).toUpperCase();
    if (name) name.textContent = user.FullName;
    if (email) email.textContent = user.Email;
    if (role) role.textContent = user.Role;
});
