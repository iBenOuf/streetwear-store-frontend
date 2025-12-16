const CATEGORIES = [
    { CategoryID: 1, CategoryName: "Hoodies", Description: "Premium hoodies", Status: "Active" },
    { CategoryID: 2, CategoryName: "T-Shirts", Description: "Graphic tees", Status: "Active" },
    { CategoryID: 3, CategoryName: "Jackets", Description: "Street jackets", Status: "Active" },
    { CategoryID: 4, CategoryName: "Accessories", Description: "Hats, bags, and more", Status: "Active" },
    { CategoryID: 5, CategoryName: "Pants", Description: "Cargo and joggers", Status: "Active" },
];

const PRODUCTS = [
    {
        ProductID: 1,
        ProductName: "Urban Legend Hoodie",
        Description: "Premium heavyweight hoodie with embroidered logo",
        BasePrice: 899.99,
        CategoryID: 1,
        CategoryName: "Hoodies",
        ImageURL: "https://i.postimg.cc/63c1fJXz/hoodie-urban-legend.jpg",
        Status: "Active",
    },
    {
        ProductID: 2,
        ProductName: "Street Crown Tee",
        Description: "Oversized graphic t-shirt with vintage print",
        BasePrice: 449.99,
        CategoryID: 2,
        CategoryName: "T-Shirts",
        ImageURL: "https://i.postimg.cc/ydsbR6w8/tee-street-crown.jpg",
        Status: "Active",
    },
    {
        ProductID: 3,
        ProductName: "Midnight Bomber",
        Description: "Premium bomber jacket with custom patches",
        BasePrice: 1299.99,
        CategoryID: 3,
        CategoryName: "Jackets",
        ImageURL: "https://i.postimg.cc/0Np4rKXt/jacket-midnight-bomber.jpg",
        Status: "Active",
    },
    {
        ProductID: 4,
        ProductName: "Gold Chain Cap",
        Description: "Snapback with metallic embroidery",
        BasePrice: 299.99,
        CategoryID: 4,
        CategoryName: "Accessories",
        ImageURL: "https://i.postimg.cc/KYnW43pN/cap-gold-chain.jpg",
        Status: "Active",
    },
    {
        ProductID: 5,
        ProductName: "Shadow Cargo Pants",
        Description: "Tactical cargo pants with multiple pockets",
        BasePrice: 699.99,
        CategoryID: 5,
        CategoryName: "Pants",
        ImageURL: "https://i.postimg.cc/yNq5Vyj9/pants-shadow-cargo.jpg",
        Status: "Active",
    },
    {
        ProductID: 6,
        ProductName: "Neon Dreams Hoodie",
        Description: "Black hoodie with neon graphic printing",
        BasePrice: 849.99,
        CategoryID: 1,
        CategoryName: "Hoodies",
        ImageURL: "https://i.postimg.cc/Nj2Sqz6q/hoodie-neon-dreams.jpg",
        Status: "Active",
    },
    {
        ProductID: 7,
        ProductName: "Retro Wave Tee",
        Description: "Vintage inspired graphic tee with 80s aesthetics",
        BasePrice: 399.99,
        CategoryID: 2,
        CategoryName: "T-Shirts",
        ImageURL: "https://i.postimg.cc/vHBCXBDm/tee-retro-wave.jpg",
        Status: "Active",
    },
    {
        ProductID: 8,
        ProductName: "Rebel Denim Jacket",
        Description: "Distressed denim with custom back patch",
        BasePrice: 1199.99,
        CategoryID: 3,
        CategoryName: "Jackets",
        ImageURL: "https://i.postimg.cc/gkJ14Jrn/jacket-rebel-denim.jpg",
        Status: "Active",
    },
    {
        ProductID: 9,
        ProductName: "Crossbody Street Bag",
        Description: "Waterproof crossbody with adjustable strap",
        BasePrice: 549.99,
        CategoryID: 4,
        CategoryName: "Accessories",
        ImageURL: "https://i.postimg.cc/SRQ3BQr5/bag-crossbody.jpg",
        Status: "Active",
    },
    {
        ProductID: 10,
        ProductName: "Tech Joggers",
        Description: "Breathable joggers with zipper pockets",
        BasePrice: 599.99,
        CategoryID: 5,
        CategoryName: "Pants",
        ImageURL: "https://i.postimg.cc/Vv7pmyZw/pants-tech-joggers.jpg",
        Status: "Active",
    },
    {
        ProductID: 11,
        ProductName: "Graffiti Zip Hoodie",
        Description: "Full-zip hoodie with street art design",
        BasePrice: 929.99,
        CategoryID: 1,
        CategoryName: "Hoodies",
        ImageURL: "https://i.postimg.cc/d1Yz9jTT/hoodie-graffiti-zip.jpg",
        Status: "Active",
    },
    {
        ProductID: 12,
        ProductName: "Minimal Logo Tee",
        Description: "Clean design with small chest logo",
        BasePrice: 349.99,
        CategoryID: 2,
        CategoryName: "T-Shirts",
        ImageURL: "https://i.postimg.cc/t4L0sjqd/tee-minimal-logo.jpg",
        Status: "Active",
    },
    {
        ProductID: 13,
        ProductName: "Puffer Jacket Pro",
        Description: "Insulated puffer with detachable hood",
        BasePrice: 1499.99,
        CategoryID: 3,
        CategoryName: "Jackets",
        ImageURL: "https://i.postimg.cc/Zq3G3Mng/jacket-puffer-pro.jpg",
        Status: "Active",
    },
    {
        ProductID: 14,
        ProductName: "Gold Beanie",
        Description: "Knit beanie with metallic thread",
        BasePrice: 249.99,
        CategoryID: 4,
        CategoryName: "Accessories",
        ImageURL: "https://i.postimg.cc/y8wqDH1j/hat-gold-beanie.jpg",
        Status: "Active",
    },
    {
        ProductID: 15,
        ProductName: "Wide Leg Jeans",
        Description: "90s inspired wide leg denim",
        BasePrice: 799.99,
        CategoryID: 5,
        CategoryName: "Pants",
        ImageURL: "https://i.postimg.cc/sfcRwqmR/pants-wide-leg.jpg",
        Status: "Active",
    },
];

