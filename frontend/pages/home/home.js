document.addEventListener("DOMContentLoaded", function () {
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

  const container = document.querySelector(".products-grid");

  try {
    const products = window.MockData.getProducts("Active");

    if (products.length > 0) {
      const featuredProducts = products.slice(0, 10);

      container.innerHTML = "";

      for (const product of featuredProducts) {
        const card = createProductCard(product);
        container.appendChild(card);
      }
    } else {
      container.innerHTML = '<p class="text-center">No products available</p>';
    }
  } catch (error) {
    console.error("Error loading products:", error);
    container.innerHTML =
      '<p class="text-center" style="color: var(--error-color);">Failed to load products.</p>';
  }
});
