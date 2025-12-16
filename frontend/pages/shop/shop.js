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

    let allProducts = [];
    let filteredProducts = [];
    let currentCategory = null;
    let currentSearch = "";

    // Load products from mock data
    function loadProducts() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');

        if (categoryParam) {
            currentCategory = parseInt(categoryParam);
            allProducts = window.MockData.getProductsByCategory(currentCategory, "Active");
        } else {
            allProducts = window.MockData.getProducts("Active");
        }

        filteredProducts = [...allProducts];
        displayProducts();
        updateActiveFilter();
    }

    // Display products
    function displayProducts() {
        const container = document.querySelector('.products-grid');

        if (!container) {
            console.error("Products grid container not found");
            return;
        }

        container.innerHTML = "";

        if (filteredProducts.length === 0) {
            container.innerHTML = '<p class="text-center">No products found</p>';
            return;
        }

        for (const product of filteredProducts) {
            const card = createProductCard(product);
            container.appendChild(card);
        }
    }

    // Filter functionality
    const filterItems = document.querySelectorAll('.filter-list li');

    filterItems.forEach(item => {
        item.addEventListener('click', function () {
            filterItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            if (category === 'all') {
                currentCategory = null;
                filteredProducts = allProducts.filter(p =>
                    p.ProductName.toLowerCase().includes(currentSearch) ||
                    p.Description.toLowerCase().includes(currentSearch)
                );
            } else {
                currentCategory = parseInt(category);
                filteredProducts = allProducts.filter(p =>
                    p.CategoryID == currentCategory &&
                    (p.ProductName.toLowerCase().includes(currentSearch) ||
                        p.Description.toLowerCase().includes(currentSearch))
                );
            }

            displayProducts();
        });
    });

    // Update active filter on load
    function updateActiveFilter() {
        if (currentCategory) {
            filterItems.forEach(item => {
                if (item.dataset.category == currentCategory) {
                    filterItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                }
            });
        }
    }

    // Search functionality
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            currentSearch = e.target.value.toLowerCase();

            if (currentSearch === "") {
                if (currentCategory) {
                    filteredProducts = allProducts.filter(p => p.CategoryID == currentCategory);
                } else {
                    filteredProducts = [...allProducts];
                }
            } else {
                if (currentCategory) {
                    filteredProducts = allProducts.filter(p =>
                        p.CategoryID == currentCategory &&
                        (p.ProductName.toLowerCase().includes(currentSearch) ||
                            p.Description.toLowerCase().includes(currentSearch))
                    );
                } else {
                    filteredProducts = allProducts.filter(p =>
                        p.ProductName.toLowerCase().includes(currentSearch) ||
                        p.Description.toLowerCase().includes(currentSearch)
                    );
                }
            }

            displayProducts();
        });
    }

    // Initialize
    loadProducts();

    // Filter chevron toggle functionality
    const filterHeaders = document.querySelectorAll('.filter-header');
    filterHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const filterBox = this.parentElement;
            const filterList = filterBox.querySelector('.filter-list');
            const chevron = this.querySelector('i');

            if (filterList) {
                // Toggle visibility
                if (filterList.style.display === 'none') {
                    filterList.style.display = 'block';
                    chevron.classList.remove('fa-chevron-down');
                    chevron.classList.add('fa-chevron-up');
                } else {
                    filterList.style.display = 'none';
                    chevron.classList.remove('fa-chevron-up');
                    chevron.classList.add('fa-chevron-down');
                }
            }
        });
    });
});