const VARIANTS = [
    // Product 1 variants
    { VariantID: 1, ProductID: 1, Size: "S", Color: "Black", StockQuantity: 10 },
    { VariantID: 2, ProductID: 1, Size: "M", Color: "Black", StockQuantity: 15 },
    { VariantID: 3, ProductID: 1, Size: "L", Color: "Black", StockQuantity: 12 },
    { VariantID: 4, ProductID: 1, Size: "XL", Color: "Black", StockQuantity: 8 },
    { VariantID: 5, ProductID: 1, Size: "S", Color: "White", StockQuantity: 5 },
    { VariantID: 6, ProductID: 1, Size: "M", Color: "White", StockQuantity: 7 },
    { VariantID: 7, ProductID: 1, Size: "L", Color: "White", StockQuantity: 6 },

    // Product 2 variants
    { VariantID: 8, ProductID: 2, Size: "S", Color: "Black", StockQuantity: 20 },
    { VariantID: 9, ProductID: 2, Size: "M", Color: "Black", StockQuantity: 25 },
    { VariantID: 10, ProductID: 2, Size: "L", Color: "Black", StockQuantity: 18 },
    { VariantID: 11, ProductID: 2, Size: "XL", Color: "Black", StockQuantity: 10 },

    // Product 3 variants
    { VariantID: 12, ProductID: 3, Size: "M", Color: "Black", StockQuantity: 8 },
    { VariantID: 13, ProductID: 3, Size: "L", Color: "Black", StockQuantity: 6 },
    { VariantID: 14, ProductID: 3, Size: "XL", Color: "Black", StockQuantity: 4 },

    // Product 4 variants
    { VariantID: 15, ProductID: 4, Size: "One Size", Color: "Gold", StockQuantity: 30 },
    { VariantID: 16, ProductID: 4, Size: "One Size", Color: "Black", StockQuantity: 25 },

    // Product 5 variants
    { VariantID: 17, ProductID: 5, Size: "S", Color: "Black", StockQuantity: 12 },
    { VariantID: 18, ProductID: 5, Size: "M", Color: "Black", StockQuantity: 15 },
    { VariantID: 19, ProductID: 5, Size: "L", Color: "Black", StockQuantity: 10 },
    { VariantID: 20, ProductID: 5, Size: "XL", Color: "Black", StockQuantity: 8 },

    // Product 6 variants
    { VariantID: 21, ProductID: 6, Size: "S", Color: "Black", StockQuantity: 9 },
    { VariantID: 22, ProductID: 6, Size: "M", Color: "Black", StockQuantity: 12 },
    { VariantID: 23, ProductID: 6, Size: "L", Color: "Black", StockQuantity: 10 },
    { VariantID: 24, ProductID: 6, Size: "XL", Color: "Black", StockQuantity: 7 },

    // Product 7 variants
    { VariantID: 25, ProductID: 7, Size: "S", Color: "White", StockQuantity: 18 },
    { VariantID: 26, ProductID: 7, Size: "M", Color: "White", StockQuantity: 22 },
    { VariantID: 27, ProductID: 7, Size: "L", Color: "White", StockQuantity: 15 },
    { VariantID: 28, ProductID: 7, Size: "XL", Color: "White", StockQuantity: 10 },

    // Product 8 variants
    { VariantID: 29, ProductID: 8, Size: "S", Color: "Blue", StockQuantity: 7 },
    { VariantID: 30, ProductID: 8, Size: "M", Color: "Blue", StockQuantity: 10 },
    { VariantID: 31, ProductID: 8, Size: "L", Color: "Blue", StockQuantity: 8 },
    { VariantID: 32, ProductID: 8, Size: "XL", Color: "Blue", StockQuantity: 5 },

    // Product 9 variants
    { VariantID: 33, ProductID: 9, Size: "One Size", Color: "Black", StockQuantity: 20 },
    { VariantID: 34, ProductID: 9, Size: "One Size", Color: "Grey", StockQuantity: 15 },

    // Product 10 variants
    { VariantID: 35, ProductID: 10, Size: "S", Color: "Grey", StockQuantity: 14 },
    { VariantID: 36, ProductID: 10, Size: "M", Color: "Grey", StockQuantity: 18 },
    { VariantID: 37, ProductID: 10, Size: "L", Color: "Grey", StockQuantity: 12 },
    { VariantID: 38, ProductID: 10, Size: "XL", Color: "Grey", StockQuantity: 9 },

    // Product 11 variants
    { VariantID: 39, ProductID: 11, Size: "M", Color: "Black", StockQuantity: 11 },
    { VariantID: 40, ProductID: 11, Size: "L", Color: "Black", StockQuantity: 13 },
    { VariantID: 41, ProductID: 11, Size: "XL", Color: "Black", StockQuantity: 8 },

    // Product 12 variants
    { VariantID: 42, ProductID: 12, Size: "S", Color: "White", StockQuantity: 20 },
    { VariantID: 43, ProductID: 12, Size: "M", Color: "White", StockQuantity: 25 },
    { VariantID: 44, ProductID: 12, Size: "L", Color: "White", StockQuantity: 18 },
    { VariantID: 45, ProductID: 12, Size: "XL", Color: "White", StockQuantity: 12 },

    // Product 13 variants
    { VariantID: 46, ProductID: 13, Size: "M", Color: "Black", StockQuantity: 6 },
    { VariantID: 47, ProductID: 13, Size: "L", Color: "Black", StockQuantity: 8 },
    { VariantID: 48, ProductID: 13, Size: "XL", Color: "Black", StockQuantity: 5 },

    // Product 14 variants
    { VariantID: 49, ProductID: 14, Size: "One Size", Color: "Gold", StockQuantity: 30 },

    // Product 15 variants
    { VariantID: 50, ProductID: 15, Size: "28", Color: "Blue", StockQuantity: 10 },
    { VariantID: 51, ProductID: 15, Size: "30", Color: "Blue", StockQuantity: 12 },
    { VariantID: 52, ProductID: 15, Size: "32", Color: "Blue", StockQuantity: 15 },
    { VariantID: 53, ProductID: 15, Size: "34", Color: "Blue", StockQuantity: 10 },
];

// Data Access Functions

function getProducts(status = "Active") {
    return PRODUCTS.filter(p => p.Status === status);
}

function getProductsByCategory(categoryId, status = "Active") {
    return PRODUCTS.filter(
        p => p.CategoryID == categoryId && p.Status === status
    );
}

function getProductById(productId) {
    return PRODUCTS.find(p => p.ProductID == productId);
}

function getProductVariants(productId) {
    return VARIANTS.filter(v => v.ProductID == productId);
}

function searchProducts(searchTerm) {
    const term = searchTerm.toLowerCase();
    return PRODUCTS.filter(
        p =>
            p.ProductName.toLowerCase().includes(term) ||
            p.Description.toLowerCase().includes(term) ||
            p.CategoryName.toLowerCase().includes(term)
    );
}

function getCategories() {
    return CATEGORIES.filter(c => c.Status === "Active");
}

// Exports
window.MockData = {
    getProducts,
    getProductsByCategory,
    getProductById,
    getProductVariants,
    searchProducts,
    getCategories,
    PRODUCTS,
    CATEGORIES,
    VARIANTS,
};
