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

    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        showNotification('No product selected. Redirecting to shop...', 'error');
        setTimeout(() => {
            window.location.href = '../shop/shop.html';
        }, 1500);
        return;
    }

    // Load product from mock data
    const product = window.MockData.getProductById(parseInt(productId));
    const variants = window.MockData.getProductVariants(parseInt(productId));

    if (!product) {
        showNotification('Product not found. Redirecting to shop...', 'error');
        setTimeout(() => {
            window.location.href = '../shop/shop.html';
        }, 1500);
        return;
    }

    // Display product details
    displayProductDetails(product, variants);

    // Setup variant selection and add to cart
    setupInteractivity(product, variants);
});

function displayProductDetails(product, variants) {
    // Update page title
    document.title = `${product.ProductName} - Luxury Streetwear Store`;

    // Update product image
    const productImage = document.querySelector('.product-image img');
    if (productImage) {
        const imageURL = resolveImagePath(product.ImageURL);
        if (imageURL) {
            productImage.src = imageURL;
            productImage.alt = product.ProductName;
        }
    }

    // Update product info
    const productName = document.querySelector('.product-name');
    if (productName) productName.textContent = product.ProductName;

    const productPrice = document.querySelector('.product-price');
    if (productPrice) productPrice.textContent = formatPrice(product.BasePrice);

    const productCategory = document.querySelector('.product-category');
    if (productCategory) productCategory.textContent = product.CategoryName;

    const productDescription = document.querySelector('.product-description');
    if (productDescription) productDescription.textContent = product.Description;

    // Generate size options
    const sizeContainer = document.querySelector('.size-options');
    if (sizeContainer && variants.length > 0) {
        const sizes = [...new Set(variants.map(v => v.Size))];
        sizeContainer.innerHTML = '';
        sizes.forEach((size, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `size-option${index === 0 ? ' active' : ''}`;
            button.textContent = size;
            button.dataset.size = size;
            sizeContainer.appendChild(button);
        });
    }

    // Generate color options
    const colorContainer = document.querySelector('.color-options');
    if (colorContainer && variants.length > 0) {
        const colors = [...new Set(variants.map(v => v.Color))];
        colorContainer.innerHTML = '';
        colors.forEach((color, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = `color-option${index === 0 ? ' active' : ''}`;
            button.dataset.color = color;

            // Create color swatch circle
            const swatch = document.createElement('span');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = getColorHex(color);

            // Add swatch and text
            button.appendChild(swatch);
            button.appendChild(document.createTextNode(color));

            colorContainer.appendChild(button);
        });
    }

    updateStockStatus(variants);
}

function setupInteractivity(product, variants) {
    let selectedSize = null;
    let selectedColor = null;
    let selectedVariant = null;
    let quantity = 1;

    // Initialize with first variant
    const sizeButtons = document.querySelectorAll('.size-option');
    const colorButtons = document.querySelectorAll('.color-option');

    if (sizeButtons.length > 0) selectedSize = sizeButtons[0].dataset.size;
    if (colorButtons.length > 0) selectedColor = colorButtons[0].dataset.color;

    updateSelectedVariant();

    // Size selection
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            selectedSize = button.dataset.size;
            updateSelectedVariant();
        });
    });

    // Color selection
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            colorButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            selectedColor = button.dataset.color;
            updateSelectedVariant();
        });
    });

    // Quantity controls
    const qtyValue = document.getElementById('quantity-value');
    const qtyDecrease = document.getElementById('qty-decrease');
    const qtyIncrease = document.getElementById('qty-increase');

    if (qtyDecrease) {
        qtyDecrease.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                qtyValue.textContent = quantity;
            }
        });
    }

    if (qtyIncrease) {
        qtyIncrease.addEventListener('click', () => {
            const maxStock = selectedVariant ? selectedVariant.StockQuantity : 999;
            if (quantity < maxStock) {
                quantity++;
                qtyValue.textContent = quantity;
            } else {
                showNotification(`Only ${maxStock} items in stock`, 'error');
            }
        });
    }

    // Add to Cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            if (!selectedVariant) {
                showNotification('Please select size and color', 'error');
                return;
            }

            if (selectedVariant.StockQuantity < 1) {
                showNotification('This item is out of stock', 'error');
                return;
            }

            const cartItem = {
                variantId: selectedVariant.VariantID,
                productId: product.ProductID,
                productName: product.ProductName,
                size: selectedSize,
                color: selectedColor,
                price: product.BasePrice,
                quantity: quantity,
                maxStock: selectedVariant.StockQuantity,
                imageURL: product.ImageURL,
            };

            addToCart(cartItem);
            quantity = 1;
            qtyValue.textContent = quantity;
        });
    }

    function updateSelectedVariant() {
        if (!selectedSize || !selectedColor) {
            selectedVariant = null;
            return;
        }

        selectedVariant = variants.find(
            v => v.Size === selectedSize && v.Color === selectedColor
        );

        updateStockStatus(variants, selectedVariant);
        updateAddToCartButton(selectedVariant);
    }
}

function updateStockStatus(variants, selectedVariant = null) {
    const stockBadge = document.querySelector('.stock-badge');
    if (!stockBadge) return;

    if (selectedVariant) {
        if (selectedVariant.StockQuantity > 10) {
            stockBadge.textContent = 'In Stock';
            stockBadge.style.backgroundColor = '#00C851';
        } else if (selectedVariant.StockQuantity > 0) {
            stockBadge.textContent = `Only ${selectedVariant.StockQuantity} left`;
            stockBadge.style.backgroundColor = '#ff9800';
        } else {
            stockBadge.textContent = 'Out of Stock';
            stockBadge.style.backgroundColor = '#ff4444';
        }
    } else {
        // Show general stock status
        const totalStock = variants.reduce((sum, v) => sum + v.StockQuantity, 0);
        if (totalStock > 0) {
            stockBadge.textContent = 'In Stock';
            stockBadge.style.backgroundColor = '#00C851';
        } else {
            stockBadge.textContent = 'Out of Stock';
            stockBadge.style.backgroundColor = '#ff4444';
        }
    }
}

function updateAddToCartButton(variant) {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (!addToCartBtn) return;

    if (!variant || variant.StockQuantity < 1) {
        addToCartBtn.disabled = true;
        addToCartBtn.style.opacity = '0.5';
        addToCartBtn.style.cursor = 'not-allowed';
    } else {
        addToCartBtn.disabled = false;
        addToCartBtn.style.opacity = '1';
        addToCartBtn.style.cursor = 'pointer';
    }
}

function getColorHex(colorName) {
    const colorMap = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Grey': '#808080',
        'Gray': '#808080',
        'Blue': '#0000FF',
        'Red': '#FF0000',
        'Green': '#00FF00',
        'Gold': '#D4AF37',
    };
    return colorMap[colorName] || '#CCCCCC';
}
