// Storage Keys
const STORAGE_KEYS = {
  CART: "streetwear_cart",
  USER: "streetwear_user",
};

// Cart Functions

function getCart() {
  const cart = localStorage.getItem(STORAGE_KEYS.CART);
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(item) {
  let cart = getCart();
  let itemExists = false;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].variantId == item.variantId) {
      let newQty = cart[i].quantity + item.quantity;
      if (item.maxStock && newQty > item.maxStock) {
        newQty = item.maxStock;
        showNotification(`Only ${item.maxStock} items available`, "error");
      }
      cart[i].quantity = newQty;
      if (item.maxStock) cart[i].maxStock = item.maxStock;
      itemExists = true;
      break;
    }
  }

  if (!itemExists) {
    cart.push(item);
  }

  saveCart(cart);
  showNotification("Item added to cart!", "success");
}

function removeFromCart(variantId) {
  let cart = getCart();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].variantId == variantId) {
      cart.splice(i, 1);
      break;
    }
  }
  saveCart(cart);
  showNotification("Item removed from cart", "info");
}

function updateCartQuantity(variantId, quantity) {
  let cart = getCart();
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].variantId == variantId) {
      if (quantity < 1) quantity = 1;

      if (cart[i].maxStock && quantity > cart[i].maxStock) {
        quantity = cart[i].maxStock;
        showNotification(`Only ${quantity} items available`, "error");
      }

      cart[i].quantity = quantity;
      break;
    }
  }
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(STORAGE_KEYS.CART);
  updateCartCount();
  showNotification("Cart cleared", "info");
}

function getCartTotal() {
  const cart = getCart();
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].quantity;
  }
  return total;
}

function getCartItemCount() {
  const cart = getCart();
  let count = 0;
  for (let i = 0; i < cart.length; i++) {
    count += cart[i].quantity;
  }
  return count;
}

function updateCartCount() {
  const count = getCartItemCount();
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

// User Functions

function getCurrentUser() {
  const user = localStorage.getItem(STORAGE_KEYS.USER);
  return user ? JSON.parse(user) : null;
}

function saveUser(user) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  updateUserUI();
}

function isLoggedIn() {
  return getCurrentUser() !== null;
}

function isAdmin() {
  const user = getCurrentUser();
  return user && user.Role === "Admin";
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  updateUserUI();
  showNotification("Logged out successfully", "success");
  window.location.href = "../login/login.html";
}

function updateUserUI() {
  const user = getCurrentUser();
  const userGreeting = document.getElementById("user-greeting");
  const loginLink = document.getElementById("login-link");
  const footerLoginLink = document.getElementById("footer-login-link");

  if (user) {
    if (userGreeting) userGreeting.textContent = `Hello, ${user.FullName}`;

    if (user.Role === "Admin") {
      // Admin: show Admin link
      if (loginLink) {
        loginLink.textContent = "Admin";
        loginLink.href = "../admin/admin.html";
      }
      if (footerLoginLink) {
        footerLoginLink.textContent = "Admin";
        footerLoginLink.href = "../admin/admin.html";
      }
    } else {
      // Regular user: show Profile link
      if (loginLink) {
        loginLink.textContent = "Profile";
        loginLink.href = "../profile/profile.html";
      }
      if (footerLoginLink) {
        footerLoginLink.textContent = "Profile";
        footerLoginLink.href = "../profile/profile.html";
      }
    }
  } else {
    if (userGreeting) userGreeting.textContent = "";
    if (loginLink) {
      loginLink.textContent = "Login";
      loginLink.href = "../login/login.html";
    }
    if (footerLoginLink) {
      footerLoginLink.textContent = "Login";
      footerLoginLink.href = "../login/login.html";
    }
  }
}

// UI Helpers

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    background-color: ${type === "success" ? "#00C851" : type === "error" ? "#ff4444" : "#D4AF37"};
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  setTimeout(function () {
    notification.style.animation = "fadeOut 0.3s ease-out";
    notification.addEventListener("animationend", function () {
      notification.remove();
    });
  }, 3000);
}

function formatPrice(price) {
  return `EGP ${price.toFixed(2)}`;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Init
document.addEventListener("DOMContentLoaded", function () {
  updateCartCount();
  updateUserUI();
});

// Navbar

function initNavbar() {
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");

  if (navbarToggle && navbarMenu) {
    const newToggle = navbarToggle.cloneNode(true);
    navbarToggle.parentNode.replaceChild(newToggle, navbarToggle);

    newToggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      navbarMenu.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!newToggle.contains(e.target) && !navbarMenu.contains(e.target) && navbarMenu.classList.contains("active")) {
        navbarMenu.classList.remove("active");
      }
    });
  }

  // Show admin link if admin
  const user = getCurrentUser();
  if (user && user.Role === "Admin") {
    const adminLinks = document.querySelectorAll(".admin-only");
    adminLinks.forEach((link) => (link.style.display = "block"));
  }

  // Highlight current page
  const path = window.location.pathname;
  const pageName = path.split("/").pop().replace(".html", "");
  const navLinks = document.querySelectorAll(".nav-link");

  for (const link of navLinks) {
    const href = link.getAttribute("href");
    if (href && href.includes(pageName)) {
      link.style.color = "var(--accent-gold)";
    }
  }

  updateUserUI();
}

// Exports
window.StreetStore = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getCartTotal,
  getCartItemCount,
  updateCartCount,
  getCurrentUser,
  saveUser,
  isLoggedIn,
  isAdmin,
  logout,
  showNotification,
  formatPrice,
  formatDate,
  getUrlParameter,
  initNavbar,
  resolveImagePath,
  createProductCard,
  viewProduct,
};

window.initNavbar = initNavbar;

function resolveImagePath(path) {
  if (!path) return null;
  // If it's a full URL, return it as is
  if (path.startsWith("http")) return path;

  // Legacy support for local paths (if any)
  if (path.startsWith("/images/") || path.startsWith("images/")) {
    const cleanPath = path.startsWith("/") ? path : "/" + path;
    return "../.." + cleanPath;
  }

  return path;
}
window.resolveImagePath = resolveImagePath;

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.onclick = function () {
    window.location.href = `../product/product.html?id=${product.ProductID}`;
  };

  const imageURL = resolveImagePath(product.ImageURL);

  const imageHtml = imageURL
    ? `<img src="${imageURL}" alt="${product.ProductName}" class="product-image" 
        onerror="this.style.display='none'; this.parentElement.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)';">`
    : `<div style="width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; font-size: 4rem; opacity: 0.3;">👕</div>`;

  card.innerHTML = `
    <div class="product-image-container">
      ${imageHtml}
      ${product.Status === "Active" ? '<span class="product-badge">New</span>' : ""}
    </div>
    <div class="product-info">
      <div class="product-category">${product.CategoryName || "Streetwear"}</div>
      <h3 class="product-name">${product.ProductName}</h3>
      <p class="product-description">${product.Description || "Premium quality streetwear"}</p>
      <div class="product-footer">
        <span class="product-price">${formatPrice(product.BasePrice)}</span>
        <button class="product-btn" onclick="event.stopPropagation(); viewProduct(${product.ProductID})">
          View →
        </button>
      </div>
    </div>
  `;

  return card;
}
window.createProductCard = createProductCard;

function viewProduct(productId) {
  window.location.href = `../product/product.html?id=${productId}`;
}
window.viewProduct = viewProduct;
