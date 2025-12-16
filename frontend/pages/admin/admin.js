document.addEventListener('DOMContentLoaded', function () {
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

    // Check admin access
    const user = getCurrentUser();
    if (!user || user.Role !== 'Admin') {
        showNotification('Admin access required. Please log in with an admin account.', 'error');
        setTimeout(() => {
            window.location.href = "../login/login.html";
        }, 2000);
        return;
    }

    loadStatistics();
    loadProducts();
    loadOrders();
});

function loadStatistics() {
    const statsContainer = document.getElementById('admin-stats');
    if (!statsContainer) return;

    const stats = {
        totalRevenue: 25499.99,
        totalOrders: 42,
        totalProducts: window.MockData ? window.MockData.PRODUCTS.length : 15,
        totalUsers: 128
    };

    statsContainer.innerHTML = `
        <div class="stat-card">
            <h3>Total Revenue</h3>
            <p class="stat-value">${formatPrice(stats.totalRevenue)}</p>
        </div>
        <div class="stat-card">
            <h3>Total Orders</h3>
            <p class="stat-value">${stats.totalOrders}</p>
        </div>
        <div class="stat-card">
            <h3>Products</h3>
            <p class="stat-value">${stats.totalProducts}</p>
        </div>
        <div class="stat-card">
            <h3>Users</h3>
            <p class="stat-value">${stats.totalUsers}</p>
        </div>
    `;
}

function loadProducts() {
    const productsTable = document.getElementById('products-table');
    if (!productsTable) return;

    const products = window.MockData ? window.MockData.getProducts() : [];

    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;

    products.forEach(product => {
        html += `
            <tr>
                <td>${product.ProductID}</td>
                <td>${product.ProductName}</td>
                <td>${product.CategoryName}</td>
                <td>${formatPrice(product.BasePrice)}</td>
                <td><span class="status-badge status-${product.Status.toLowerCase()}">${product.Status}</span></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    productsTable.innerHTML = html;
}

function loadOrders() {
    const ordersTable = document.getElementById('orders-table');
    if (!ordersTable) return;

    const orders = [
        { OrderID: 1, UserName: 'Ahmed Mohamed', TotalAmount: 899.99, Status: 'Pending', OrderDate: '2025-12-15' },
        { OrderID: 2, UserName: 'Sara Mostafa', TotalAmount: 1299.99, Status: 'Processing', OrderDate: '2025-12-14' },
        { OrderID: 3, UserName: 'Mahmoud Hassan', TotalAmount: 449.99, Status: 'Shipped', OrderDate: '2025-12-14' },
        { OrderID: 4, UserName: 'Nourhan Ibrahim', TotalAmount: 699.99, Status: 'Delivered', OrderDate: '2025-12-13' },
        { OrderID: 5, UserName: 'Youssef Abdallah', TotalAmount: 1999.98, Status: 'Pending', OrderDate: '2025-12-13' },
    ];

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
    `;

    orders.forEach(order => {
        html += `
            <tr>
                <td>#${order.OrderID}</td>
                <td>${order.UserName}</td>
                <td>${formatPrice(order.TotalAmount)}</td>
                <td><span class="status-badge status-${order.Status.toLowerCase()}">${order.Status}</span></td>
                <td>${order.OrderDate}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    ordersTable.innerHTML = html;
}
