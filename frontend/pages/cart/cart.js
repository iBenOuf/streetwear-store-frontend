// Cart page

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

    // Wire buttons that exist on initial render
    document.addEventListener('click', globalClickHandler);
    loadCartItems();

    // buttons in summary
    const checkoutBtn = document.getElementById('checkout-btn');
    const continueBtn = document.getElementById('continue-btn');

    if (checkoutBtn) checkoutBtn.addEventListener('click', onCheckout);
    if (continueBtn) continueBtn.addEventListener('click', () => {
        window.location.href = '../shop/shop.html';
    });
});

function globalClickHandler(e) {
    // delegate for dynamic elements (qty and remove)
    const plus = e.target.closest('[data-action="qty-plus"]');
    const minus = e.target.closest('[data-action="qty-minus"]');
    const remove = e.target.closest('[data-action="remove-item"]');
    const productImage = e.target.closest('.img-wrap');
    const productName = e.target.closest('.product-name');

    if (plus) {
        const id = plus.dataset.id;
        const current = parseInt(plus.dataset.qty, 10) || 1;
        updateQuantity(id, current + 1);
    } else if (minus) {
        const id = minus.dataset.id;
        const current = parseInt(minus.dataset.qty, 10) || 1;
        updateQuantity(id, Math.max(1, current - 1));
    } else if (remove) {
        const id = remove.dataset.id;
        removeItem(id);
    } else if (productImage || productName) {
        // Navigate to product page
        const cartItem = (productImage || productName).closest('.cart-item');
        if (cartItem && cartItem.dataset.productId) {
            window.location.href = `/frontend/pages/product/product.html?id=${cartItem.dataset.productId}`;
        }
    }
}

function loadCartItems() {
    const container = document.getElementById('cart-container');
    if (!container) return;

    const cart = (typeof StreetStore !== 'undefined' && StreetStore.getCart) ? StreetStore.getCart() : [];
    container.innerHTML = '';

    if (!cart || cart.length === 0) {
        container.innerHTML = emptyStateHTML();
        // hide summary totals when empty but keep layout
        setSummaryValues(0);
        updateCheckoutButtonState(false);
        return;
    }

    // build items
    for (const item of cart) {
        const el = createCartItemElement(item);
        container.appendChild(el);
    }

    // update totals
    updateSummary();
    updateCheckoutButtonState(true);

    // notify navbar count update if available
    if (typeof updateCartCount === 'function') updateCartCount();
}

function emptyStateHTML() {
    return `
    <div class="empty-state">
      <p>Your cart is currently empty.</p>
      <button id="start-shopping" class="btn btn-primary" onclick="window.location.href='/frontend/pages/shop/shop.html'">Start Shopping</button>
    </div>
  `;
}

function createCartItemElement(item) {
    // expected item shape: { id, variantId?, name, price, qty, image }
    // product.js sends: { productId, variantId, productName, size, color, price, quantity, imagePath }

    const id = item.id || item.variantId || item.variant_id || item.sku;
    const qty = item.qty || item.quantity || 1;
    const name = item.name || item.productName || 'Product';

    // Handle image path - use placeholder if null/undefined
    let imgURL = item.imageURL || item.ImageURL || item.image || item.ImagePath || item.imagePath || '';

    // Resolve URL using global helper if available
    if (typeof resolveImagePath === 'function') {
        imgURL = resolveImagePath(imgURL);
    }

    if (!imgURL || imgURL === 'null' || imgURL === 'undefined') {
        imgURL = 'https://via.placeholder.com/150'; // Use a valid remote placeholder if needed, or keep empty logic
    }

    const priceStr = (typeof StreetStore !== 'undefined' && StreetStore.formatPrice) ? StreetStore.formatPrice(item.price) : item.price;

    const wrapper = document.createElement('div');
    wrapper.className = 'cart-item';
    wrapper.dataset.id = id;
    // Add productId for navigation
    if (item.productId) {
        wrapper.dataset.productId = item.productId;
    }

    wrapper.innerHTML = `
    <div class="img-wrap">
      <img src="${imgURL}" alt="${escapeHtml(name)}" onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:#f0f0f0;color:#999;\\'>No Image</div>'"/>
    </div>

    <div class="details">
      <div class="product-name">${escapeHtml(name)}</div>
      <div class="product-price">${priceStr}</div>
      ${item.size || item.color ? `<div class="product-variant" style="font-size:0.85rem;color:#777;">${item.size ? `Size: ${item.size}` : ''}${item.size && item.color ? ', ' : ''}${item.color ? `Color: ${item.color}` : ''}</div>` : ''}
    </div>

    <div class="controls">
      <div class="qty-controls" role="group" aria-label="Quantity controls">
        <button data-action="qty-minus" data-id="${id}" data-qty="${qty}" aria-label="Decrease quantity">−</button>
        <div class="qty" aria-live="polite">${qty}</div>
        <button data-action="qty-plus" data-id="${id}" data-qty="${qty}" aria-label="Increase quantity">+</button>
      </div>
      <button class="remove-btn" data-action="remove-item" data-id="${id}">Remove</button>
    </div>
  `;

    return wrapper;
}

