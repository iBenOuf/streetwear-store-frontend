# Luxury Streetwear E-Commerce Store

A modern, luxury dark-mode e-commerce website for selling streetwear clothing. Built with HTML, CSS, and JavaScript.

> [!IMPORTANT]
> 🚧 **Work in Progress**: This project is currently in the **Frontend Prototype** phase. We are actively working on a complete design overhaul and backend implementation. Contributions are welcome!

## 📚 Table of Contents
- [Project Overview](#-project-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
  - [Running Locally](#running-locally)
  - [Why Use a Local Server?](#why-use-a-local-server)
- [Features](#-features)
- [Design Features](#-design-features)
- [Data](#-data)
- [Customization](#-customization)
- [Pages Overview](#-pages-overview)
- [Tips](#-tips)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🎯 Project Overview

Full-featured e-commerce platform with client-side functionality using localStorage for cart and user session management.

---

## 🛠 Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom CSS variables, Flexbox/Grid layouts, responsive design
- **JavaScript (ES6+)**: Vanilla JS for DOM manipulation and state management
- **localStorage**: Client-side cart and user session management
- **Mock Data**: Product catalog stored in JavaScript

---

## 📁 Project Structure

```
UNI-Flask-Prototype-main/
└── frontend/
    ├── components/              # Reusable HTML snippets
    │   ├── navbar.html
    │   └── footer.html
    ├── css/
    │   └── main.css             # Global styles, variables, and utilities
    ├── js/
    │   ├── main.js              # Global scripts and state management
    │   └── mockData.js          # Product and category data
    └── pages/                   # Individual page directories
        ├── home/                # Landing page
        ├── shop/                # Product catalog with filtering
        ├── product/             # Product details with variants
        ├── cart/                # Shopping cart
        ├── checkout/            # Order placement
        ├── login/               # Login/Register
        ├── profile/             # User profile & settings
        └── admin/               # Admin dashboard
```

---

## 🚀 Quick Start

### Running Locally

1. **Download/clone the project**
2. **Open with a local web server**:

    **Option A: Python HTTP Server (Recommended)**
    ```bash
    cd frontend
    python -m http.server 8080
    ```
    Then open: `http://localhost:8080/pages/home/home.html`

    **Option B: VS Code Live Server**
    - Install "Live Server" extension in VS Code
    - Right-click `frontend/pages/home/home.html`
    - Select "Open with Live Server"

    **Option C: Node.js http-server**
    ```bash
    npm install -g http-server
    cd frontend
    http-server -p 8080
    ```
    Then open: `http://localhost:8080/pages/home/home.html`

3. **Start shopping!**

### Why Use a Local Server?

**CORS (Cross-Origin Resource Sharing)** is a browser security feature that blocks loading local files via JavaScript's `fetch()` API. This project uses `fetch()` to load the navbar and footer components dynamically:

```javascript
fetch('../../components/navbar.html')
    .then(res => res.text())
    .then(html => document.getElementById('navbar').innerHTML = html);
```

When opening HTML files directly (using `file://`), the browser blocks these requests. A local HTTP server (using `http://localhost`) allows the requests to work properly.

---

## ✨ Features

### 🏠 Home Page
- Hero section with call-to-action
- Featured products display
- Category cards with navigation
- Responsive design

### 🛍️ Shop Page
- Full product catalog (15 products)
- Category filtering (Hoodies, T-Shirts, Jackets, Accessories, Pants)
- Real-time search functionality
- Dynamic product cards

### 👕 Product Details
- Product information display
- Size and color variant selection
- Stock availability checking
- Add to cart with quantity control
- Dynamic pricing
- Color swatches for better visibility

### 🛒 Shopping Cart
- View cart items (localStorage)
- Update quantities
- Remove items
- Calculate totals
- Click products to view details
- Empty cart prevention on checkout

### 📦 Checkout
- Order placement
- Delivery address form
- Order summary
- Cash on Delivery payment

### 🔐 Login/Register
- User authentication
- User data saved to localStorage
- Admin role detection (use "admin" in email)
- Auto-redirect based on role

### 👤 Profile Page
- View account information
- User avatar with initials
- Logout functionality

### 🛠️ Admin Dashboard
- View statistics (revenue, orders, products, users)
- Product listing (all 15 products)
- Recent orders management
- Logout button

---

## 🎨 Design Features

- **Dark Mode Theme**: Premium black and gold aesthetic
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Fade-ins, hover effects, transitions
- **Modern Typography**: Google Fonts (Inter, Outfit)
- **Gradient Accents**: Gold gradients for premium feel
- **Card-Based UI**: Clean, modern product cards
- **Color Swatches**: Visual color selection on product pages

---

## 📊 Data

The store includes:
- **15 Products** across 5 categories
- **53 Product Variants** (sizes, colors, stock levels)
- **5 Categories** (Hoodies, T-Shirts, Jackets, Accessories, Pants)

All data is defined in `/frontend/js/mockData.js`

---

## 🔧 Customization

### Adding Products
Edit `/frontend/js/mockData.js` to add more products:

```javascript
PRODUCTS.push({
    ProductID: 16,
    ProductName: "Your Product",
    Description: "Description here",
    BasePrice: 999.99,
    CategoryID: 1,
    CategoryName: "Hoodies",
    ImageURL: "https://your-image-url.com/image.jpg",
    Status: "Active",
});
```

### Changing Colors
Edit CSS variables in `/frontend/css/main.css`:

```css
:root {
    --bg-primary: #0a0a0a;
    --accent-gold: #D4AF37;
    --text-primary: #ffffff;
}
```

---

## 📱 Pages Overview

| Page | Path | Description |
|:-----|:-----|:------------|
| Home | `/pages/home/home.html` | Landing page with hero and featured products |
| Shop | `/pages/shop/shop.html` | Product catalog with filters and search |
| Product | `/pages/product/product.html` | Product details (use `?id=1`) |
| Cart | `/pages/cart/cart.html` | Shopping cart management |
| Checkout | `/pages/checkout/checkout.html` | Order placement |
| Login | `/pages/login/login.html` | User authentication |
| Profile | `/pages/profile/profile.html` | User account with logout |
| Admin | `/pages/admin/admin.html` | Admin dashboard (use admin email) |

---

## 💡 Tips

1. **Admin Access**: Use any email containing "admin" (e.g., `admin@test.com`) to access the admin dashboard
2. **Cart Persists**: Cart data is saved in localStorage and persists across sessions
3. **Browse Products**: Navigate from Home → Shop → Product Details → Cart → Checkout
4. **Test Filtering**: Try different category filters and search on the shop page
5. **Stock Indicators**: Products show color-coded stock levels (Green: 10+ items, Orange: Low stock, Red: Out of stock)

---

## 🐛 Troubleshooting

| Issue | Solution |
|:------|:---------|
| **Navbar/Footer not showing** | Use HTTP server (`http://localhost:8080`), not `file://` |
| **Images not loading** | Check your internet connection (images are hosted online) |
| **Cart not working** | Check browser console for errors, ensure localStorage is enabled |

---

## 📄 License

MIT License - Open source project.
