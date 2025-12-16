document.addEventListener("DOMContentLoaded", function () {
  // Load navbar and footer
  fetch("../../components/navbar.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("navbar").innerHTML = html;
      if (typeof initNavbar === "function") initNavbar();
      if (typeof updateCartCount === "function") updateCartCount();
      if (typeof updateUserUI === "function") updateUserUI();
    });

  fetch("../../components/footer.html")
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("footer").innerHTML = html;
      if (typeof updateUserUI === "function") updateUserUI();
    });

  const cart = getCart();
  const orderItemsEl = document.getElementById("order-items");
  const totalAmountEl = document.getElementById("total-amount");
  const btnPlaceOrder = document.getElementById("btn-place-order");
  const checkoutForm = document.querySelector("#new-address-form");

  loadOrderSummary();

  // Handle place order
  if (btnPlaceOrder) {
    btnPlaceOrder.addEventListener("click", function () {
      handlePlaceOrder();
    });
  }

  // Handle show new address form button
  const btnShowNewAddress = document.getElementById("btn-show-new-address");
  const newAddressForm = document.getElementById("new-address-form");

  if (btnShowNewAddress && newAddressForm) {
    btnShowNewAddress.addEventListener("click", function () {
      // Show form and hide this button
      newAddressForm.classList.remove("hidden");
      btnShowNewAddress.classList.add("hidden");
    });
  }

  // Handle Cancel button
  const btnCancelAddress = document.getElementById("btn-cancel-new-address");
  if (btnCancelAddress && newAddressForm && btnShowNewAddress) {
    btnCancelAddress.addEventListener("click", function () {
      newAddressForm.classList.add("hidden");
      btnShowNewAddress.classList.remove("hidden");
      // Optional: Clear form
      newAddressForm.reset();
    });
  }

  // Handle form submission
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handlePlaceOrder();
    });
  }

  function getCart() {
    try {
      return window.StreetStore ? window.StreetStore.getCart() : JSON.parse(localStorage.getItem("streetwear_cart") || "[]");
    } catch {
      return [];
    }
  }

  function calcTotal(items) {
    const total = items.reduce((t, i) => t + (i.price * i.quantity), 0);
    return parseFloat(total.toFixed(2));
  }

  function loadOrderSummary() {
    if (!orderItemsEl || !totalAmountEl) return;

    orderItemsEl.innerHTML = "";

    if (cart.length === 0) {
      orderItemsEl.innerHTML = '<div class="summary-item">Your cart is empty</div>';
      totalAmountEl.innerText = "0.00";
      if (btnPlaceOrder) btnPlaceOrder.disabled = true;
      return;
    }

    cart.forEach((item) => {
      const div = document.createElement("div");
      div.className = "summary-item";
      const itemTotal = (item.price * item.quantity).toFixed(2);
      div.innerHTML = `${item.productName || item.name || "Product"} — x${item.quantity} — EGP ${itemTotal}`;
      orderItemsEl.appendChild(div);
    });

    totalAmountEl.innerText = calcTotal(cart).toFixed(2);
  }

  function handlePlaceOrder() {
    if (cart.length === 0) {
      showToast("Cart is empty", "error");
      return;
    }

    // Get form data if form exists
    let addressProvided = false;
    if (checkoutForm) {
      const formData = new FormData(checkoutForm);
      const street = formData.get("street");
      const city = formData.get("city");

      if (street && city) {
        addressProvided = true;
      }
    }

    if (!addressProvided) {
      showToast("Please provide delivery address", "error");
      return;
    }

    showToast("Order placed successfully!", "success");

    // Clear cart
    localStorage.removeItem("streetwear_cart");
    if (window.StreetStore && window.StreetStore.updateCartCount) {
      window.StreetStore.updateCartCount();
    }

    // Redirect to home
    setTimeout(() => {
      window.location.href = "../home/home.html";
    }, 2000);
  }

  function showToast(msg, type = "info") {
    if (window.showNotification) {
      window.showNotification(msg, type);
    } else {
      // Fallback toast
      const t = document.createElement("div");
      t.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === "error" ? "#ff4444" : "#00C851"};
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 9999;
      `;
      t.innerText = msg;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 3000);
    }
  }
});