function updateQuantity(variantId, newQuantity) {
    if (!variantId) return;
    newQuantity = parseInt(newQuantity, 10);
    if (isNaN(newQuantity) || newQuantity < 1) newQuantity = 1;

    if (typeof StreetStore !== 'undefined' && typeof StreetStore.updateCartQuantity === 'function') {
        StreetStore.updateCartQuantity(variantId, newQuantity);
    } else {
        // fallback: update localStorage structure if exists
        try {
            const cart = JSON.parse(localStorage.getItem('streetstore_cart') || '[]');
            const idx = cart.findIndex(i => (i.id || i.variantId || i.sku) == variantId);
            if (idx > -1) {
                cart[idx].qty = newQuantity;
                localStorage.setItem('streetstore_cart', JSON.stringify(cart));
            }
        } catch (err) { /* ignore */ }
    }

    // rebuild UI
    loadCartItems();
}

function removeItem(variantId) {
    if (!variantId) return;
    const ok = confirm('Are you sure you want to remove this item from the cart?');
    if (!ok) return;

    if (typeof StreetStore !== 'undefined' && typeof StreetStore.removeFromCart === 'function') {
        StreetStore.removeFromCart(variantId);
    } else {
        try {
            let cart = JSON.parse(localStorage.getItem('streetstore_cart') || '[]');
            cart = cart.filter(i => (i.id || i.variantId || i.sku) != variantId);
            localStorage.setItem('streetstore_cart', JSON.stringify(cart));
        } catch (err) { /* ignore */ }
    }

    loadCartItems();
}

function updateSummary() {
    const subtotalNum = (typeof StreetStore !== 'undefined' && typeof StreetStore.getCartTotal === 'function') ? StreetStore.getCartTotal() : calculateSubtotalFallback();
    setSummaryValues(subtotalNum);
}

function setSummaryValues(subtotalNum) {
    const shippingCost = 0; // change here if you want fixed shipping
    const totalNum = (Number(subtotalNum) || 0) + shippingCost;

    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const totalEl = document.getElementById('summary-total');

    const subtotalStr = (typeof StreetStore !== 'undefined' && StreetStore.formatPrice) ? StreetStore.formatPrice(subtotalNum) : formatPriceFallback(subtotalNum);
    const totalStr = (typeof StreetStore !== 'undefined' && StreetStore.formatPrice) ? StreetStore.formatPrice(totalNum) : formatPriceFallback(totalNum);

    if (subtotalEl) subtotalEl.textContent = subtotalStr;
    if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'Free' : (typeof StreetStore !== 'undefined' && StreetStore.formatPrice ? StreetStore.formatPrice(shippingCost) : formatPriceFallback(shippingCost));
    if (totalEl) totalEl.textContent = totalStr;
}

function calculateSubtotalFallback() {
    try {
        const cart = JSON.parse(localStorage.getItem('streetstore_cart') || '[]');
        return cart.reduce((s, it) => s + ((Number(it.price) || 0) * (Number(it.qty) || Number(it.quantity) || 1)), 0);
    } catch (err) {
        return 0;
    }
}

function formatPriceFallback(num) {
    const n = Number(num || 0);
    return 'EGP ' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateCheckoutButtonState(enabled) {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) return;

    if (enabled) {
        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.cursor = 'pointer';
    } else {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
    }
}

function onCheckout() {
    const cart = (typeof StreetStore !== 'undefined' && StreetStore.getCart) ? StreetStore.getCart() : [];
    if (!cart || cart.length === 0) {
        if (typeof showNotification === 'function') {
            showNotification('Your cart is empty. Add some items first!', 'error');
        } else {
            alert('Your cart is empty. Add some items first!');
        }
        return;
    }

    window.location.href = '../checkout/checkout.html';
}

// small helper to escape HTML text in names
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
